import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Box,
  Typography,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button as MuiButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
import { getWorkshopDetailsPath, getWorkshopEditPath } from '@shared/config/routes';
import { useWorkshops, useDeleteWorkshop } from '@entities/workshop/api/workshopApi';
import { useState } from 'react';

const getStatusColor = (status: string) => {
  if (!status) return 'default';
  switch (status.toLowerCase()) {
    case 'active':
      return 'success';
    case 'inactive':
      return 'error';
    default:
      return 'default';
  }
};

export const WorkshopsTable = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useWorkshops();
  const deleteWorkshop = useDeleteWorkshop();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <Typography color="error">Failed to load workshops data.</Typography>
      </Box>
    );
  }

  const workshops = data?.data || [];

  const handleDelete = (id: string) => {
    deleteWorkshop.mutate(id, {
      onSuccess: () => {
        setDeleteId(null);
      },
    });
  };

  return (
    <>
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
          <TableHead sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Workshop ID</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Workshop Name</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Address</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {workshops.map((workshop) => (
              <TableRow key={workshop.id} hover>
                <TableCell sx={{ color: 'primary.main', fontWeight: 500 }}>
                  {workshop.workshop_id}
                </TableCell>
                <TableCell>{workshop.workshop_name}</TableCell>
                <TableCell>{workshop.type}</TableCell>
                <TableCell
                  sx={{
                    maxWidth: 200,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {workshop.address}
                </TableCell>
                <TableCell>
                  <Chip
                    label={workshop.status}
                    size="small"
                    color={getStatusColor(workshop.status)}
                    variant="outlined"
                    sx={{ textTransform: 'capitalize' }}
                  />
                </TableCell>
                <TableCell align="right">
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 0.5 }}>
                    <IconButton
                      size="small"
                      sx={{ color: 'text.secondary' }}
                      onClick={() => navigate(getWorkshopDetailsPath(workshop.workshop_id))}
                    >
                      <VisibilityIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      sx={{ color: 'primary.main' }}
                      onClick={() => navigate(getWorkshopEditPath(workshop.workshop_id))}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      sx={{ color: 'error.main' }}
                      onClick={() => setDeleteId(workshop.workshop_id)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
            {workshops.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                  <Typography color="text.secondary">No workshops found.</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={!!deleteId} onClose={() => setDeleteId(null)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this workshop? This action cannot be undone.
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <MuiButton
            onClick={() => setDeleteId(null)}
            variant="outlined"
            sx={{ borderRadius: '8px' }}
          >
            Cancel
          </MuiButton>
          <MuiButton
            onClick={() => deleteId && handleDelete(deleteId)}
            variant="contained"
            color="error"
            sx={{ borderRadius: '8px' }}
            disabled={deleteWorkshop.isPending}
          >
            {deleteWorkshop.isPending ? <CircularProgress size={24} /> : 'Delete'}
          </MuiButton>
        </DialogActions>
      </Dialog>
    </>
  );
};
