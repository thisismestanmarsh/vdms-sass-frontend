import { Box, Button, TextField, InputAdornment, Tabs, Tab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ROUTES } from '@shared/config/routes';
import { HubsTable } from './HubsTable';
import { ZonesTable } from './ZonesTable';

export const HubPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = searchParams.get('tab') === 'zones' ? 1 : 0;

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setSearchParams({ tab: newValue === 1 ? 'zones' : 'hubs' });
  };

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 1 }}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          textColor="primary"
          indicatorColor="primary"
          sx={{
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '1rem',
              minWidth: 100,
            },
          }}
        >
          <Tab label="Hubs" />
          <Tab label="Zones" />
        </Tabs>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <TextField
          placeholder={currentTab === 0 ? 'Search by hub name' : 'Search by zone name'}
          size="small"
          sx={{
            width: 350,
            '& .MuiOutlinedInput-root': {
              bgcolor: 'background.paper',
              borderRadius: '8px',
            },
            cursor: 'pointer',
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate(currentTab === 0 ? ROUTES.HUB_CREATE : ROUTES.ZONE_CREATE)}
          sx={{
            bgcolor: 'primary.main',
            '&:hover': { bgcolor: 'primary.dark' },
            borderRadius: '8px',
            textTransform: 'none',
          }}
        >
          {currentTab === 0 ? 'Create Hub' : 'Create Zone'}
        </Button>
      </Box>

      {currentTab === 0 ? <HubsTable /> : <ZonesTable />}
    </Box>
  );
};
