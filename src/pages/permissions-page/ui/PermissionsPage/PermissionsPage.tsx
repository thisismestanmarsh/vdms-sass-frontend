import { Container, Typography, Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import { PermissionsTable } from './PermissionsTable';
import { CreatePermissionModal } from './CreatePermissionModal';

export const PermissionsPage = () => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    Permissions
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setIsCreateModalOpen(true)}
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
            <CreatePermissionModal
                open={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
            />
        </Container>
    );
};
