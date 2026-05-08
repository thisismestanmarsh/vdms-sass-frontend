import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Box,
  Pagination,
  CircularProgress,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useUsers, useDeleteUser } from '@entities/user/api/userHooks';
import { useState } from 'react';
import type { User } from '@entities/user/model/types';
import { IS_DEMO_MODE } from '@shared/config/demo';
import { MOCK_USERS } from './demoData';

interface UsersTableProps {
  onEdit: (id: string | number) => void;
}

export const UsersTable = ({ onEdit }: UsersTableProps) => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const offset = (page - 1) * limit;

  const { data: apiData, isLoading: apiLoading, error: apiError } = useUsers({ limit, offset });

  const data = IS_DEMO_MODE ? { data: MOCK_USERS, meta: { total_pages: 1 } } : apiData;
  const isLoading = IS_DEMO_MODE ? false : apiLoading;
  const error = IS_DEMO_MODE ? null : apiError;
  const deleteUserMutation = useDeleteUser();

  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | number | null>(null);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleDeleteClick = (id: string | number) => {
    setUserToDelete(id);
    setDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (userToDelete) {
      deleteUserMutation.mutate(userToDelete, {
        onSuccess: () => {
          setDeleteConfirmationOpen(false);
          setUserToDelete(null);
        },
      });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmationOpen(false);
    setUserToDelete(null);
  };

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
        <Typography color="error">Error loading users</Typography>
      </Box>
    );
  }

  const users = Array.isArray(data?.data) ? data.data : (data?.data as any)?.users || [];
  const totalPages = data?.meta?.total_pages || (data?.data as any)?.meta?.total_pages || 1;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TableContainer
        component={Paper}
        sx={{
          bgcolor: 'background.paper',
          borderRadius: '8px',
          boxShadow: 'none',
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  Name <FilterListIcon fontSize="small" color="action" />
                </Box>
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  Email <FilterListIcon fontSize="small" color="action" />
                </Box>
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  Phone <FilterListIcon fontSize="small" color="action" />
                </Box>
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  Roles <FilterListIcon fontSize="small" color="action" />
                </Box>
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(users) &&
              users.map((user: User) => (
                <TableRow key={user.id} hover>
                  <TableCell sx={{ fontWeight: 600 }}>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {Array.isArray(user.roles) &&
                        user.roles.map((role: string) => (
                          <Chip key={role} label={role} size="small" variant="outlined" />
                        ))}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={user.is_active ? 'Active' : 'Inactive'}
                      color={user.is_active ? 'success' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => onEdit(user.id)} color="primary" size="small">
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDeleteClick(user.id)}
                      color="error"
                      size="small"
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            {users.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography variant="body2" sx={{ py: 2 }}>
                    No users found
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          shape="rounded"
          color="primary"
        />
      </Box>

      <Dialog
        open={deleteConfirmationOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete User</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this user? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
