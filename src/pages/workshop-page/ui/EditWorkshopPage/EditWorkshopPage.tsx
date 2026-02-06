import { useParams } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useWorkshop } from '@entities/workshop/api/workshopApi';
import { CreateWorkshopPage } from '../CreateWorkshopPage/CreateWorkshopPage';

export const EditWorkshopPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: workshop, isLoading, isError } = useWorkshop(id || '');

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError || !workshop) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <Typography color="error">Failed to load workshop data.</Typography>
      </Box>
    );
  }

  return <CreateWorkshopPage initialData={workshop.data} isEdit />;
};
