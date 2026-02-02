import { Grid, Typography, TextField, Divider, Box, InputAdornment } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { Controller, type Control } from 'react-hook-form';
import type { VehicleRequest } from '@entities/vehicle/model/types';

interface Step3LocationProps {
    control: Control<VehicleRequest>;
}

export const Step3Location = ({ control }: Step3LocationProps) => {
    return (
        <Box>
            {/* Location Information Section */}
            <Typography variant="h6" sx={{ mb: 2, color: 'primary.main', fontWeight: 600 }}>
                Location Information
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                        Country Code
                    </Typography>
                    <Controller
                        name="country_code"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                value={field.value || ''}
                                fullWidth
                                size="small"
                                placeholder="Enter country code"
                            />
                        )}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                        State Code
                    </Typography>
                    <Controller
                        name="state_code"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                value={field.value || ''}
                                fullWidth
                                size="small"
                                placeholder="Enter state code"
                            />
                        )}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                        City Code
                    </Typography>
                    <Controller
                        name="city_code"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                value={field.value || ''}
                                fullWidth
                                size="small"
                                placeholder="Enter city code"
                            />
                        )}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                        Hub ID
                    </Typography>
                    <Controller
                        name="hub_id"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                value={field.value || ''}
                                fullWidth
                                size="small"
                                placeholder="Enter hub ID"
                            />
                        )}
                    />
                </Grid>
            </Grid>

            {/* Dates Section */}
            <Box sx={{ mt: 4 }}>
                <Typography variant="h6" sx={{ mb: 2, color: 'primary.main', fontWeight: 600 }}>
                    Important Dates
                </Typography>
                <Divider sx={{ mb: 3 }} />

                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                            Registration Date
                        </Typography>
                        <Controller
                            name="registration_date"
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
                                    inputProps={{
                                        onClick: (e) => (e.target as HTMLInputElement).showPicker?.(),
                                        style: { cursor: 'pointer' },
                                    }}
                                    sx={{
                                        '& input::-webkit-calendar-picker-indicator': {
                                            display: 'none',
                                            WebkitAppearance: 'none',
                                        },
                                    }}
                                />
                            )}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                            Invoice Date
                        </Typography>
                        <Controller
                            name="invoice_date"
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
                                    inputProps={{
                                        onClick: (e) => (e.target as HTMLInputElement).showPicker?.(),
                                        style: { cursor: 'pointer' },
                                    }}
                                    sx={{
                                        '& input::-webkit-calendar-picker-indicator': {
                                            display: 'none',
                                            WebkitAppearance: 'none',
                                        },
                                    }}
                                />
                            )}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                            Lease Start Date
                        </Typography>
                        <Controller
                            name="lease_start_date"
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
                                    inputProps={{
                                        onClick: (e) => (e.target as HTMLInputElement).showPicker?.(),
                                        style: { cursor: 'pointer' },
                                    }}
                                    sx={{
                                        '& input::-webkit-calendar-picker-indicator': {
                                            display: 'none',
                                            WebkitAppearance: 'none',
                                        },
                                    }}
                                />
                            )}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                            Lease End Date
                        </Typography>
                        <Controller
                            name="lease_end_date"
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
                                    inputProps={{
                                        onClick: (e) => (e.target as HTMLInputElement).showPicker?.(),
                                        style: { cursor: 'pointer' },
                                    }}
                                    sx={{
                                        '& input::-webkit-calendar-picker-indicator': {
                                            display: 'none',
                                            WebkitAppearance: 'none',
                                        },
                                    }}
                                />
                            )}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                            Leasing Entity
                        </Typography>
                        <Controller
                            name="leasing_entity"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    value={field.value || ''}
                                    fullWidth
                                    size="small"
                                    placeholder="Enter leasing entity"
                                />
                            )}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                            PUC Expiry Date
                        </Typography>
                        <Controller
                            name="puc_expiry_date"
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
                                    inputProps={{
                                        onClick: (e) => (e.target as HTMLInputElement).showPicker?.(),
                                        style: { cursor: 'pointer' },
                                    }}
                                    sx={{
                                        '& input::-webkit-calendar-picker-indicator': {
                                            display: 'none',
                                            WebkitAppearance: 'none',
                                        },
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
