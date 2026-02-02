import { useState } from 'react';
import { Box, Typography, Link, Paper, Grid, TextField, MenuItem, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@shared/config/routes';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export const CreateDriverPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    // Step 1: Basic Details & Hub
    name: '',
    phoneNo: '',
    alternatePhoneNo: '',
    address: '',
    city: '',
    hubs: [] as string[],
    driverType: '',
    drivingSide: '',
    driverPhoto: null as File | null,
    // Step 2: Driving License & Aadhaar
    dlName: '',
    dlNumber: '',
    dlExpiryDate: '',
    dlPhoto: null as File | null,
    aadhaarNo: '',
    aadhaarFrontPhoto: null as File | null,
    aadhaarBackPhoto: null as File | null,
  });

  const handleInputChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const renderFileUpload = (label: string) => (
    <Box
      sx={{
        border: '1px dashed',
        borderColor: 'divider',
        borderRadius: 2,
        p: 2,
        textAlign: 'center',
        cursor: 'pointer',
        bgcolor: 'rgba(255, 255, 255, 0.02)',
        '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.05)' },
      }}
    >
      <CloudUploadIcon sx={{ color: 'primary.main', mb: 1 }} />
      <Typography variant="body2" sx={{ color: 'primary.main', fontWeight: 500 }}>
        Upload {label}
      </Typography>
    </Box>
  );

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Driver Name
              </Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="Enter driver name"
                value={formData.name}
                onChange={handleInputChange('name')}
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
                value={formData.phoneNo}
                onChange={handleInputChange('phoneNo')}
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
                value={formData.alternatePhoneNo}
                onChange={handleInputChange('alternatePhoneNo')}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
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
              </TextField>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Hub Assigned
              </Typography>
              <TextField
                select
                fullWidth
                size="small"
                value={formData.hubs}
                onChange={handleInputChange('hubs')}
                SelectProps={{ displayEmpty: true, multiple: true }}
              >
                <MenuItem value="" disabled>
                  Select Hubs assigned
                </MenuItem>
                <MenuItem value="HSR Layout">HSR Layout</MenuItem>
                <MenuItem value="Indiranagar">Indiranagar</MenuItem>
              </TextField>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Driver Photo
              </Typography>
              {renderFileUpload('driver file')}
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Driver Type
              </Typography>
              <TextField
                select
                fullWidth
                size="small"
                value={formData.driverType}
                onChange={handleInputChange('driverType')}
                SelectProps={{ displayEmpty: true }}
              >
                <MenuItem value="" disabled>
                  Select driver type
                </MenuItem>
                <MenuItem value="Internal">Internal</MenuItem>
                <MenuItem value="External">External</MenuItem>
              </TextField>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Driving Side
              </Typography>
              <TextField
                select
                fullWidth
                size="small"
                value={formData.drivingSide}
                onChange={handleInputChange('drivingSide')}
                SelectProps={{ displayEmpty: true }}
              >
                <MenuItem value="" disabled>
                  Select Driving Side
                </MenuItem>
                <MenuItem value="Left">Left</MenuItem>
                <MenuItem value="Right">Right</MenuItem>
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
                  DL Name
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Enter name on DL"
                  value={formData.dlName}
                  onChange={handleInputChange('dlName')}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                  DL Number
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Enter DL number"
                  value={formData.dlNumber}
                  onChange={handleInputChange('dlNumber')}
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
                  value={formData.dlExpiryDate}
                  onChange={handleInputChange('dlExpiryDate')}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                  DL Photo
                </Typography>
                {renderFileUpload('DL front pic')}
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                  DL Back Photo
                </Typography>
                {renderFileUpload('DL back pic')}
              </Grid>
            </Grid>

            <Typography variant="subtitle1" sx={{ mb: 3, fontWeight: 600 }}>
              Aadhar Details
            </Typography>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 4 }}>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                  Aadhar NO
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Enter Aadhar no."
                  value={formData.aadhaarNo}
                  onChange={handleInputChange('aadhaarNo')}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                  Aadhar Front
                </Typography>
                {renderFileUpload('Aadhar front pic')}
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                  Aadhar Back
                </Typography>
                {renderFileUpload('Aadhar back pic')}
              </Grid>
            </Grid>
          </Box>
        );
      case 3:
        return (
          <Box sx={{ textAlign: 'center', py: 5 }}>
            <Typography variant="h6">Review & Submit</Typography>
            <Typography variant="body2" color="text.secondary">
              Step 3/3 - Finalize Driver Profile
            </Typography>
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
        return 'Driving Licence & Aadhaar';
      case 3:
        return 'Review & Submit';
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
          Create Driver
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Step {step}/3 - {getStepTitle()}
        </Typography>
      </Box>

      <Paper
        sx={{
          p: 4,
          bgcolor: 'background.paper',
          borderRadius: 2,
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
          disabled={step === 1}
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
          variant="outlined"
          endIcon={
            step < 3 ? <ArrowForwardIosIcon sx={{ fontSize: '0.75rem !important' }} /> : null
          }
          onClick={
            step === 3
              ? () => {
                  navigate(ROUTES.DRIVERS);
                }
              : nextStep
          }
          sx={{
            borderRadius: '8px',
            textTransform: 'none',
            px: 4,
            border: '1px solid',
            borderColor: 'primary.main',
            color: 'primary.main',
          }}
        >
          {step === 3 ? 'Submit' : 'Next'}
        </Button>
      </Box>
    </Box>
  );
};
