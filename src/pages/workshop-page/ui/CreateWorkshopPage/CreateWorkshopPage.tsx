import { useState } from 'react';
import {
  Box,
  Typography,
  Link,
  Paper,
  Grid,
  TextField,
  MenuItem,
  Button,
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@shared/config/routes';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useCreateWorkshop, useUpdateWorkshop } from '@entities/workshop/api/workshopApi';
import type { Workshop } from '@entities/workshop/model/types';

interface CreateWorkshopPageProps {
  initialData?: Workshop;
  isEdit?: boolean;
}

export const CreateWorkshopPage = ({ initialData, isEdit }: CreateWorkshopPageProps) => {
  const navigate = useNavigate();
  const { mutate: createWorkshop, isPending: isCreating } = useCreateWorkshop();
  const { mutate: updateWorkshop, isPending: isUpdating } = useUpdateWorkshop();

  const isPending = isCreating || isUpdating;

  const [formData, setFormData] = useState({
    workshop_name: initialData?.workshop_name || '',
    address: initialData?.address || '',
    maps_link: initialData?.maps_link || '',
    primary_phone: initialData?.primary_phone || '',
    status: initialData?.status || 'Active',
    type: initialData?.type || 'Service',
    zone_id: initialData?.zone_id || 'ZONE-001', // Default or placeholder
  });

  const handleInputChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEdit && initialData) {
      updateWorkshop(
        { workshopId: initialData.workshop_id, data: formData },
        {
          onSuccess: () => navigate(ROUTES.WORKSHOPS),
        }
      );
    } else {
      createWorkshop(formData, {
        onSuccess: () => navigate(ROUTES.WORKSHOPS),
      });
    }
  };

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 3 }}>
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
          <ArrowBackIosIcon sx={{ fontSize: '0.75rem' }} /> Go back
        </Link>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          {isEdit ? 'Edit Workshop' : 'Create Workshop'}
        </Typography>
      </Box>

      <Paper
        component="form"
        onSubmit={handleSubmit}
        sx={{
          p: 4,
          bgcolor: 'background.paper',
          borderRadius: '8px',
          boxShadow: 'none',
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Workshop Name
            </Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="Enter Workshop Name"
              value={formData.workshop_name}
              onChange={handleInputChange('workshop_name')}
              required
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Primary Phone
            </Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="Enter Phone Number"
              value={formData.primary_phone}
              onChange={handleInputChange('primary_phone')}
              required
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Workshop Type
            </Typography>
            <TextField
              select
              fullWidth
              size="small"
              value={formData.type}
              onChange={handleInputChange('type')}
            >
              <MenuItem value="Service">Service</MenuItem>
              <MenuItem value="Dealer">Dealer</MenuItem>
              <MenuItem value="Independent">Independent</MenuItem>
              <MenuItem value="Mobile">Mobile Service</MenuItem>
              <MenuItem value="Body Shop">Body Shop</MenuItem>
            </TextField>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
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
              <MenuItem value="Under Maintenance">Under Maintenance</MenuItem>
              <MenuItem value="Closed">Closed</MenuItem>
              <MenuItem value="Pending Approval">Pending Approval</MenuItem>
            </TextField>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Maps Link
            </Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="Enter Google Maps Link"
              value={formData.maps_link}
              onChange={handleInputChange('maps_link')}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Address
            </Typography>
            <TextField
              fullWidth
              size="small"
              multiline
              rows={3}
              placeholder="Enter Full Address"
              value={formData.address}
              onChange={handleInputChange('address')}
              required
            />
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
          <Button
            variant="outlined"
            onClick={() => navigate(ROUTES.WORKSHOPS)}
            disabled={isPending}
            sx={{ borderRadius: '8px', textTransform: 'none', px: 3 }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isPending}
            sx={{
              borderRadius: '8px',
              textTransform: 'none',
              px: 4,
              bgcolor: 'primary.main',
              '&:hover': { bgcolor: 'primary.dark' },
            }}
          >
            {isPending ? (
              <CircularProgress size={24} color="inherit" />
            ) : isEdit ? (
              'Update Workshop'
            ) : (
              'Create Workshop'
            )}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};
