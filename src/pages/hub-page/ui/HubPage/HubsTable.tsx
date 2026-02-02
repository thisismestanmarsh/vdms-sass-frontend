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
import { useZones } from '@entities/zone/model/zoneHooks';
import type { Hub, Zone } from '@entities/zone/model/types';
import CircularProgress from '@mui/material/CircularProgress';

export const HubsTable = () => {
  const navigate = useNavigate();
  const { data: zones, isLoading, error } = useZones();

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
        <Typography color="error">Error loading hubs</Typography>
      </Box>
    );
  }

  const allHubs = (
    Array.isArray(zones?.data) ? zones.data : (zones?.data as any)?.zones || []
  ).flatMap((zone: Zone) =>
    (Array.isArray(zone.hubs) ? zone.hubs : []).map((hub: Hub) => ({
      ...hub,
      zone_name: zone.zone_name,
      zone_id: zone.zone_id,
      country: zone.country,
    }))
  );

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
            {Array.isArray(allHubs) &&
              allHubs.map((hub) => (
                <TableRow
                  key={hub.hub_id}
                  hover
                  onClick={() => navigate(getHubDetailsPath(hub.zone_id, hub.hub_id))}
                  sx={{
                    cursor: 'pointer',
                    '&:hover .location-actions': { visibility: 'visible' },
                    '&:last-child td, &:last-child th': { border: 0 },
                  }}
                >
                  <TableCell sx={{ color: 'primary.main', fontWeight: 600 }}>
                    {hub.hub_id}
                  </TableCell>
                  <TableCell>{hub.hub_name}</TableCell>
                  <TableCell>{hub.type}</TableCell>
                  <TableCell>{hub.country}</TableCell>
                  <TableCell>{hub.zone_name}</TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                      }}
                    >
                      <Typography variant="body2">{hub.address}</Typography>
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
                            if (hub.address) {
                              navigator.clipboard.writeText(hub.address);
                            }
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
