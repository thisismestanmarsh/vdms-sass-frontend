import { Box, Typography, Link, Paper, Grid, Button, Switch } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { getHubsTabPath, getHubEditPath } from '@shared/config/routes';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import EditIcon from '@mui/icons-material/Edit';

export const HubDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock data based on ID or default
  const hub = {
    id: id || 'HB0023',
    name: 'Hub Name',
    type: 'Parking Hub',
    country: 'India',
    zone: 'APAC',
    address: 'Random line 1, Sector 42, Gurugram',
    status: true,
  };

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Link
            component="button"
            onClick={() => navigate(getHubsTabPath('hubs'))}
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
            {hub.name}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center', gap: 1 }}
          >
            <Box component="span" sx={{ fontWeight: 600 }}>
              #{hub.id}
            </Box>
            <Box component="span" sx={{ color: 'divider' }}>
              |
            </Box>
            {hub.address}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, pt: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              Status
            </Typography>
            <Switch defaultChecked={hub.status} color="primary" size="small" />
          </Box>
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={() => navigate(getHubEditPath(hub.id))}
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
          Hub Details
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
                Hub Type
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {hub.type}
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
                {hub.country}
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
                Zone
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {hub.zone}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
};
