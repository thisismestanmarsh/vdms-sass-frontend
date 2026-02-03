import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Box,
    Typography,
    IconButton,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid,
    CircularProgress,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useState, useEffect } from 'react';
import { useCreateRole } from '@entities/role/model/roleHooks';
import { usePermissions } from '@entities/permission/model/permissionHooks';
import type { CreateRoleRequest, CreateRolePermissionRequest } from '@entities/role/model/types';

interface CreateRoleModalProps {
    open: boolean;
    onClose: () => void;
}

const SCOPES = ['company', 'zone', 'hub'];
const ACTIONS = ['read', 'write', 'delete', 'update', 'manage'];

export const CreateRoleModal = ({ open, onClose }: CreateRoleModalProps) => {
    const { mutate: createRole, isPending } = useCreateRole();
    const { data: permissionsData, isLoading: permissionsLoading } = usePermissions(100, 0);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [selectedPermissions, setSelectedPermissions] = useState<CreateRolePermissionRequest[]>([]);

    useEffect(() => {
        if (!open) {
            setName('');
            setDescription('');
            setSelectedPermissions([]);
        }
    }, [open]);

    const handleAddPermission = () => {
        setSelectedPermissions([
            ...selectedPermissions,
            { action: 'read', scope: 'company', permissionId: '' },
        ]);
    };

    const handleRemovePermission = (index: number) => {
        setSelectedPermissions(selectedPermissions.filter((_, i) => i !== index));
    };

    const handlePermissionChange = (index: number, field: keyof CreateRolePermissionRequest, value: string | number) => {
        const updated = [...selectedPermissions];
        updated[index] = { ...updated[index], [field]: value };
        setSelectedPermissions(updated);
    };

    const handleSubmit = () => {
        const payload: CreateRoleRequest = {
            name,
            description,
            permissions: selectedPermissions,
        };
        createRole(payload, {
            onSuccess: () => {
                onClose();
            },
        });
    };

    const permissions = permissionsData?.data || [];

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle sx={{ fontWeight: 700 }}>Create New Role</DialogTitle>
            <DialogContent dividers>
                <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 1 }}>
                    <TextField
                        label="Role Name"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Fleet Manager"
                        required
                    />
                    <TextField
                        label="Description"
                        fullWidth
                        multiline
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="e.g. Manages fleet operations..."
                    />

                    <Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                Permissions
                            </Typography>
                            <Button
                                startIcon={<AddIcon />}
                                size="small"
                                onClick={handleAddPermission}
                                variant="outlined"
                            >
                                Add Permission
                            </Button>
                        </Box>

                        {selectedPermissions.length === 0 && (
                            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                                No permissions added yet. Click "Add Permission" to start.
                            </Typography>
                        )}

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {selectedPermissions.map((item, index) => (
                                <Grid container spacing={2} key={index} alignItems="center">
                                    <Grid size={{ xs: 12, sm: 4 }}>
                                        <FormControl fullWidth size="small">
                                            <InputLabel>Permission</InputLabel>
                                            <Select
                                                value={item.permissionId}
                                                label="Permission"
                                                onChange={(e) => handlePermissionChange(index, 'permissionId', e.target.value)}
                                            >
                                                {permissionsLoading ? (
                                                    <MenuItem disabled>
                                                        <CircularProgress size={20} sx={{ mr: 1 }} />
                                                        Loading...
                                                    </MenuItem>
                                                ) : (
                                                    permissions.map((p) => (
                                                        <MenuItem key={p.id} value={p.id}>
                                                            {p.name} ({p.module})
                                                        </MenuItem>
                                                    ))
                                                )}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid size={{ xs: 6, sm: 3 }}>
                                        <FormControl fullWidth size="small">
                                            <InputLabel>Action</InputLabel>
                                            <Select
                                                value={item.action}
                                                label="Action"
                                                onChange={(e) => handlePermissionChange(index, 'action', e.target.value)}
                                            >
                                                {ACTIONS.map((a) => (
                                                    <MenuItem key={a} value={a}>
                                                        {a.charAt(0).toUpperCase() + a.slice(1)}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid size={{ xs: 6, sm: 3 }}>
                                        <FormControl fullWidth size="small">
                                            <InputLabel>Scope</InputLabel>
                                            <Select
                                                value={item.scope}
                                                label="Scope"
                                                onChange={(e) => handlePermissionChange(index, 'scope', e.target.value)}
                                            >
                                                {SCOPES.map((s) => (
                                                    <MenuItem key={s} value={s}>
                                                        {s.charAt(0).toUpperCase() + s.slice(1)}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid size={{ xs: 1 }} sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <IconButton
                                            color="error"
                                            size="small"
                                            onClick={() => handleRemovePermission(index)}
                                        >
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            ))}
                        </Box>
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions sx={{ px: 3, py: 2 }}>
                <Button onClick={onClose} color="inherit">
                    Cancel
                </Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    disabled={!name || isPending || selectedPermissions.some(p => !p.permissionId)}
                    startIcon={isPending && <CircularProgress size={20} color="inherit" />}
                >
                    {isPending ? 'Creating...' : 'Create Role'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
