import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Pagination,
  Chip,
  Typography,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';

import { useNavigate } from 'react-router-dom';
import { getHubDetailsPath } from '@shared/config/routes';
import { useFlattenedZones } from '@entities/zone/model/zoneHooks';
import CircularProgress from '@mui/material/CircularProgress';

export const HubsTable = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data: response, isLoading, error } = useFlattenedZones({ page, limit });

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
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
        <Typography color="error">Error loading hubs</Typography>
      </Box>
    );
  }

  const hubs = response?.data || [];
  const meta = response?.meta;

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
          maxHeight: 'calc(100vh - 250px)',
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
                  City <FilterListIcon fontSize="small" color="action" />
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
              <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {hubs.map((hub) => (
              <TableRow
                key={hub.hub_id}
                hover
                onClick={() => navigate(getHubDetailsPath(hub.zone_id, hub.hub_id))}
                sx={{
                  cursor: 'pointer',
                  '&:last-child td, &:last-child th': { border: 0 },
                }}
              >
                <TableCell sx={{ color: 'primary.main', fontWeight: 600 }}>{hub.hub_id}</TableCell>
                <TableCell>{hub.hub_name}</TableCell>
                <TableCell>{hub.city_name}</TableCell>
                <TableCell>{hub.country}</TableCell>
                <TableCell>{hub.zone_name}</TableCell>
                <TableCell>
                  <Chip
                    label={hub.status}
                    size="small"
                    color={hub.status === 'Active' ? 'success' : 'default'}
                    variant="outlined"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Pagination
          count={meta?.total_pages || 1}
          page={page}
          onChange={handlePageChange}
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
