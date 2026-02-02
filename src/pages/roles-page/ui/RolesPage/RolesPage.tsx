import { Container, Typography, Box } from '@mui/material';
import { RolesTable } from './RolesTable';

export const RolesPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Roles
        </Typography>
      </Box>
      <RolesTable />
    </Container>
  );
};
