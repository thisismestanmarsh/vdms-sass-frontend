import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  Divider,
  CircularProgress,
  Alert,
  Breadcrumbs,
  Link,
  Chip,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '@shared/config/routes';
import { useVehicle } from '@entities/vehicle/model/vehicleHooks';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import EvStationIcon from '@mui/icons-material/EvStation';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import ShieldIcon from '@mui/icons-material/Shield';
import TollIcon from '@mui/icons-material/Toll';
import BuildIcon from '@mui/icons-material/Build';

const DetailItem = ({ label, value }: { label: string; value: any }) => (
  <Box sx={{ mb: 2 }}>
    <Typography
      variant="caption"
      color="text.secondary"
      sx={{ fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.5px' }}
    >
      {label}
    </Typography>
    <Typography variant="body1" sx={{ fontWeight: 600, color: 'text.primary', mt: 0.5 }}>
      {value || 'N/A'}
    </Typography>
  </Box>
);

const SectionHeader = ({ icon: Icon, title }: { icon: any; title: string }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
    <Icon sx={{ fontSize: 22, color: 'primary.main' }} />
    <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>
      {title}
    </Typography>
  </Box>
);

export const VehicleDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, error } = useVehicle(id);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !data?.data) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">Failed to load vehicle details. Please try again later.</Alert>
        <Button
          sx={{ mt: 2 }}
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(ROUTES.VEHICLES)}
        >
          Back to Vehicles
        </Button>
      </Box>
    );
  }

  const vehicle = data.data;

  const formatDate = (dateStr?: string) => {
    if (!dateStr || dateStr.startsWith('0001')) return 'N/A';
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Breadcrumbs sx={{ mb: 1 }}>
            <Link
              underline="hover"
              color="inherit"
              onClick={() => navigate(ROUTES.VEHICLES)}
              sx={{ cursor: 'pointer' }}
            >
              Vehicles
            </Link>
            <Typography color="text.primary">Vehicle Details</Typography>
          </Breadcrumbs>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="h4" sx={{ fontWeight: 800, color: 'text.primary' }}>
              {vehicle.vehicle_number || 'Unnamed Vehicle'}
            </Typography>
            <Chip
              label={vehicle.engine_type}
              color={vehicle.engine_type === 'EV' ? 'success' : 'primary'}
              variant="outlined"
              icon={vehicle.engine_type === 'EV' ? <EvStationIcon /> : <LocalGasStationIcon />}
              sx={{ fontWeight: 700, borderRadius: '8px' }}
            />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(ROUTES.VEHICLES)}
            sx={{
              borderRadius: '8px',
              textTransform: 'none',
              px: 3,
              borderColor: 'divider',
              color: 'text.primary',
            }}
          >
            Back
          </Button>
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={() => navigate(ROUTES.VEHICLE_EDIT.replace(':id', vehicle.id || ''))}
            sx={{ borderRadius: '8px', textTransform: 'none', px: 3, boxShadow: 'none' }}
          >
            Edit Vehicle
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Basic Information */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper
            sx={{
              p: 3,
              borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
              height: '100%',
            }}
          >
            <SectionHeader icon={DirectionsCarIcon} title="Basic Information" />
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <DetailItem label="OEM" value={vehicle.oem} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <DetailItem label="Model" value={vehicle.model} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <DetailItem label="Variant" value={vehicle.variant} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <DetailItem label="Chassis Number" value={vehicle.chassis_number} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <DetailItem label="Generation" value={vehicle.generation} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <DetailItem label="Category" value={vehicle.category} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <DetailItem
                  label="Registration Date"
                  value={formatDate(vehicle.registration_date)}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <DetailItem label="Invoice Date" value={formatDate(vehicle.invoice_date)} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <DetailItem label="Hub ID" value={vehicle.hub_id} />
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            <SectionHeader icon={ShieldIcon} title="Insurance & Compliance" />
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <DetailItem label="Insurer Name" value={vehicle.insurance?.insurer_name} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <DetailItem label="Policy Number" value={vehicle.insurance?.policy_number} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <DetailItem
                  label="Policy End Date"
                  value={formatDate(vehicle.insurance?.policy_end_date)}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <DetailItem label="Fitness Status" value={vehicle.fitness?.status} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <DetailItem
                  label="Fitness Expiry"
                  value={formatDate(vehicle.fitness?.expiry_date)}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <DetailItem label="PUC Expiry" value={formatDate(vehicle.puc_expiry_date)} />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Side Panels */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Paper sx={{ p: 3, borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
              <SectionHeader icon={TollIcon} title="Toll & Fastag" />
              <DetailItem label="Fastag Number" value={vehicle.fastag_number} />
              <DetailItem label="Financier" value={vehicle.financier_name} />
              <DetailItem label="Toll Validity" value={formatDate(vehicle.toll?.validity_date)} />
              <DetailItem
                label="Telematics"
                value={vehicle.telematics?.enabled ? 'Enabled' : 'Disabled'}
              />
            </Paper>

            <Paper sx={{ p: 3, borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
              <SectionHeader icon={BuildIcon} title="Service Config" />
              <Grid container spacing={2}>
                <Grid size={{ xs: 6 }}>
                  <DetailItem label="Tyre Size" value={vehicle.service_config?.tyre_size} />
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <DetailItem label="Stepney Count" value={vehicle.service_config?.stepney_count} />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <DetailItem
                    label="Service Interval"
                    value={`${vehicle.service_config?.preventive_service_km || 0} KM`}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
