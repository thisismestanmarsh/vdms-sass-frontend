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
import { getZoneDetailsPath } from '@shared/config/routes';

import { useZones } from '@entities/zone/model/zoneHooks';
import type { Zone } from '@entities/zone/model/types';
import CircularProgress from '@mui/material/CircularProgress';

export const ZonesTable = () => {
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
                <Typography color="error">Error loading zones</Typography>
            </Box>
        );
    }

    const zonesList = zones?.data || [];

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
                    maxHeight: 440,
                    overflowY: 'auto',
                }}
            >
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    Zone ID <FilterListIcon fontSize="small" color="action" />
                                </Box>
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    Zone Name <FilterListIcon fontSize="small" color="action" />
                                </Box>
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    Country <FilterListIcon fontSize="small" color="action" />
                                </Box>
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    Type <FilterListIcon fontSize="small" color="action" />
                                </Box>
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>City Names</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Hubs</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {zonesList.map((zone: Zone) => (
                            <TableRow
                                key={zone.zone_id}
                                hover
                                onClick={() => navigate(getZoneDetailsPath(zone.zone_id.toString()))}
                                sx={{
                                    cursor: 'pointer',
                                    '&:last-child td, &:last-child th': { border: 0 },
                                }}
                            >
                                <TableCell sx={{ color: 'primary.main', fontWeight: 600 }}>{zone.zone_id}</TableCell>
                                <TableCell>{zone.zone_name}</TableCell>
                                <TableCell>{zone.country}</TableCell>
                                <TableCell>{zone.type}</TableCell>
                                <TableCell>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {zone.city_names.map((city: string) => (
                                            <Chip
                                                key={city}
                                                label={city}
                                                size="small"
                                                sx={{
                                                    bgcolor: 'rgba(255, 255, 255, 0.05)',
                                                    color: 'text.secondary',
                                                    fontSize: '0.75rem',
                                                }}
                                            />
                                        ))}
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={`${zone.hubs?.length || 0} Hubs`}
                                        size="small"
                                        variant="outlined"
                                        sx={{ borderColor: 'divider' }}
                                    />
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
        </Box >
    );
};
