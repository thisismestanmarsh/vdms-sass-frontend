import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Alert,
  IconButton,
  Tooltip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { ROUTES, getVehicleDetailsPath } from '@shared/config/routes';

import { useVehicles, useDeleteVehicle } from '@entities/vehicle/model/vehicleHooks';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import { IS_DEMO_MODE } from '@shared/config/demo';
import { MOCK_VEHICLES } from './demoData';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';

export const VehicleListPage = () => {
  const navigate = useNavigate();
  const { data: apiData, isLoading: apiLoading, error: apiError } = useVehicles(1, 50);

  const data = IS_DEMO_MODE ? { data: MOCK_VEHICLES } : apiData;
  const isLoading = IS_DEMO_MODE ? false : apiLoading;
  const error = IS_DEMO_MODE ? null : apiError;
  const deleteVehicleMutation = useDeleteVehicle();
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState<string | number | null>(null);

  const handleDeleteClick = (id: string | number) => {
    setVehicleToDelete(id);
    setDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (vehicleToDelete) {
      deleteVehicleMutation.mutate(vehicleToDelete, {
        onSuccess: () => {
          setDeleteConfirmationOpen(false);
          setVehicleToDelete(null);
        },
      });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmationOpen(false);
    setVehicleToDelete(null);
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">Failed to load vehicles. Please try again later.</Alert>
      </Box>
    );
  }

  const vehicles = data?.data || [];

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Vehicles
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate(ROUTES.VEHICLE_CREATE)}
          sx={{ borderRadius: '8px', textTransform: 'none', px: 3, bgcolor: 'primary.main' }}
        >
          Create Vehicle
        </Button>
      </Box>

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
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Vehicle Number</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>OEM & Model</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Engine</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Hub</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vehicles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                  No vehicles found.
                </TableCell>
              </TableRow>
            ) : (
              vehicles.map((vehicle) => (
                <TableRow key={vehicle.id} hover>
                  <TableCell sx={{ fontWeight: 500 }}>{vehicle.vehicle_number || '-'}</TableCell>
                  <TableCell>
                    {`${vehicle.oem || ''} ${vehicle.model || ''}`.trim() || '-'}
                  </TableCell>
                  <TableCell>{vehicle.type_of_vehicle || '-'}</TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: 'inline-block',
                        px: 1.5,
                        py: 0.5,
                        borderRadius: '12px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        bgcolor:
                          vehicle.engine_type === 'EV'
                            ? 'rgba(0, 163, 108, 0.1)'
                            : 'rgba(255, 107, 0, 0.1)',
                        color: vehicle.engine_type === 'EV' ? '#00A36C' : '#FF6B00',
                      }}
                    >
                      {vehicle.engine_type || '-'}
                    </Box>
                  </TableCell>
                  <TableCell>{vehicle.hub_id || '-'}</TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                      <Tooltip title="View Details">
                        <IconButton
                          size="small"
                          onClick={() => navigate(getVehicleDetailsPath(vehicle.id || ''))}
                          sx={{ color: 'primary.main' }}
                        >
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit Vehicle">
                        <IconButton
                          size="small"
                          onClick={() =>
                            navigate(ROUTES.VEHICLE_EDIT.replace(':id', vehicle.id || ''))
                          }
                          sx={{ color: 'text.secondary' }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Vehicle">
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteClick(vehicle.id || '')}
                          sx={{ color: 'error.main' }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={deleteConfirmationOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete Vehicle</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this vehicle? This action cannot be undone.
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
