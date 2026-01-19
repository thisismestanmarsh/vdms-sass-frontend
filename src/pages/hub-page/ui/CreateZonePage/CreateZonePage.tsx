import { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Link,
    Paper,
    Grid,
    TextField,
    MenuItem,
    Button,
    Autocomplete,
    Chip,
} from '@mui/material';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { getZoneDetailsPath, getHubsTabPath } from '@shared/config/routes';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CheckIcon from '@mui/icons-material/Check';

const CITY_OPTIONS = ['Delhi', 'Gurugram', 'Noida', 'Mumbai', 'Pune', 'Bangalore', 'Chennai', 'Hyderabad'];

export const CreateZonePage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const location = useLocation();
    const isEdit = location.pathname.includes('/edit');

    const [formData, setFormData] = useState({
        zone_id: '',
        zone_name: '',
        country: '',
        type: '',
        city_names: [] as string[],
    });

    useEffect(() => {
        if (isEdit) {
            // Simulated prefill for edit mode
            setFormData({
                zone_id: id || 'ZN001',
                zone_name: 'North Zone',
                country: 'India',
                type: 'Urban',
                city_names: ['Delhi', 'Gurugram'],
            });
        }
    }, [isEdit, id]);

    const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const handleCityChange = (_: any, newValue: string[]) => {
        setFormData((prev) => ({ ...prev, city_names: newValue }));
    };

    const isFormValid = Boolean(
        formData.zone_name &&
        formData.country &&
        formData.type &&
        formData.city_names.length > 0
    );

    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box>
                <Link
                    component="button"
                    onClick={() => navigate(getHubsTabPath('zones'))}
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
                    {isEdit ? 'Edit Zone' : 'Create Zone'}
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
                            Zone Name
                        </Typography>
                        <TextField
                            fullWidth
                            size="small"
                            placeholder="Enter zone name"
                            value={formData.zone_name}
                            onChange={handleInputChange('zone_name')}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                            Country
                        </Typography>
                        <TextField
                            select
                            fullWidth
                            size="small"
                            value={formData.country}
                            onChange={handleInputChange('country')}
                            disabled={isEdit}
                            SelectProps={{ displayEmpty: true }}
                        >
                            <MenuItem value="" disabled>
                                Select country
                            </MenuItem>
                            <MenuItem value="India">India</MenuItem>
                        </TextField>
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                            Zone Type
                        </Typography>
                        <TextField
                            fullWidth
                            size="small"
                            placeholder="Enter zone type"
                            value={formData.type}
                            onChange={handleInputChange('type')}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 12 }}>
                        <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                            City Names
                        </Typography>
                        <Autocomplete
                            multiple
                            options={CITY_OPTIONS}
                            value={formData.city_names}
                            onChange={handleCityChange}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    size="small"
                                    placeholder={formData.city_names.length === 0 ? "Select cities" : ""}
                                />
                            )}
                            renderTags={(value, getTagProps) =>
                                value.map((option, index) => (
                                    <Chip
                                        {...getTagProps({ index })}
                                        key={option}
                                        label={option}
                                        size="small"
                                        sx={{
                                            bgcolor: 'rgba(255, 255, 255, 0.1)',
                                            color: 'text.primary',
                                        }}
                                    />
                                ))
                            }
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
                            navigate(getZoneDetailsPath(id!));
                        } else {
                            navigate(getHubsTabPath('zones'));
                        }
                    }}
                >
                    {isEdit ? 'Save Changes' : 'Create Zone'}
                </Button>
            </Box>
        </Box >
    );
};
