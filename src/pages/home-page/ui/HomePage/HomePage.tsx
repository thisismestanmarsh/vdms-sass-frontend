import { Container, Typography, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '@entities/user/model/userStore';

export const HomePage = () => {
  const { t } = useTranslation();
  const { authData } = useUserStore();

  if (!authData) return null;

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h1" gutterBottom>
          {t('welcome')}, {authData.user.name}!
        </Typography>
      </Box>
    </Container>
  );
};
