import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    Link,
    Paper,
    Grid,
    Chip,
    Button,
    CircularProgress,
    Divider,
    Stack
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import EditIcon from '@mui/icons-material/Edit';
import { ROUTES } from '@shared/config/routes';
import { useDriver } from '@entities/driver/model/driverHooks';

const DetailItem = ({ label, value, color }: { label: string; value: string | React.ReactNode; color?: string }) => (
    <Box sx={{ mb: 2 }}>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5, fontWeight: 500 }}>
            {label}
        </Typography>
        {typeof value === 'string' ? (
            <Typography variant="body1" sx={{ fontWeight: 500, color: color || 'text.primary' }}>
                {value || '-'}
            </Typography>
        ) : (
            value
        )}
    </Box>
);

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

export const DriverDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data, isLoading, isError } = useDriver(id || '');

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (isError || !data?.data) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Typography color="error">Failed to load driver details.</Typography>
            </Box>
        );
    }

    const driver = data.data;

    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Link
                        component="button"
                        onClick={() => navigate(ROUTES.DRIVERS)}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5,
                            color: 'primary.main',
                            textDecoration: 'none',
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            mb: 1,
                            background: 'none',
                            border: 'none',
                            padding: 0,
                            cursor: 'pointer',
                        }}
                    >
                        <ArrowBackIosIcon sx={{ fontSize: '0.75rem' }} /> Back to Drivers
                    </Link>
                    <Typography variant="h4" sx={{ fontWeight: 600 }}>
                        {driver.driver_full_name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Driver ID: {driver.driver_id}
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<EditIcon />}
                    onClick={() => navigate(ROUTES.DRIVER_EDIT.replace(':id', driver.id))}
                    sx={{
                        borderRadius: '8px',
                        textTransform: 'none',
                        px: 3,
                        bgcolor: 'primary.main',
                        '&:hover': { bgcolor: 'primary.dark' },
                    }}
                >
                    Edit Driver
                </Button>
            </Box>

            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 8 }}>
                    <Paper
                        sx={{
                            p: 4,
                            bgcolor: 'background.paper',
                            borderRadius: '8px',
                            boxShadow: 'none',
                            border: '1px solid',
                            borderColor: 'divider',
                        }}
                    >
                        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                            Basic Information
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                <DetailItem label="Full Name" value={driver.driver_full_name} />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                <DetailItem label="Email" value={driver.email} />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                <DetailItem label="Phone Number" value={driver.phone_number} />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                <DetailItem label="Alternate Phone" value={driver.alternate_phone} />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                <DetailItem label="Joining Date" value={driver.joining_date ? new Date(driver.joining_date).toLocaleDateString() : '-'} />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                <DetailItem label="Driver Type" value={driver.driver_type} />
                            </Grid>
                            <Grid size={{ xs: 12, md: 8 }}>
                                <DetailItem label="Address" value={driver.address} />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                <DetailItem label="City" value={driver.city} />
                            </Grid>
                        </Grid>

                        <Divider sx={{ my: 4 }} />

                        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                            Hub Information
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                <DetailItem label="Hub Name" value={driver.hub_name} />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                <DetailItem label="Hub ID" value={driver.hub_id} />
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <Stack spacing={3}>
                        <Paper
                            sx={{
                                p: 3,
                                bgcolor: 'background.paper',
                                borderRadius: '8px',
                                boxShadow: 'none',
                                border: '1px solid',
                                borderColor: 'divider',
                            }}
                        >
                            <Typography variant="subtitle1" sx={{ mb: 3, fontWeight: 600 }}>
                                Status & Verification
                            </Typography>
                            <DetailItem
                                label="Driver Status"
                                value={
                                    <Chip
                                        label={driver.driver_status}
                                        size="small"
                                        color={getStatusColor(driver.driver_status)}
                                        variant="outlined"
                                    />
                                }
                            />
                            <DetailItem
                                label="DL Status"
                                value={
                                    <Chip
                                        label={driver.dl_status}
                                        size="small"
                                        color={getStatusColor(driver.dl_status)}
                                        variant="outlined"
                                    />
                                }
                            />
                            <DetailItem
                                label="Aadhaar Status"
                                value={
                                    <Chip
                                        label={driver.aadhaar_status}
                                        size="small"
                                        color={getStatusColor(driver.aadhaar_status)}
                                        variant="outlined"
                                    />
                                }
                            />
                        </Paper>

                        <Paper
                            sx={{
                                p: 3,
                                bgcolor: 'background.paper',
                                borderRadius: '8px',
                                boxShadow: 'none',
                                border: '1px solid',
                                borderColor: 'divider',
                            }}
                        >
                            <Typography variant="subtitle1" sx={{ mb: 3, fontWeight: 600 }}>
                                Licence & ID
                            </Typography>
                            <DetailItem label="DL Number" value={driver.dl_number} />
                            <DetailItem label="DL Expiry" value={driver.dl_expiry_date ? new Date(driver.dl_expiry_date).toLocaleDateString() : '-'} />
                            <DetailItem label="Aadhaar Number" value={driver.aadhaar_number} />
                            <DetailItem label="License Type" value={driver.license_type} />
                        </Paper>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
};
