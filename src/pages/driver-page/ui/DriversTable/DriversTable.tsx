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
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@shared/config/routes';

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'valid':
      return 'success';
    case 'expiring':
      return 'warning';
    case 'expired':
      return 'error';
    default:
      return 'default';
  }
};

export const DriversTable = () => {
  const navigate = useNavigate();

  // Dummy data
  const drivers = [
    {
      id: 'D00123',
      name: 'Samrat',
      phone: '9812341234',
      hub: 'HSR Layout',
      status: 'valid',
      auctionStatus: 'valid',
      driverStatus: 'valid',
      createdAt: '10:30, 15 Dec',
      updatedAt: '13:45, 10 Dec',
    },
    {
      id: 'D00124',
      name: 'Ranjeet',
      phone: '8712341234',
      hub: 'Indiranagar',
      status: 'valid',
      auctionStatus: 'valid',
      driverStatus: 'valid',
      createdAt: '11:00, 15 Dec',
      updatedAt: '14:20, 10 Dec',
    },
    {
      id: 'D00125',
      name: 'Akash',
      phone: '7612341234',
      hub: 'Koramangala',
      status: 'expiring',
      auctionStatus: 'expiring',
      driverStatus: 'expiring',
      createdAt: '12:15, 15 Dec',
      updatedAt: '15:10, 10 Dec',
    },
    {
      id: 'D00126',
      name: 'Ajit',
      phone: '9512341234',
      hub: 'Whitefield',
      status: 'expired',
      auctionStatus: 'expired',
      driverStatus: 'expired',
      createdAt: '09:45, 15 Dec',
      updatedAt: '16:30, 10 Dec',
    },
  ];

  return (
    <TableContainer
      component={Paper}
      sx={{
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 'none',
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Table>
        <TableHead sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)' }}>
          <TableRow>
            <TableCell sx={{ fontWeight: 600 }}>Driver ID</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Driver Name</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Phone N...</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Hub</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>DL Status</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Aadhar Status</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Driver Status</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Created At</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Last Updated At</TableCell>
            <TableCell align="right" sx={{ fontWeight: 600 }}>
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {drivers.map((driver) => (
            <TableRow key={driver.id} hover>
              <TableCell sx={{ color: 'primary.main', fontWeight: 500 }}>{driver.id}</TableCell>
              <TableCell>{driver.name}</TableCell>
              <TableCell>{driver.phone}</TableCell>
              <TableCell>{driver.hub}</TableCell>
              <TableCell>
                <Chip
                  label={driver.status}
                  size="small"
                  color={getStatusColor(driver.status)}
                  variant="outlined"
                  sx={{ textTransform: 'capitalize' }}
                />
              </TableCell>
              <TableCell>
                <Chip
                  label={driver.auctionStatus}
                  size="small"
                  color={getStatusColor(driver.auctionStatus)}
                  variant="outlined"
                  sx={{ textTransform: 'capitalize' }}
                />
              </TableCell>
              <TableCell>
                <Chip
                  label={driver.driverStatus}
                  size="small"
                  color={getStatusColor(driver.driverStatus)}
                  variant="outlined"
                  sx={{ textTransform: 'capitalize' }}
                />
              </TableCell>
              <TableCell sx={{ color: 'text.secondary', fontSize: '0.8125rem' }}>
                {driver.createdAt}
              </TableCell>
              <TableCell sx={{ color: 'text.secondary', fontSize: '0.8125rem' }}>
                {driver.updatedAt}
              </TableCell>
              <TableCell align="right">
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 0.5 }}>
                  <IconButton size="small" sx={{ color: 'text.secondary' }}>
                    <VisibilityIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    sx={{ color: 'primary.main' }}
                    onClick={() => navigate(ROUTES.DRIVER_EDIT.replace(':id', driver.id))}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" sx={{ color: 'error.main' }}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
