import { useParams } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useDriver } from '@entities/driver/model/driverHooks';
import { CreateDriverPage } from '../CreateDriverPage/CreateDriverPage';

export const EditDriverPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useDriver(id || '');

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError || !data?.data) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Typography color="error">Failed to load driver details.</Typography>
      </Box>
    );
  }

  return <CreateDriverPage initialData={data.data} isEdit />;
};
