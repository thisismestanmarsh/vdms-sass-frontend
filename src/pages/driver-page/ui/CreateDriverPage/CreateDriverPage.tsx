import { useState } from 'react';
import { Box, Typography, Link, Paper, Grid, TextField, MenuItem, Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@shared/config/routes';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useCreateDriver, useUpdateDriver } from '@entities/driver/model/driverHooks';
import type { Driver } from '@entities/driver/model/types';

interface CreateDriverPageProps {
  initialData?: Driver;
  isEdit?: boolean;
}

export const CreateDriverPage = ({ initialData, isEdit }: CreateDriverPageProps) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const { mutate: createDriver, isPending: isCreating } = useCreateDriver();
  const { mutate: updateDriver, isPending: isUpdating } = useUpdateDriver(initialData?.id || '');

  const isPending = isCreating || isUpdating;

  const [formData, setFormData] = useState({
    // Basic Details
    driver_id: initialData?.driver_id || `DRV-${Math.floor(100000 + Math.random() * 900000)}`,
    first_name: initialData?.first_name || '',
    last_name: initialData?.last_name || '',
    driver_full_name: initialData?.driver_full_name || '',
    email: initialData?.email || '',
    phone_number: initialData?.phone_number || '',
    alternate_phone: initialData?.alternate_phone || '',
    address: initialData?.address || '',
    city: initialData?.city || '',
    joining_date: initialData?.joining_date ? initialData.joining_date.split('T')[0] : new Date().toISOString().split('T')[0],

    // Hub
    hub_id: initialData?.hub_id || '',
    hub_name: initialData?.hub_name || '',

    // Type & Status
    driver_type: initialData?.driver_type || 'FULL_TIME',
    driver_status: initialData?.driver_status || 'ACTIVE',
    status: initialData?.status || 'ACTIVE',

    // DL & Aadhaar
    dl_number: initialData?.dl_number || '',
    dl_expiry_date: initialData?.dl_expiry_date ? initialData.dl_expiry_date.split('T')[0] : '',
    dl_issue_date: initialData?.dl_issue_date ? initialData.dl_issue_date.split('T')[0] : '',
    dl_status: initialData?.dl_status || 'VALID',
    license_no: initialData?.license_no || '',
    license_type: initialData?.license_type || 'LMV',
    aadhaar_number: initialData?.aadhaar_number || '',
    aadhaar_status: initialData?.aadhaar_status || 'VERIFIED',
  });

  const handleInputChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e.target.value;
      setFormData((prev) => {
        const newData = { ...prev, [field]: value };
        if (field === 'first_name' || field === 'last_name') {
          newData.driver_full_name = `${newData.first_name} ${newData.last_name}`.trim();
        }
        return newData;
      });
    };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 2));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = () => {
    // Ensure dates are in ISO format if needed, though the API curl showed T00:00:00Z
    const payload = {
      ...formData,
      dl_expiry_date: formData.dl_expiry_date ? `${formData.dl_expiry_date}T00:00:00Z` : '',
      dl_issue_date: formData.dl_issue_date ? `${formData.dl_issue_date}T00:00:00Z` : '',
      joining_date: formData.joining_date ? `${formData.joining_date}T00:00:00Z` : '',
    };

    const action = isEdit ? updateDriver : createDriver;

    // For update, we might need a different payload if the backend expects it.
    // The user provided a PUT payload which is similar to the POST one.
    // I'll use the same payload for both for now.

    action(payload as any, {
      onSuccess: () => {
        navigate(ROUTES.DRIVERS);
      },
    });
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                First Name
              </Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="Enter first name"
                value={formData.first_name}
                onChange={handleInputChange('first_name')}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Last Name
              </Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="Enter last name"
                value={formData.last_name}
                onChange={handleInputChange('last_name')}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Email
              </Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleInputChange('email')}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Phone Number
              </Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="Enter phone no."
                value={formData.phone_number}
                onChange={handleInputChange('phone_number')}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Alternate Phone Number
              </Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="Enter alternate phone no."
                value={formData.alternate_phone}
                onChange={handleInputChange('alternate_phone')}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Joining Date
              </Typography>
              <TextField
                fullWidth
                size="small"
                type="date"
                value={formData.joining_date}
                onChange={handleInputChange('joining_date')}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 8 }}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Address
              </Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="Enter address"
                value={formData.address}
                onChange={handleInputChange('address')}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Select City
              </Typography>
              <TextField
                select
                fullWidth
                size="small"
                value={formData.city}
                onChange={handleInputChange('city')}
                SelectProps={{ displayEmpty: true }}
              >
                <MenuItem value="" disabled>
                  Select City
                </MenuItem>
                <MenuItem value="Bangalore">Bangalore</MenuItem>
                <MenuItem value="Delhi">Delhi</MenuItem>
                <MenuItem value="Gurugram">Gurugram</MenuItem>
                <MenuItem value="Mumbai">Mumbai</MenuItem>
                <MenuItem value="Pune">Pune</MenuItem>
                <MenuItem value="Hyderabad">Hyderabad</MenuItem>
                <MenuItem value="Chennai">Chennai</MenuItem>
                <MenuItem value="Kolkata">Kolkata</MenuItem>
              </TextField>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Hub
              </Typography>
              <TextField
                select
                fullWidth
                size="small"
                value={formData.hub_id}
                onChange={(e) => {
                  const hubId = e.target.value;
                  const hubs: Record<string, string> = {
                    'HUB-DEL-01': 'Delhi Hub 1',
                    'HUB-DEL-02': 'Delhi Hub 2',
                    'HUB-BLR-01': 'Bangalore Hub 1',
                    'HUB-BLR-02': 'Bangalore Hub 2',
                    'HUB-MUM-01': 'Mumbai Hub 1',
                    'HUB-PUN-01': 'Pune Hub 1'
                  };
                  setFormData(prev => ({ ...prev, hub_id: hubId, hub_name: hubs[hubId] || '' }));
                }}
                SelectProps={{ displayEmpty: true }}
              >
                <MenuItem value="" disabled>
                  Select Hub
                </MenuItem>
                <MenuItem value="HUB-DEL-01">Delhi Hub 1</MenuItem>
                <MenuItem value="HUB-DEL-02">Delhi Hub 2</MenuItem>
                <MenuItem value="HUB-BLR-01">Bangalore Hub 1</MenuItem>
                <MenuItem value="HUB-BLR-02">Bangalore Hub 2</MenuItem>
                <MenuItem value="HUB-MUM-01">Mumbai Hub 1</MenuItem>
                <MenuItem value="HUB-PUN-01">Pune Hub 1</MenuItem>
              </TextField>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Driver Type
              </Typography>
              <TextField
                select
                fullWidth
                size="small"
                value={formData.driver_type}
                onChange={handleInputChange('driver_type')}
              >
                <MenuItem value="FULL_TIME">Full Time</MenuItem>
                <MenuItem value="PART_TIME">Part Time</MenuItem>
                <MenuItem value="CONTRACTOR">Contractor</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Box>
            <Typography variant="subtitle1" sx={{ mb: 3, fontWeight: 600 }}>
              Driving Licence Details
            </Typography>
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid size={{ xs: 12, md: 4 }}>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                  DL Number
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Enter DL number"
                  value={formData.dl_number}
                  onChange={handleInputChange('dl_number')}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                  DL Issue Date
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  type="date"
                  value={formData.dl_issue_date}
                  onChange={handleInputChange('dl_issue_date')}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                  DL Expiry Date
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  type="date"
                  value={formData.dl_expiry_date}
                  onChange={handleInputChange('dl_expiry_date')}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                  License Type
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="e.g. LMV, HMV"
                  value={formData.license_type}
                  onChange={handleInputChange('license_type')}
                />
              </Grid>
            </Grid>

            <Typography variant="subtitle1" sx={{ mb: 3, fontWeight: 600 }}>
              Aadhar Details
            </Typography>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 4 }}>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                  Aadhar Number
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Enter Aadhar no."
                  value={formData.aadhaar_number}
                  onChange={handleInputChange('aadhaar_number')}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                  Aadhar Status
                </Typography>
                <TextField
                  select
                  fullWidth
                  size="small"
                  value={formData.aadhaar_status}
                  onChange={handleInputChange('aadhaar_status')}
                >
                  <MenuItem value="VERIFIED">Verified</MenuItem>
                  <MenuItem value="PENDING">Pending</MenuItem>
                  <MenuItem value="REJECTED">Rejected</MenuItem>
                </TextField>
              </Grid>
            </Grid>
          </Box>
        );
      default:
        return null;
    }
  };

  const getStepTitle = () => {
    switch (step) {
      case 1:
        return 'Basic Details & Hub';
      case 2:
        return 'DL & Aadhaar';
      default:
        return '';
    }
  };

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box>
        <Link
          component="button"
          onClick={() => navigate(ROUTES.DRIVERS)}
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
          {isEdit ? 'Edit Driver' : 'Create Driver'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Step {step}/2 - {getStepTitle()}
        </Typography>
      </Box>

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
        {renderStep()}
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIosIcon sx={{ fontSize: '0.75rem !important' }} />}
          disabled={step === 1 || isPending}
          onClick={prevStep}
          sx={{
            borderRadius: '8px',
            textTransform: 'none',
            px: 3,
            border: '1px solid',
            borderColor: 'primary.main',
            color: 'primary.main',
            '&.Mui-disabled': {
              borderColor: 'divider',
              color: 'text.disabled',
            },
          }}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          disabled={isPending}
          endIcon={
            step < 2 ? <ArrowForwardIosIcon sx={{ fontSize: '0.75rem !important' }} /> : null
          }
          onClick={step === 2 ? handleSubmit : nextStep}
          sx={{
            borderRadius: '8px',
            textTransform: 'none',
            px: 4,
            bgcolor: 'primary.main',
            color: 'white',
            '&:hover': {
              bgcolor: 'primary.dark',
            },
          }}
        >
          {isPending ? <CircularProgress size={24} color="inherit" /> : step === 2 ? 'Submit' : 'Next'}
        </Button>
      </Box>
    </Box>
  );
};
