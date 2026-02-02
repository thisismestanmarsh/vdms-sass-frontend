import { Grid, Typography, TextField, MenuItem, Divider, Box, InputAdornment } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { Controller, type Control } from 'react-hook-form';
import type { VehicleRequest } from '@entities/vehicle/model/types';

interface Step1BasicInfoProps {
    control: Control<VehicleRequest>;
    engineType: string;
}

export const Step1BasicInfo = ({ control, engineType }: Step1BasicInfoProps) => {
    return (
        <Box>
            {/* Basic Information Section */}
            <Typography variant="h6" sx={{ mb: 2, color: 'primary.main', fontWeight: 600 }}>
                Basic Information
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                        Vehicle Type
                    </Typography>
                    <Controller
                        name="type_of_vehicle"
                        control={control}
                        rules={{ required: 'Vehicle type is required' }}
                        render={({ field, fieldState: { error } }) => (
                            <TextField
                                {...field}
                                value={field.value || ''}
                                select
                                fullWidth
                                size="small"
                                error={!!error}
                                helperText={error?.message}
                                SelectProps={{ displayEmpty: true }}
                            >
                                <MenuItem value="" disabled>
                                    Select Vehicle type
                                </MenuItem>
                                <MenuItem value="2W">2 Wheeler</MenuItem>
                                <MenuItem value="3W">3 Wheeler</MenuItem>
                                <MenuItem value="4W">4 Wheeler</MenuItem>
                            </TextField>
                        )}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                        Engine Type
                    </Typography>
                    <Controller
                        name="engine_type"
                        control={control}
                        rules={{ required: 'Engine type is required' }}
                        render={({ field, fieldState: { error } }) => (
                            <TextField
                                {...field}
                                value={field.value || ''}
                                select
                                fullWidth
                                size="small"
                                error={!!error}
                                helperText={error?.message}
                                SelectProps={{ displayEmpty: true }}
                            >
                                <MenuItem value="" disabled>
                                    Select engine type
                                </MenuItem>
                                <MenuItem value="EV">Electric</MenuItem>
                                <MenuItem value="Petrol">Petrol</MenuItem>
                                <MenuItem value="Diesel">Diesel</MenuItem>
                            </TextField>
                        )}
                    />
                </Grid>
            </Grid>

            {/* EV Specifications */}
            {engineType === 'EV' && (
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" sx={{ mb: 2, color: 'primary.main', fontWeight: 600 }}>
                        EV Specifications
                    </Typography>
                    <Divider sx={{ mb: 3 }} />

                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                                ARAI Range (KM)
                            </Typography>
                            <Controller
                                name="powertrain_specs.ev.arai_range_km"
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
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                                Battery Capacity (kWh)
                            </Typography>
                            <Controller
                                name="powertrain_specs.ev.battery_capacity_kwh"
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
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                                Battery SOH Date
                            </Typography>
                            <Controller
                                name="powertrain_specs.ev.battery_soh_date"
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
                                Battery SOH Percent
                            </Typography>
                            <Controller
                                name="powertrain_specs.ev.battery_soh_percent"
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
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                                Battery Type
                            </Typography>
                            <Controller
                                name="powertrain_specs.ev.battery_type"
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
                                Connector Type
                            </Typography>
                            <Controller
                                name="powertrain_specs.ev.connector_type"
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
                                Current Range (KM)
                            </Typography>
                            <Controller
                                name="powertrain_specs.ev.current_range_km"
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
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                                Fast Charger Rate (kW)
                            </Typography>
                            <Controller
                                name="powertrain_specs.ev.fast_charger_rate_kw"
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
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                                Onboard Charger Capacity (kW)
                            </Typography>
                            <Controller
                                name="powertrain_specs.ev.onboard_charger_capacity_kw"
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
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                                Range on Start Date (KM)
                            </Typography>
                            <Controller
                                name="powertrain_specs.ev.range_on_start_date_km"
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
            )}

            {/* ICE Specifications */}
            {(engineType === 'Petrol' || engineType === 'Diesel') && (
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" sx={{ mb: 2, color: 'primary.main', fontWeight: 600 }}>
                        ICE Specifications
                    </Typography>
                    <Divider sx={{ mb: 3 }} />

                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                                ARAI Mileage (KMPL)
                            </Typography>
                            <Controller
                                name="powertrain_specs.ice.arai_mileage_kmpl"
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
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                                CNG Kit Fitment Type
                            </Typography>
                            <Controller
                                name="powertrain_specs.ice.cng_kit_fitment_type"
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
                                Cooling System Type
                            </Typography>
                            <Controller
                                name="powertrain_specs.ice.cooling_system_type"
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
                                Current Mileage (KMPL)
                            </Typography>
                            <Controller
                                name="powertrain_specs.ice.current_mileage_kmpl"
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
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                                Emission Control Type
                            </Typography>
                            <Controller
                                name="powertrain_specs.ice.emission_control_type"
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
                                Emission Norm
                            </Typography>
                            <Controller
                                name="powertrain_specs.ice.emission_norm"
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
                                Engine Displacement (CC)
                            </Typography>
                            <Controller
                                name="powertrain_specs.ice.engine_displacement_cc"
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
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                                Fuel Tank Capacity (L)
                            </Typography>
                            <Controller
                                name="powertrain_specs.ice.fuel_tank_capacity_liters"
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
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                                Mileage on Start Date (KMPL)
                            </Typography>
                            <Controller
                                name="powertrain_specs.ice.mileage_on_start_date_kmpl"
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
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                                Number of Cylinders
                            </Typography>
                            <Controller
                                name="powertrain_specs.ice.number_of_cylinders"
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
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                                Transmission Type
                            </Typography>
                            <Controller
                                name="powertrain_specs.ice.transmission_type"
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
                    </Grid>
                </Box>
            )}
        </Box>
    );
};
