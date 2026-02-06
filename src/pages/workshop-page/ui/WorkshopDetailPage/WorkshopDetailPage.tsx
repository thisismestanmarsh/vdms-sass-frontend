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
  Stack,
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import EditIcon from '@mui/icons-material/Edit';
import { ROUTES, getWorkshopEditPath } from '@shared/config/routes';
import { useWorkshop } from '@entities/workshop/api/workshopApi';

const DetailItem = ({
  label,
  value,
  color,
}: {
  label: string;
  value: string | React.ReactNode;
  color?: string;
}) => (
  <Box sx={{ mb: 2 }}>
    <Typography
      variant="caption"
      color="text.secondary"
      sx={{ display: 'block', mb: 0.5, fontWeight: 500 }}
    >
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
    case 'active':
      return 'success';
    case 'inactive':
      return 'error';
    default:
      return 'default';
  }
};

export const WorkshopDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useWorkshop(id || '');

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
        <Typography color="error">Failed to load workshop details.</Typography>
      </Box>
    );
  }

  const workshop = data.data;

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Link
            component="button"
            onClick={() => navigate(ROUTES.WORKSHOPS)}
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
            <ArrowBackIosIcon sx={{ fontSize: '0.75rem' }} /> Back to Workshops
          </Link>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            {workshop.workshop_name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Workshop ID: {workshop.workshop_id}
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          onClick={() => navigate(getWorkshopEditPath(workshop.workshop_id))}
          sx={{
            borderRadius: '8px',
            textTransform: 'none',
            px: 3,
            bgcolor: 'primary.main',
            '&:hover': { bgcolor: 'primary.dark' },
          }}
        >
          Edit Workshop
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
              <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                <DetailItem label="Workshop Name" value={workshop.workshop_name} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                <DetailItem label="Workshop ID" value={workshop.workshop_id} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                <DetailItem label="Type" value={workshop.type} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                <DetailItem label="Primary Phone" value={workshop.primary_phone} />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <DetailItem label="Address" value={workshop.address} />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <DetailItem
                  label="Maps Link"
                  value={
                    workshop.maps_link ? (
                      <Link
                        href={workshop.maps_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ color: 'primary.main' }}
                      >
                        View on Google Maps
                      </Link>
                    ) : (
                      '-'
                    )
                  }
                />
              </Grid>
            </Grid>

            <Divider sx={{ my: 4 }} />

            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              System Information
            </Typography>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <DetailItem label="Zone ID" value={workshop.zone_id} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <DetailItem label="Company ID" value={workshop.company_id} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <DetailItem
                  label="Created At"
                  value={new Date(workshop.created_at).toLocaleString()}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <DetailItem
                  label="Last Updated"
                  value={new Date(workshop.updated_at).toLocaleString()}
                />
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
                Workshop Status
              </Typography>
              <DetailItem
                label="Status"
                value={
                  <Chip
                    label={workshop.status}
                    size="small"
                    color={getStatusColor(workshop.status)}
                    variant="outlined"
                  />
                }
              />
            </Paper>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};
