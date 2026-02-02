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
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
import { getRoleDetailsPath } from '@shared/config/routes';
import { useRoles, useDeleteRole } from '@entities/role/model/roleHooks';
import type { Role } from '@entities/role/model/types';

export const RolesTable = () => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useRoles();
  const deleteRole = useDeleteRole();

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
        <Typography color="error">Error loading roles</Typography>
      </Box>
    );
  }

  const rolesData = (data as any)?.data;
  const roles: Role[] = Array.isArray(rolesData) ? rolesData : Array.isArray(data) ? data : [];

  const handleDelete = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this role?')) {
      deleteRole.mutate(id);
    }
  };

  const handleViewDetails = (id: number) => {
    navigate(getRoleDetailsPath(id));
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        bgcolor: 'background.paper',
        borderRadius: '8px',
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Description</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} align="right">
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {roles.map((role: Role) => (
            <TableRow
              key={role.id}
              hover
              onClick={() => handleViewDetails(role.id)}
              sx={{ cursor: 'pointer' }}
            >
              <TableCell>{role.name}</TableCell>
              <TableCell>{role.description}</TableCell>
              <TableCell align="right">
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                  <Tooltip title="View Details">
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewDetails(role.id);
                      }}
                    >
                      <VisibilityIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      size="small"
                      color="error"
                      onClick={(e) => handleDelete(e, role.id)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </TableCell>
            </TableRow>
          ))}
          {roles.length === 0 && (
            <TableRow>
              <TableCell colSpan={3} align="center" sx={{ py: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  No roles found.
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
