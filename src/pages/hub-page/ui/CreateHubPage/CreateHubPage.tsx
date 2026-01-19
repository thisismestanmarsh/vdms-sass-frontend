import { useState, useEffect } from 'react';
import { Box, Typography, Link, Paper, Grid, TextField, MenuItem, Button } from '@mui/material';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { getHubDetailsPath, getHubsTabPath } from '@shared/config/routes';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CheckIcon from '@mui/icons-material/Check';

export const CreateHubPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const isEdit = location.pathname.includes('/edit');

  const [formData, setFormData] = useState({
    country: '',
    city: '',
    zone: '',
    name: '',
    type: '',
    address: '',
  });

  useEffect(() => {
    if (isEdit) {
      // Simulated prefill for edit mode
      setFormData({
        country: 'India',
        city: 'Gurugram',
        zone: 'APAC',
        name: 'Hub Name',
        type: 'Parking Hub',
        address: 'Random line 1, Sector 42, Gurugram',
      });
    }
  }, [isEdit]);

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const isFormValid = Boolean(
    formData.city &&
    formData.zone &&
    formData.name &&
    formData.type &&
    formData.address &&
    (isEdit || formData.country)
  );

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
          {!isEdit && (
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Hub Country
              </Typography>
              <TextField
                select
                fullWidth
                size="small"
                value={formData.country}
                onChange={handleInputChange('country')}
                SelectProps={{ displayEmpty: true }}
              >
                <MenuItem value="" disabled>
                  Select hub country
                </MenuItem>
                <MenuItem value="India">India</MenuItem>
              </TextField>
            </Grid>
          )}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Hub City
            </Typography>
            <TextField
              select
              fullWidth
              size="small"
              value={formData.city}
              onChange={handleInputChange('city')}
              disabled={isEdit}
              SelectProps={{ displayEmpty: true }}
            >
              <MenuItem value="" disabled>
                Select hub city
              </MenuItem>
              <MenuItem value="Gurugram">Gurugram</MenuItem>
            </TextField>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Hub Zone
            </Typography>
            <TextField
              select
              fullWidth
              size="small"
              value={formData.zone}
              onChange={handleInputChange('zone')}
              SelectProps={{ displayEmpty: true }}
            >
              <MenuItem value="" disabled>
                Select hub zone
              </MenuItem>
              <MenuItem value="APAC">APAC</MenuItem>
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
              value={formData.name}
              onChange={handleInputChange('name')}
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
            </TextField>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Enter Hub Address
            </Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="Enter hub address"
              value={formData.address}
              onChange={handleInputChange('address')}
            />
          </Grid>
        </Grid>
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
        <Button
          variant="contained"
          startIcon={<CheckIcon />}
          disabled={!isFormValid}
          sx={{
            bgcolor: isFormValid ? 'primary.main' : 'rgba(255, 255, 255, 0.1)',
            color: isFormValid ? '#ffffff' : 'rgba(255, 255, 255, 0.5)',
            '&:hover': {
              bgcolor: isFormValid ? 'primary.dark' : 'rgba(255, 255, 255, 0.1)',
            },
            '&.Mui-disabled': {
              bgcolor: 'action.disabledBackground',
              color: 'action.disabled',
            },
            borderRadius: 2,
            textTransform: 'none',
            px: 3,
            py: 1,
            transition: 'background-color 0.3s',
          }}
          onClick={() => {
            if (isEdit) {
              navigate(getHubDetailsPath(id!));
            } else {
              navigate(getHubsTabPath('hubs'));
            }
          }}
        >
          {isEdit ? 'Save Changes' : 'Create Hub'}
        </Button>
      </Box>
    </Box>
  );
};
