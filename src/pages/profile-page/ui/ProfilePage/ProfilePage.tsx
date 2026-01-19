import { Container, Typography, Box, Paper, Avatar } from '@mui/material';
import { useUserStore } from '@entities/user/model/userStore';

export const ProfilePage = () => {
  const { authData } = useUserStore();

  if (!authData) return null;

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Profile
        </Typography>
        <Paper elevation={3} sx={{ p: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
          <Avatar sx={{ width: 100, height: 100, bgcolor: 'primary.main' }}>
            {authData.username[0].toUpperCase()}
          </Avatar>
          <Box>
            <Typography variant="h5">{authData.username}</Typography>
            <Typography variant="body1" color="text.secondary">
              User ID: {authData.id}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Role: Administrator
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};
