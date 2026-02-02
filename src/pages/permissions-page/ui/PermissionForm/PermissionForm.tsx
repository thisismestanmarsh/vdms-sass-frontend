import { TextField, Button, Box, Grid, MenuItem, Paper, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import type { PermissionRequest } from '@entities/permission/model/types';
import { useEffect } from 'react';

interface PermissionFormProps {
  initialData?: PermissionRequest;
  onSubmit: (data: PermissionRequest) => void;
  isLoading?: boolean;
  title?: string;
  onCancel: () => void;
  isModal?: boolean;
}

const ACTION_OPTIONS = ['read', 'write', 'delete', 'update', 'create'];
const SCOPE_OPTIONS = ['company', 'zone', 'hub', 'global'];

export const PermissionForm = ({
  initialData,
  onSubmit,
  isLoading,
  title,
  onCancel,
  isModal = false,
}: PermissionFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PermissionRequest>({
    defaultValues: initialData,
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const FormContent = (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="Permission Name"
            {...register('name', { required: 'Name is required' })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="Module"
            {...register('module', { required: 'Module is required' })}
            error={!!errors.module}
            helperText={errors.module?.message}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            select
            label="Action"
            {...register('action', { required: 'Action is required' })}
            error={!!errors.action}
            helperText={errors.action?.message}
            defaultValue={initialData?.action || ''}
          >
            {ACTION_OPTIONS.map((option) => (
              <MenuItem key={option} value={option}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="Resource"
            {...register('resource', { required: 'Resource is required' })}
            error={!!errors.resource}
            helperText={errors.resource?.message}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            select
            label="Scope"
            {...register('scope', { required: 'Scope is required' })}
            error={!!errors.scope}
            helperText={errors.scope?.message}
            defaultValue={initialData?.scope || ''}
          >
            {SCOPE_OPTIONS.map((option) => (
              <MenuItem key={option} value={option}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Description"
            {...register('description')}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
            <Button
              variant="outlined"
              onClick={onCancel}
              disabled={isLoading}
              sx={{ borderRadius: '8px', textTransform: 'none', px: 4 }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={isLoading}
              sx={{ borderRadius: '8px', textTransform: 'none', px: 4 }}
            >
              {isLoading ? 'Saving...' : 'Save Permission'}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );

  if (isModal) {
    return FormContent;
  }

  return (
    <Paper sx={{ p: 4, borderRadius: '8px', border: '1px solid', borderColor: 'divider' }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        {title}
      </Typography>
      {FormContent}
    </Paper>
  );
};
