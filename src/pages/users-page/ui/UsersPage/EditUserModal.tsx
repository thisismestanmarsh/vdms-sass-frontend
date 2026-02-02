import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  OutlinedInput,
  Chip,
  FormControlLabel,
  Switch,
  CircularProgress,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import { useState, useEffect } from 'react';
import { useUser, useUpdateUser } from '@entities/user/api/userHooks';
import type { UpdateUserRequest } from '@entities/user/model/types';

interface EditUserModalProps {
  open: boolean;
  onClose: () => void;
  userId: string | number | null;
}

const AVAILABLE_ROLES = ['fleet_manager', 'vehicle_operator', 'dispatcher', 'admin'];

export const EditUserModal = ({ open, onClose, userId }: EditUserModalProps) => {
  const { data: userResponse, isLoading } = useUser(userId || '');
  const updateUserMutation = useUpdateUser(userId || '');

  const [formData, setFormData] = useState<UpdateUserRequest>({
    name: '',
    phone: '',
    roles: [],
    hub_list: [],
    zone_ids: [],
    is_active: true,
  });

  useEffect(() => {
    if (userResponse?.data) {
      const user = userResponse.data;
      setFormData({
        name: user.name,
        phone: user.phone,
        roles: user.roles,
        hub_list: user.hub_list,
        zone_ids: user.zone_ids,
        is_active: user.is_active,
      });
    }
  }, [userResponse]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleRolesChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    setFormData((prev) => ({
      ...prev,
      roles: typeof value === 'string' ? value.split(',') : value,
    }));
  };

  const handleSubmit = () => {
    if (!userId) return;
    updateUserMutation.mutate(formData, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Roles</InputLabel>
              <Select
                multiple
                name="roles"
                value={formData.roles}
                onChange={handleRolesChange}
                input={<OutlinedInput label="Roles" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
              >
                {AVAILABLE_ROLES.map((role) => (
                  <MenuItem key={role} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.is_active}
                  onChange={handleChange}
                  name="is_active"
                  color="primary"
                />
              }
              label="Active Status"
            />
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={updateUserMutation.isPending || isLoading}
        >
          {updateUserMutation.isPending ? 'Updating...' : 'Update'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
