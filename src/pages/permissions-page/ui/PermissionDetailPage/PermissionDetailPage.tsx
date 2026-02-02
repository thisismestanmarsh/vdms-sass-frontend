import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Button,
  CircularProgress,
  Divider,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES, getPermissionEditPath } from '@shared/config/routes';
import { usePermission } from '@entities/permission/model/permissionHooks';

export const PermissionDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, error } = usePermission(id || '');

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !data?.data) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          p: 4,
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Typography color="error">Error loading permission or permission not found</Typography>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(ROUTES.PERMISSIONS)}>
          Back to Permissions
        </Button>
      </Box>
    );
  }

  const permission = data.data;

  const DetailItem = ({ label, value }: { label: string; value: string | number }) => (
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
          onClick={() => navigate(ROUTES.PERMISSIONS)}
          sx={{ textTransform: 'none' }}
        >
          Back
        </Button>
      </Box>

      <Paper sx={{ p: 4, borderRadius: '8px', border: '1px solid', borderColor: 'divider' }}>
        <Box
          sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}
        >
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
              {permission.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Permission Detail Overview
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={() => navigate(getPermissionEditPath(permission.id))}
            sx={{ borderRadius: '8px', textTransform: 'none' }}
          >
            Edit Permission
          </Button>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <DetailItem label="Resource" value={permission.resource} />
            <DetailItem label="Action" value={permission.action} />
            <DetailItem label="Module" value={permission.module} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <DetailItem label="Scope" value={permission.scope} />
            <DetailItem label="ID" value={permission.id} />
            <DetailItem label="Created At" value={permission.created_at || 'Recently Created'} />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <DetailItem label="Description" value={permission.description} />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};
