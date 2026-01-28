import { Container, Typography, Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import { UsersTable } from './UsersTable';
import { CreateUserModal } from './CreateUserModal';
import { EditUserModal } from './EditUserModal';

export const UsersPage = () => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [editingUserId, setEditingUserId] = useState<string | number | null>(null);

    const handleEdit = (id: string | number) => {
        setEditingUserId(id);
    };

    const handleCloseEdit = () => {
        setEditingUserId(null);
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    Users
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setIsCreateModalOpen(true)}
                >
                    Create User
                </Button>
            </Box>

            <UsersTable onEdit={handleEdit} />

            <CreateUserModal
                open={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
            />

            <EditUserModal
                open={!!editingUserId}
                onClose={handleCloseEdit}
                userId={editingUserId}
            />
        </Container>
    );
};
