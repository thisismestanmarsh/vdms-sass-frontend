import { useState, useEffect } from 'react';
import { Box, Typography, Link, Paper, Button, CircularProgress } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '@shared/config/routes';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useForm } from 'react-hook-form';
import {
  useCreateVehicle,
  useVehicle,
  useUpdateVehicle,
} from '@entities/vehicle/model/vehicleHooks';
import type { VehicleRequest } from '@entities/vehicle/model/types';
import { Step1BasicInfo } from './components/Step1BasicInfo';
import { Step2VehicleDetails } from './components/Step2VehicleDetails';
import { Step3Location } from './components/Step3Location';
import { Step4AdditionalDetails } from './components/Step4AdditionalDetails';
import { buildVehiclePayload } from './utils/payloadBuilder';

export const CreateVehiclePage = () => {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const { mutate: createVehicle, isPending: isCreating } = useCreateVehicle();
  const { mutate: updateVehicle, isPending: isUpdating } = useUpdateVehicle();
  const { data: vehicleData, isLoading: isLoadingVehicle } = useVehicle(id);

  const { control, handleSubmit, watch, reset, getValues } = useForm<VehicleRequest>({
    mode: 'onChange',
    defaultValues: {},
  });

  useEffect(() => {
    if (vehicleData?.data) {
      const rawData = vehicleData.data;
      const data = Array.isArray(rawData) ? rawData[0] : rawData;

      if (!data) return;

      const formatDate = (dateStr: string | null | undefined) => {
        if (!dateStr) return '';
        return dateStr.split('T')[0];
      };

      const formattedData = {
        ...data,
        registration_date: formatDate(data.registration_date),
        invoice_date: formatDate(data.invoice_date),
        lease_start_date: formatDate(data.lease_start_date),
        lease_end_date: formatDate(data.lease_end_date),
        puc_expiry_date: formatDate(data.puc_expiry_date),
        fitness: {
          ...data.fitness,
          expiry_date: formatDate(data.fitness?.expiry_date),
        },
        insurance: {
          ...data.insurance,
          policy_start_date: formatDate(data.insurance?.policy_start_date),
          policy_end_date: formatDate(data.insurance?.policy_end_date),
        },
        toll: {
          ...data.toll,
          validity_date: formatDate(data.toll?.validity_date),
        },
        powertrain_specs: {
          ...data.powertrain_specs,
          ev: data.powertrain_specs?.ev
            ? {
              ...data.powertrain_specs.ev,
              battery_soh_date: formatDate(data.powertrain_specs.ev.battery_soh_date),
            }
            : undefined,
        },
        warranties:
          data.warranties?.map((w: any) => ({
            ...w,
            warranty_end_date: formatDate(w.warranty_end_date),
          })) || [],
      };

      // Helper to match enum values case-insensitively and trim whitespace
      const matchEnum = (val: string | undefined, options: string[]) => {
        if (!val) return '';
        const normalizedVal = val.trim();
        const match = options.find((opt) => opt.toLowerCase() === normalizedVal.toLowerCase());
        return match || normalizedVal; // Return match if found, otherwise keep original
      };

      reset({
        ...formattedData,
        type_of_vehicle: matchEnum(data.type_of_vehicle, ['2W', '3W', '4W']),
        engine_type: matchEnum(data.engine_type, ['EV', 'Petrol', 'Diesel']),
      });
    }
  }, [vehicleData, reset]);

  const engineType = watch('engine_type');

  const onSubmit = () => {
    const formValues = getValues();

    // Prevent submission if not on the final step
    // if (step < 4) return;

    const payload = buildVehiclePayload(formValues);

    if (isEdit && id) {
      payload.id = id;
      payload.created_at = vehicleData?.data?.created_at || new Date().toISOString();
      payload.updated_at = new Date().toISOString();

      updateVehicle(
        { id, data: payload },
        {
          onSuccess: () => navigate(ROUTES.VEHICLES),
        }
      );
    } else {
      const now = new Date().toISOString();
      payload.created_at = now;
      payload.updated_at = now;

      createVehicle(payload, {
        onSuccess: () => navigate(ROUTES.VEHICLES),
      });
    }
  };

  const nextStep = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setStep((prev) => Math.min(prev + 1, 4));
  };
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  if (isLoadingVehicle) {
    return (
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1BasicInfo control={control} engineType={engineType || ''} />;
      case 2:
        return <Step2VehicleDetails control={control} />;
      case 3:
        return <Step3Location control={control} />;
      case 4:
        return <Step4AdditionalDetails control={control} />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <Link
          onClick={() => navigate(ROUTES.VEHICLES)}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            cursor: 'pointer',
            textDecoration: 'none',
            color: 'primary.main',
            '&:hover': { textDecoration: 'underline' },
          }}
        >
          <ArrowBackIosIcon sx={{ fontSize: 14 }} />
          <Typography variant="body2">Go back</Typography>
        </Link>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ mb: 1, fontWeight: 600 }}>
          {isEdit ? 'Edit Vehicle' : 'Create Vehicle'}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {step === 1 && 'Step 1/4 - Vehicle & Engine Type'}
          {step === 2 && 'Step 2/4 - Vehicle Details'}
          {step === 3 && 'Step 3/4 - Location & Ownership'}
          {step === 4 && 'Step 4/4 - Compliance & Insurance'}
        </Typography>
      </Box>

      <Paper sx={{ p: 3 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {renderStep()}

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button
              key="prev-btn"
              type="button"
              onClick={prevStep}
              disabled={step === 1}
              variant="outlined"
              sx={{ minWidth: 120 }}
            >
              Previous
            </Button>
            {step < 4 ? (
              <Button
                key="next-btn"
                type="button"
                onClick={nextStep}
                variant="contained"
                sx={{ minWidth: 120 }}
              >
                Next
              </Button>
            ) : (
              <Button
                key="submit-btn"
                type="submit"
                variant="contained"
                disabled={isCreating || isUpdating}
                sx={{ minWidth: 120 }}
              >
                {isCreating || isUpdating
                  ? 'Saving...'
                  : isEdit
                    ? 'Update Vehicle'
                    : 'Create Vehicle'}
              </Button>
            )}
          </Box>
        </form>
      </Paper>
    </Box>
  );
};
