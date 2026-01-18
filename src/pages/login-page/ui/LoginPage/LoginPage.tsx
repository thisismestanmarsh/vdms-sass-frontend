import { Box, Container } from '@mui/material';
import { LoginForm } from '@features/auth-by-username/ui/LoginForm/LoginForm';

export const LoginPage = () => {
    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '60vh',
                }}
            >
                <LoginForm />
            </Box>
        </Container>
    );
};
