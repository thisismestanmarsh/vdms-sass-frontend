import { useState } from 'react';
import { Box, Button, TextField, Typography, Paper, Alert, CircularProgress } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useUserStore } from '@entities/user/model/userStore';
import { api } from '@shared/api/apiClient';
import { ENDPOINTS } from '@shared/api/endpoints';
import type { AuthResponse } from '@entities/user/model/userStore';

const TENANT_ID = '6950082673f5d92631bf6132';

export const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const setAuthData = useUserStore((state) => state.setAuthData);

    const { mutate: login, isPending, error } = useMutation({
        mutationFn: (loginData: any) => api.post<AuthResponse>(ENDPOINTS.AUTH.LOGIN, loginData),
        onSuccess: (data) => {
            setAuthData(data);
        },
    });

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (email && password) {
            login({
                email,
                password,
                tenant_id: TENANT_ID,
            });
        }
    };

    const errorMessage = (error as any)?.response?.data?.message || (error as any)?.message;

    return (
        <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 400 }}>
            <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 600 }}>
                Login
            </Typography>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {errorMessage || 'Invalid email or password'}
                </Alert>
            )}

            <Box component="form" onSubmit={handleLogin} sx={{ mt: 2 }}>
                <TextField
                    fullWidth
                    label="Email Address"
                    type="email"
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isPending}
                />
                <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isPending}
                />
                <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    disabled={isPending}
                    sx={{
                        mt: 3,
                        mb: 2,
                        py: 1.5,
                        textTransform: 'none',
                        fontSize: '1rem',
                        fontWeight: 600,
                        borderRadius: 2
                    }}
                >
                    {isPending ? <CircularProgress size={24} color="inherit" /> : 'Log In'}
                </Button>
            </Box>
        </Paper>
    );
};
