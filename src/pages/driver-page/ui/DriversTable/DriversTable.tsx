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
import { ROUTES, getDriverDetailsPath } from '@shared/config/routes';
import { useDrivers, useDeleteDriver } from '@entities/driver/model/driverHooks';
import { useState } from 'react';
import { IS_DEMO_MODE } from '@shared/config/demo';
import { MOCK_DRIVERS } from './demoData';

const getStatusColor = (status: string) => {
  if (!status) return 'default';
  switch (status.toLowerCase()) {
    case 'valid':
    case 'active':
    case 'verified':
      return 'success';
    case 'expiring':
    case 'pending':
      return 'warning';
    case 'expired':
    case 'inactive':
      return 'error';
    default:
      return 'default';
  }
};

export const DriversTable = () => {
  const navigate = useNavigate();
  const { data: apiData, isLoading: apiLoading, isError: apiError } = useDrivers();
  const deleteDriver = useDeleteDriver();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const data = IS_DEMO_MODE ? { data: MOCK_DRIVERS } : apiData;
  const isLoading = IS_DEMO_MODE ? false : apiLoading;
  const isError = IS_DEMO_MODE ? false : apiError;

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
        <Typography color="error">Failed to load drivers data.</Typography>
      </Box>
    );
  }

  const drivers = data?.data || [];

  const handleDelete = (id: string) => {
    deleteDriver.mutate(id, {
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
              <TableCell sx={{ fontWeight: 600 }}>Driver ID</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Driver Name</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Phone No.</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Hub</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>DL Status</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Aadhar Status</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Driver Status</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Joining Date</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {drivers.map((driver) => (
              <TableRow key={driver.id} hover>
                <TableCell sx={{ color: 'primary.main', fontWeight: 500 }}>
                  {driver.driver_id}
                </TableCell>
                <TableCell>{driver.driver_full_name}</TableCell>
                <TableCell>{driver.phone_number}</TableCell>
                <TableCell>{driver.hub_name}</TableCell>
                <TableCell>
                  <Chip
                    label={driver.dl_status}
                    size="small"
                    color={getStatusColor(driver.dl_status)}
                    variant="outlined"
                    sx={{ textTransform: 'capitalize' }}
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={driver.aadhaar_status}
                    size="small"
                    color={getStatusColor(driver.aadhaar_status)}
                    variant="outlined"
                    sx={{ textTransform: 'capitalize' }}
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={driver.driver_status}
                    size="small"
                    color={getStatusColor(driver.driver_status)}
                    variant="outlined"
                    sx={{ textTransform: 'capitalize' }}
                  />
                </TableCell>
                <TableCell sx={{ color: 'text.secondary', fontSize: '0.8125rem' }}>
                  {driver.joining_date ? new Date(driver.joining_date).toLocaleDateString() : '-'}
                </TableCell>
                <TableCell align="right">
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 0.5 }}>
                    <IconButton
                      size="small"
                      sx={{ color: 'text.secondary' }}
                      onClick={() => navigate(getDriverDetailsPath(driver.id))}
                    >
                      <VisibilityIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      sx={{ color: 'primary.main' }}
                      onClick={() => navigate(ROUTES.DRIVER_EDIT.replace(':id', driver.id))}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      sx={{ color: 'error.main' }}
                      onClick={() => setDeleteId(driver.id)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
            {drivers.length === 0 && (
              <TableRow>
                <TableCell colSpan={9} align="center" sx={{ py: 4 }}>
                  <Typography color="text.secondary">No drivers found.</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={!!deleteId} onClose={() => setDeleteId(null)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this driver? This action cannot be undone.
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <MuiButton onClick={() => setDeleteId(null)} variant="outlined" sx={{ borderRadius: '8px' }}>
            Cancel
          </MuiButton>
          <MuiButton
            onClick={() => deleteId && handleDelete(deleteId)}
            variant="contained"
            color="error"
            sx={{ borderRadius: '8px' }}
            disabled={deleteDriver.isPending}
          >
            {deleteDriver.isPending ? <CircularProgress size={24} /> : 'Delete'}
          </MuiButton>
        </DialogActions>
      </Dialog>
    </>
  );
};
