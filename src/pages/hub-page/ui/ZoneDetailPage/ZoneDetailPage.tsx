import {
    Box,
    Typography,
    Link,
    Paper,
    Grid,
    Button,
    Switch,
    Chip,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { getHubsTabPath, getZoneEditPath, getHubDetailsPath } from '@shared/config/routes';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import EditIcon from '@mui/icons-material/Edit';

import { useZone } from '@entities/zone/model/zoneHooks';
import CircularProgress from '@mui/material/CircularProgress';

export const ZoneDetailPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { data, isLoading, error } = useZone(id);

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error || !data?.data) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                <Typography color="error">Error loading zone details</Typography>
            </Box>
        );
    }

    const zone = data.data;

    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                    <Link
                        component="button"
                        onClick={() => navigate(getHubsTabPath('zones'))}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5,
                            color: 'primary.main',
                            textDecoration: 'none',
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            mb: 1,
                        }}
                    >
                        <ArrowBackIosIcon sx={{ fontSize: '0.75rem' }} /> Go back
                    </Link>
                    <Typography variant="h4" sx={{ fontWeight: 600, mb: 0.5 }}>
                        {zone.zone_name}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center', gap: 1 }}
                    >
                        <Box component="span" sx={{ fontWeight: 600 }}>
                            #{zone.zone_id}
                        </Box>
                        <Box component="span" sx={{ color: 'divider' }}>
                            |
                        </Box>
                        {zone.country}
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, pt: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            Status
                        </Typography>
                        <Switch defaultChecked={true} color="primary" size="small" />
                    </Box>
                    <Button
                        variant="contained"
                        startIcon={<EditIcon />}
                        onClick={() => navigate(getZoneEditPath(zone.zone_id.toString()))}
                        sx={{
                            textTransform: 'none',
                            borderRadius: 2,
                            px: 3,
                        }}
                    >
                        Edit
                    </Button>
                </Box>
            </Box>

            <Box sx={{ mt: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    Zone Details
                </Typography>
                <Paper
                    sx={{
                        p: 3,
                        bgcolor: 'background.paper',
                        borderRadius: 2,
                        boxShadow: 'none',
                        border: '1px solid',
                        borderColor: 'divider',
                    }}
                >
                    <Grid container spacing={4}>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Typography
                                variant="caption"
                                sx={{
                                    color: 'text.secondary',
                                    fontWeight: 600,
                                    textTransform: 'uppercase',
                                    mb: 1,
                                    display: 'block',
                                }}
                            >
                                Zone Type
                            </Typography>
                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                {zone.type}
                            </Typography>
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Typography
                                variant="caption"
                                sx={{
                                    color: 'text.secondary',
                                    fontWeight: 600,
                                    textTransform: 'uppercase',
                                    mb: 1,
                                    display: 'block',
                                }}
                            >
                                Country
                            </Typography>
                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                {zone.country}
                            </Typography>
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Typography
                                variant="caption"
                                sx={{
                                    color: 'text.secondary',
                                    fontWeight: 600,
                                    textTransform: 'uppercase',
                                    mb: 1,
                                    display: 'block',
                                }}
                            >
                                Cities
                            </Typography>
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
                        </Grid>
                    </Grid>
                </Paper>
            </Box>

            {zone.hubs && zone.hubs.length > 0 && (
                <Box sx={{ mt: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                        Hubs in this Zone
                    </Typography>
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
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Hub ID</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Hub Name</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Type</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Address</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {zone.hubs.map((hub) => (
                                    <TableRow
                                        key={hub.hub_id}
                                        hover
                                        onClick={() => navigate(getHubDetailsPath(zone.zone_id, hub.hub_id))}
                                        sx={{ cursor: 'pointer' }}
                                    >
                                        <TableCell sx={{ color: 'primary.main', fontWeight: 600 }}>{hub.hub_id}</TableCell>
                                        <TableCell>{hub.hub_name}</TableCell>
                                        <TableCell>{hub.type}</TableCell>
                                        <TableCell>
                                            <Chip
                                                label={hub.status}
                                                size="small"
                                                color={hub.status === 'Active' ? 'success' : 'default'}
                                                sx={{ borderRadius: 1 }}
                                            />
                                        </TableCell>
                                        <TableCell>{hub.address}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            )}
        </Box>
    );
};
