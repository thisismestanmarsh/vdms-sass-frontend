import {
  Grid,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Divider,
  Box,
  InputAdornment,
  MenuItem,
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { Controller, type Control } from 'react-hook-form';
import type { VehicleRequest } from '@entities/vehicle/model/types';

interface Step4AdditionalDetailsProps {
  control: Control<VehicleRequest>;
}

export const Step4AdditionalDetails = ({ control }: Step4AdditionalDetailsProps) => {
  return (
    <Box>
      {/* Financial Information */}
      <Typography variant="h6" sx={{ mb: 2, color: 'primary.main', fontWeight: 600 }}>
        Financial Information
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
            Financier Name
          </Typography>
          <Controller
            name="financier_name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                value={field.value || ''}
                fullWidth
                size="small"
                placeholder="Enter financier name"
              />
            )}
          />
        </Grid>
      </Grid>

      {/* Fastag Information */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, color: 'primary.main', fontWeight: 600 }}>
          Fastag Information
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Fastag Number
            </Typography>
            <Controller
              name="fastag_number"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  value={field.value || ''}
                  fullWidth
                  size="small"
                  placeholder="Enter fastag number"
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Fastag Account
            </Typography>
            <Controller
              name="fastag_account"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  value={field.value || ''}
                  fullWidth
                  size="small"
                  placeholder="Enter fastag account"
                />
              )}
            />
          </Grid>
        </Grid>
      </Box>

      {/* Fitness Information */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, color: 'primary.main', fontWeight: 600 }}>
          Fitness Information
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Fitness Status
            </Typography>
            <Controller
              name="fitness.status"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  value={field.value || ''}
                  fullWidth
                  size="small"
                  placeholder="Enter fitness status"
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Fitness Expiry Date
            </Typography>
            <Controller
              name="fitness.expiry_date"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  value={field.value || ''}
                  type="date"
                  fullWidth
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <CalendarTodayIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </Grid>
        </Grid>
      </Box>

      {/* Insurance Information */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, color: 'primary.main', fontWeight: 600 }}>
          Insurance Information
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Insurer Name
            </Typography>
            <Controller
              name="insurance.insurer_name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  value={field.value || ''}
                  fullWidth
                  size="small"
                  placeholder="Enter insurer name"
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Insurer Broker
            </Typography>
            <Controller
              name="insurance.insurer_broker"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  value={field.value || ''}
                  fullWidth
                  size="small"
                  placeholder="Enter broker name"
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Insurance Type
            </Typography>
            <Controller
              name="insurance.insurance_type"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  value={field.value || ''}
                  fullWidth
                  size="small"
                  placeholder="Enter insurance type"
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Policy Number
            </Typography>
            <Controller
              name="insurance.policy_number"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  value={field.value || ''}
                  fullWidth
                  size="small"
                  placeholder="Enter policy number"
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Policy Start Date
            </Typography>
            <Controller
              name="insurance.policy_start_date"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  value={field.value || ''}
                  type="date"
                  fullWidth
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <CalendarTodayIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Policy End Date
            </Typography>
            <Controller
              name="insurance.policy_end_date"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  value={field.value || ''}
                  type="date"
                  fullWidth
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <CalendarTodayIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Premium Amount
            </Typography>
            <Controller
              name="insurance.premium_amount"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  value={field.value || ''}
                  type="number"
                  fullWidth
                  size="small"
                  placeholder="Enter amount"
                />
              )}
            />
          </Grid>
        </Grid>
      </Box>

      {/* Service Configuration */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, color: 'primary.main', fontWeight: 600 }}>
          Service Configuration
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Preventive Service KM
            </Typography>
            <Controller
              name="service_config.preventive_service_km"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  value={field.value || ''}
                  type="number"
                  fullWidth
                  size="small"
                  placeholder="Enter KM"
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Preventive Service Interval (Days)
            </Typography>
            <Controller
              name="service_config.preventive_service_interval_days"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  value={field.value || ''}
                  type="number"
                  fullWidth
                  size="small"
                  placeholder="Enter days"
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Preventive Service Trigger Type
            </Typography>
            <Controller
              name="service_config.preventive_service_trigger_type"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  value={field.value || ''}
                  fullWidth
                  size="small"
                  placeholder="Select type"
                >
                  <MenuItem value="Before">Before</MenuItem>
                  <MenuItem value="After">After</MenuItem>
                </TextField>
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Alert Interval (Days)
            </Typography>
            <Controller
              name="service_config.alert_interval_days"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  value={field.value || ''}
                  type="number"
                  fullWidth
                  size="small"
                  placeholder="Enter days"
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Tyre Size
            </Typography>
            <Controller
              name="service_config.tyre_size"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  value={field.value || ''}
                  fullWidth
                  size="small"
                  placeholder="Enter tyre size"
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Tyre Replacement KM
            </Typography>
            <Controller
              name="service_config.tyre_replacement_km"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  value={field.value || ''}
                  type="number"
                  fullWidth
                  size="small"
                  placeholder="Enter KM"
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Stepney Size
            </Typography>
            <Controller
              name="service_config.stepney_size"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  value={field.value || ''}
                  fullWidth
                  size="small"
                  placeholder="Enter stepney size"
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Stepney Count
            </Typography>
            <Controller
              name="service_config.stepney_count"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  value={field.value || ''}
                  type="number"
                  fullWidth
                  size="small"
                  placeholder="Enter count"
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Wheel Alignment KM Alert Range
            </Typography>
            <Controller
              name="service_config.wheel_alignment_km_alert_range"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  value={field.value || ''}
                  type="number"
                  fullWidth
                  size="small"
                  placeholder="Enter KM range"
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Automatic Climate Control
            </Typography>
            <Controller
              name="service_config.automatic_climate_control"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox {...field} checked={field.value || false} />}
                  label="Enabled"
                />
              )}
            />
          </Grid>
        </Grid>
      </Box>

      {/* Telematics */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, color: 'primary.main', fontWeight: 600 }}>
          Telematics
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Telematics Enabled
            </Typography>
            <Controller
              name="telematics.enabled"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox {...field} checked={field.value || false} />}
                  label="Enabled"
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Telematics Type
            </Typography>
            <Controller
              name="telematics.type"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  value={field.value || ''}
                  fullWidth
                  size="small"
                  placeholder="Enter telematics type"
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Telematics Name
            </Typography>
            <Controller
              name="telematics.name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  value={field.value || ''}
                  fullWidth
                  size="small"
                  placeholder="Enter telematics name"
                />
              )}
            />
          </Grid>
        </Grid>
      </Box>

      {/* Toll Information */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, color: 'primary.main', fontWeight: 600 }}>
          Toll Information
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Toll Type
            </Typography>
            <Controller
              name="toll.type"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  value={field.value || ''}
                  fullWidth
                  size="small"
                  placeholder="Enter toll type"
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Toll Scope
            </Typography>
            <Controller
              name="toll.scope"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  value={field.value || ''}
                  fullWidth
                  size="small"
                  placeholder="Enter toll scope"
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Toll Amount
            </Typography>
            <Controller
              name="toll.amount"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  value={field.value || ''}
                  type="number"
                  fullWidth
                  size="small"
                  placeholder="Enter amount"
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Toll Validity Date
            </Typography>
            <Controller
              name="toll.validity_date"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  value={field.value || ''}
                  type="date"
                  fullWidth
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <CalendarTodayIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </Grid>
        </Grid>
      </Box>

      {/* Warranties (Required by validation) */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, color: 'primary.main', fontWeight: 600 }}>
          Warranty Information
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Component
            </Typography>
            <Controller
              name="warranties.0.component"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  value={field.value || ''}
                  fullWidth
                  size="small"
                  placeholder="e.g. Vehicle"
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Max Distance (KM)
            </Typography>
            <Controller
              name="warranties.0.max_distance_km"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  value={field.value || ''}
                  type="number"
                  fullWidth
                  size="small"
                  placeholder="Enter KM"
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Warranty End Date
            </Typography>
            <Controller
              name="warranties.0.warranty_end_date"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  value={field.value || ''}
                  type="date"
                  fullWidth
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <CalendarTodayIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
