import { useState, useEffect } from 'react';
import { Box, Typography, Link, Paper, Grid, TextField, MenuItem, Button, CircularProgress } from '@mui/material';
import { useNavigate, useLocation, useParams, useSearchParams } from 'react-router-dom';
import { getHubDetailsPath, getHubsTabPath } from '@shared/config/routes';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CheckIcon from '@mui/icons-material/Check';
import { useHub, useZones, useCreateHub, useUpdateHub } from '@entities/zone/model/zoneHooks';

export const CreateHubPage = () => {
  const { zoneId: urlZoneId, hubId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const isEdit = location.pathname.includes('/edit');

  // If coming from ZoneDetailPage, we might have zoneId in query or params
  const initialZoneId = urlZoneId || searchParams.get('zoneId') || '';

  const { data: zonesData } = useZones();
  const zones = zonesData?.data || [];

  const { data: hubData, isLoading: isHubLoading } = useHub(urlZoneId || '', hubId || '');

  const [formData, setFormData] = useState({
    zone_id: initialZoneId as string | number,
    hub_name: '',
    type: '',
    address: '',
    lat: '',
    lng: '',
    status: 'Active',
  });

  useEffect(() => {
    if (isEdit && hubData?.data) {
      const hub = hubData.data;
      setFormData({
        zone_id: urlZoneId || '',
        hub_name: hub.hub_name,
        type: hub.type,
        address: hub.address,
        lat: hub.lat,
        lng: hub.lng,
        status: hub.status,
      });
    }
  }, [isEdit, hubData, urlZoneId]);

  const createHubMutation = useCreateHub(formData.zone_id);
  const updateHubMutation = useUpdateHub(formData.zone_id, hubId || '');

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const isFormValid = Boolean(
    formData.zone_id &&
    formData.hub_name &&
    formData.type &&
    formData.address &&
    formData.lat &&
    formData.lng
  );

  const handleSubmit = async () => {
    try {
      if (isEdit) {
        await updateHubMutation.mutateAsync(formData);
        navigate(getHubDetailsPath(formData.zone_id, hubId!));
      } else {
        await createHubMutation.mutateAsync(formData);
        navigate(getHubsTabPath('hubs'));
      }
    } catch (error) {
      console.error('Failed to save hub:', error);
    }
  };

  if (isEdit && isHubLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 3 }}>
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
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          {isEdit ? 'Edit Hub' : 'Create Hub'}
        </Typography>
      </Box>

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
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Hub Zone
            </Typography>
            <TextField
              select
              fullWidth
              size="small"
              value={formData.zone_id}
              onChange={handleInputChange('zone_id')}
              disabled={isEdit || !!initialZoneId}
              SelectProps={{ displayEmpty: true }}
            >
              <MenuItem value="" disabled>
                Select hub zone
              </MenuItem>
              {zones.map((zone) => (
                <MenuItem key={zone.zone_id} value={zone.zone_id}>
                  {zone.zone_name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Hub Name
            </Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="Enter hub name"
              value={formData.hub_name}
              onChange={handleInputChange('hub_name')}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Hub Type
            </Typography>
            <TextField
              select
              fullWidth
              size="small"
              value={formData.type}
              onChange={handleInputChange('type')}
              SelectProps={{ displayEmpty: true }}
            >
              <MenuItem value="" disabled>
                Select hub type
              </MenuItem>
              <MenuItem value="Parking Hub">Parking Hub</MenuItem>
              <MenuItem value="Charging Hub">Charging Hub</MenuItem>
              <MenuItem value="Combined Hub">Combined Hub</MenuItem>
            </TextField>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Hub Address
            </Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="Enter hub address"
              value={formData.address}
              onChange={handleInputChange('address')}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Latitude
            </Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="e.g. 28.459° N"
              value={formData.lat}
              onChange={handleInputChange('lat')}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Longitude
            </Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="e.g. 77.026° E"
              value={formData.lng}
              onChange={handleInputChange('lng')}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Status
            </Typography>
            <TextField
              select
              fullWidth
              size="small"
              value={formData.status}
              onChange={handleInputChange('status')}
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
        <Button
          variant="contained"
          startIcon={<CheckIcon />}
          disabled={!isFormValid || createHubMutation.isPending || updateHubMutation.isPending}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            px: 3,
            py: 1,
          }}
          onClick={handleSubmit}
        >
          {isEdit ? 'Save Changes' : 'Create Hub'}
        </Button>
      </Box>
    </Box>
  );
};
