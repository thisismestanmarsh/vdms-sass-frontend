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
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FilterListIcon from '@mui/icons-material/FilterList';

import { useNavigate } from 'react-router-dom';
import { getHubDetailsPath } from '@shared/config/routes';

interface Hub {
  id: string;
  name: string;
  type: string;
  country: string;
  zone: string;
  location: string;
  status: boolean;
}

const dummyHubs: Hub[] = [
  {
    id: 'HB0023',
    name: 'ABC Hub',
    type: 'Parking Hub',
    country: 'India',
    zone: 'APAC',
    location: 'Random line 1, Sector 42, Gurugram',
    status: true,
  },
  {
    id: 'HB0024',
    name: 'ABC Hub',
    type: 'Charging Hub',
    country: 'India',
    zone: 'APAC',
    location: 'Random line 1, Sector 42, Gurugram',
    status: true,
  },
  {
    id: 'HB0025',
    name: 'ABC Hub',
    type: 'Parking Hub',
    country: 'India',
    zone: 'APAC',
    location: 'Random line 1, Sector 42, Gurugram',
    status: true,
  },
  {
    id: 'HB0026',
    name: 'ABC Hub',
    type: 'Charging Hub',
    country: 'India',
    zone: 'APAC',
    location: 'Random line 1, Sector 42, Gurugram',
    status: true,
  },
  {
    id: 'HB0027',
    name: 'ABC Hub',
    type: 'Combined Hub',
    country: 'India',
    zone: 'APAC',
    location: 'Random line 1, Sector 42, Gurugram',
    status: true,
  },
  {
    id: 'HB0028',
    name: 'ABC Hub',
    type: 'Charging Hub',
    country: 'India',
    zone: 'APAC',
    location: 'Random line 1, Sector 42, Gurugram',
    status: true,
  },
  {
    id: 'HB0029',
    name: 'ABC Hub',
    type: 'Parking Hub',
    country: 'India',
    zone: 'APAC',
    location: 'Random line 1, Sector 42, Gurugram',
    status: true,
  },
  {
    id: 'HB0030',
    name: 'ABC Hub',
    type: 'Parking Hub',
    country: 'India',
    zone: 'APAC',
    location: 'Random line 1, Sector 42, Gurugram',
    status: true,
  },
];

export const HubsTable = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TableContainer
        component={Paper}
        sx={{
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 'none',
          border: '1px solid',
          borderColor: 'divider',
          maxHeight: 440, // Added scroll
          overflowY: 'auto',
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  Hub ID <FilterListIcon fontSize="small" color="action" />
                </Box>
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  Hub Name <FilterListIcon fontSize="small" color="action" />
                </Box>
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  Hub Type <FilterListIcon fontSize="small" color="action" />
                </Box>
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  Country <FilterListIcon fontSize="small" color="action" />
                </Box>
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  Zone <FilterListIcon fontSize="small" color="action" />
                </Box>
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Location</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dummyHubs.map((hub) => (
              <TableRow
                key={hub.id}
                hover
                onClick={() => navigate(getHubDetailsPath(hub.id))}
                sx={{
                  cursor: 'pointer',
                  '&:hover .location-actions': { visibility: 'visible' },
                  '&:last-child td, &:last-child th': { border: 0 },
                }}
              >
                <TableCell sx={{ color: 'primary.main', fontWeight: 600 }}>{hub.id}</TableCell>
                <TableCell>{hub.name}</TableCell>
                <TableCell>{hub.type}</TableCell>
                <TableCell>{hub.country}</TableCell>
                <TableCell>{hub.zone}</TableCell>
                <TableCell>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                    }}
                  >
                    <Typography variant="body2">{hub.location}</Typography>
                    <Box
                      className="location-actions"
                      sx={{ visibility: 'hidden', display: 'flex' }}
                    >
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={(e) => {
                          e.stopPropagation(); /* handle location */
                        }}
                      >
                        <LocationOnIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        sx={{ color: 'text.secondary' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          navigator.clipboard.writeText(hub.location);
                        }}
                      >
                        <ContentCopyIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Pagination
          count={10}
          shape="rounded"
          color="primary"
          sx={{
            '& .MuiPaginationItem-root': {
              color: 'text.secondary',
              '&.Mui-selected': {
                color: '#ffffff',
                bgcolor: 'primary.main',
              },
            },
          }}
        />
      </Box>
    </Box>
  );
};
