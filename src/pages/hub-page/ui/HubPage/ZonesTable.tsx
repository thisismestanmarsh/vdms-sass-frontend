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
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useNavigate } from 'react-router-dom';
import { getZoneDetailsPath } from '@shared/config/routes';

interface Zone {
    zone_id: string;
    zone_name: string;
    country: string;
    type: string;
    city_names: string[];
}

const dummyZones: Zone[] = [
    {
        zone_id: 'ZN001',
        zone_name: 'North Zone',
        country: 'India',
        type: 'Urban',
        city_names: ['Delhi', 'Gurugram', 'Noida'],
    },
    {
        zone_id: 'ZN002',
        zone_name: 'South Zone',
        country: 'India',
        type: 'Coastal',
        city_names: ['Bangalore', 'Chennai', 'Hyderabad'],
    },
    {
        zone_id: 'ZN003',
        zone_name: 'West Zone',
        country: 'India',
        type: 'Industrial',
        city_names: ['Mumbai', 'Pune', 'Ahmedabad'],
    },
    {
        zone_id: 'ZN004',
        zone_name: 'East Zone',
        country: 'India',
        type: 'Rural',
        city_names: ['Kolkata', 'Bhubaneswar', 'Guwahati'],
    },
];

export const ZonesTable = () => {
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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dummyZones.map((zone) => (
                            <TableRow
                                key={zone.zone_id}
                                hover
                                onClick={() => navigate(getZoneDetailsPath(zone.zone_id))}
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
                                        {zone.city_names.map((city) => (
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
