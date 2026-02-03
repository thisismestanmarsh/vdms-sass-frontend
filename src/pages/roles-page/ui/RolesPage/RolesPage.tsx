import { Container, Typography, Box, Button } from '@mui/material';
import { RolesTable } from './RolesTable';
import { CreateRoleModal } from './CreateRoleModal';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';

export const RolesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Roles
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setIsModalOpen(true)}
        >
          Create Role
        </Button>
      </Box>
      <RolesTable />
      <CreateRoleModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </Container>
  );
};
