import { Grid, Typography, TextField, Divider, Box } from '@mui/material';
import { Controller, type Control } from 'react-hook-form';
import type { VehicleRequest } from '@entities/vehicle/model/types';

interface Step2VehicleDetailsProps {
  control: Control<VehicleRequest>;
}

export const Step2VehicleDetails = ({ control }: Step2VehicleDetailsProps) => {
  return (
    <Box>
      {/* Vehicle Details Section */}
      <Typography variant="h6" sx={{ mb: 2, color: 'primary.main', fontWeight: 600 }}>
        Vehicle Details
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
            Vehicle Number
          </Typography>
          <Controller
            name="vehicle_number"
            control={control}
            rules={{ required: 'Vehicle number is required' }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                value={field.value || ''}
                fullWidth
                size="small"
                placeholder="Enter value"
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
            Chassis Number
          </Typography>
          <Controller
            name="chassis_number"
            control={control}
            rules={{ required: 'Chassis number is required' }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                value={field.value || ''}
                fullWidth
                size="small"
                placeholder="Enter value"
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
            OEM
          </Typography>
          <Controller
            name="oem"
            control={control}
            rules={{ required: 'OEM is required' }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                value={field.value || ''}
                fullWidth
                size="small"
                placeholder="Enter value"
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
            Generation
          </Typography>
          <Controller
            name="generation"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                value={field.value || ''}
                fullWidth
                size="small"
                placeholder="Enter value"
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
            Model
          </Typography>
          <Controller
            name="model"
            control={control}
            rules={{ required: 'Model is required' }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                value={field.value || ''}
                fullWidth
                size="small"
                placeholder="Enter value"
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
            Variant
          </Typography>
          <Controller
            name="variant"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                value={field.value || ''}
                fullWidth
                size="small"
                placeholder="Enter value"
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
            Category
          </Typography>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                value={field.value || ''}
                fullWidth
                size="small"
                placeholder="Enter value"
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
            Ownership Type
          </Typography>
          <Controller
            name="ownership_type"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                value={field.value || ''}
                fullWidth
                size="small"
                placeholder="Enter value"
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
            Ownership Count
          </Typography>
          <Controller
            name="ownership_count"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                value={field.value || ''}
                type="number"
                fullWidth
                size="small"
              />
            )}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
