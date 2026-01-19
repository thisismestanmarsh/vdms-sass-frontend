import { useState } from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import { useUserStore } from '@entities/user/model/userStore';

export const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const setAuthData = useUserStore((state) => state.setAuthData);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login for now
    if (username && password) {
      setAuthData({ id: '1', username });
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 400 }}>
      <Typography variant="h4" gutterBottom align="center">
        Login
      </Typography>
      <Box component="form" onSubmit={handleLogin} sx={{ mt: 2 }}>
        <TextField
          fullWidth
          label="Username"
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button fullWidth type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
          Log In
        </Button>
      </Box>
    </Paper>
  );
};
