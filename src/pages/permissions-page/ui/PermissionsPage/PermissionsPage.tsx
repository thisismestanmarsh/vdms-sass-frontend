import { Container, Typography, Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@shared/config/routes';
import { PermissionsTable } from './PermissionsTable';

export const PermissionsPage = () => {
    const navigate = useNavigate();

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    Permissions
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => navigate(ROUTES.PERMISSION_CREATE)}
                    sx={{
                        borderRadius: '8px',
                        textTransform: 'none',
                        px: 3,
                    }}
                >
                    Create Permission
                </Button>
            </Box>
            <PermissionsTable />
        </Container>
    );
};
