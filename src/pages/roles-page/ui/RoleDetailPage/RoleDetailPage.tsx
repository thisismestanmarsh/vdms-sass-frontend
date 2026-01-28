import {
    Container,
    Typography,
    Box,
    Paper,
    Grid,
    Button,
    CircularProgress,
    Divider,
    Chip
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '@shared/config/routes';
import { useRole } from '@entities/role/model/roleHooks';
import type { Permission } from '@entities/permission/model/types';

export const RoleDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data, isLoading, error } = useRole(id || '');

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    const roleData = (data as any)?.data || data;
    const role = roleData && typeof roleData === 'object' && 'id' in roleData ? roleData : null;

    if (error || !role) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4, flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <Typography color="error">Error loading role or role not found</Typography>
                <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(ROUTES.ROLES)}>
                    Back to Roles
                </Button>
            </Box>
        );
    }

    const DetailItem = ({ label, value }: { label: string; value: string | number | React.ReactNode }) => (
        <Box sx={{ mb: 2 }}>
            <Typography variant="overline" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                {label}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {value || 'N/A'}
            </Typography>
        </Box>
    );

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate(ROUTES.ROLES)}
                    sx={{ textTransform: 'none' }}
                >
                    Back
                </Button>
            </Box>

            <Paper sx={{ p: 4, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                    <Box>
                        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                            {role.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Role Detail Overview
                        </Typography>
                    </Box>
                </Box>

                <Divider sx={{ my: 3 }} />

                <Grid container spacing={4}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <DetailItem label="ID" value={role.id} />
                        <DetailItem label="Created At" value={role.created_at || 'Recently Created'} />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <DetailItem label="Description" value={role.description} />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <Typography variant="overline" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                            Permissions
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {role.permissions?.length > 0 ? (
                                role.permissions.map((permission: Permission) => (
                                    <Chip
                                        key={permission.id}
                                        label={`${permission.module}: ${permission.name}`}
                                        variant="outlined"
                                        size="small"
                                    />
                                ))
                            ) : (
                                <Typography variant="body2" color="text.secondary">No permissions assigned.</Typography>
                            )}
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};
