import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
    IconButton,
    Tooltip,
    Typography,
    CircularProgress,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
import { getPermissionDetailsPath, getPermissionEditPath } from '@shared/config/routes';
import { usePermissions, useDeletePermission } from '@entities/permission/model/permissionHooks';
import type { Permission } from '@entities/permission/model/types';

export const PermissionsTable = () => {
    const navigate = useNavigate();
    const { data, isLoading, error } = usePermissions();
    const deletePermission = useDeletePermission();

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                <Typography color="error">Error loading permissions</Typography>
            </Box>
        );
    }

    const permissions = data?.data || [];

    const handleDelete = (e: React.MouseEvent, id: number) => {
        e.stopPropagation();
        if (window.confirm('Are you sure you want to delete this permission?')) {
            deletePermission.mutate(id);
        }
    };

    return (
        <TableContainer component={Paper} sx={{ bgcolor: 'background.paper', borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Module</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Resource</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Action</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Scope</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }} align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {permissions.map((permission: Permission) => (
                        <TableRow
                            key={permission.id}
                            hover
                            onClick={() => navigate(getPermissionDetailsPath(permission.id))}
                            sx={{ cursor: 'pointer' }}
                        >
                            <TableCell>{permission.name}</TableCell>
                            <TableCell>{permission.module}</TableCell>
                            <TableCell>{permission.resource}</TableCell>
                            <TableCell>{permission.action}</TableCell>
                            <TableCell>{permission.scope}</TableCell>
                            <TableCell align="right">
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                                    <Tooltip title="View Details">
                                        <IconButton
                                            size="small"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                navigate(getPermissionDetailsPath(permission.id));
                                            }}
                                        >
                                            <VisibilityIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Edit">
                                        <IconButton
                                            size="small"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                navigate(getPermissionEditPath(permission.id));
                                            }}
                                        >
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                        <IconButton
                                            size="small"
                                            color="error"
                                            onClick={(e) => handleDelete(e, permission.id)}
                                        >
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            </TableCell>
                        </TableRow>
                    ))}
                    {permissions.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                                <Typography variant="body2" color="text.secondary">
                                    No permissions found.
                                </Typography>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
