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
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import { useState } from 'react';
import { useCreateUser } from '@entities/user/api/userHooks';
import type { UserRequest } from '@entities/user/model/types';

interface CreateUserModalProps {
  open: boolean;
  onClose: () => void;
}

const AVAILABLE_ROLES = ['fleet_manager', 'vehicle_operator', 'dispatcher', 'admin'];

export const CreateUserModal = ({ open, onClose }: CreateUserModalProps) => {
  const createUserMutation = useCreateUser();
  const [formData, setFormData] = useState<UserRequest>({
    email: '',
    name: '',
    password: '',
    phone: '',
    roles: [],
    hub_list: [],
    zone_ids: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
    createUserMutation.mutate(formData, {
      onSuccess: () => {
        onClose();
        setFormData({
          email: '',
          name: '',
          password: '',
          phone: '',
          roles: [],
          hub_list: [],
          zone_ids: [],
        });
      },
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create New User</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
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
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={createUserMutation.isPending}>
          {createUserMutation.isPending ? 'Creating...' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
