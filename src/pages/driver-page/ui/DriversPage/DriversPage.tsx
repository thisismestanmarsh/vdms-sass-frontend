import { Box, Typography, Button, Grid, Paper, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import AddIcon from '@mui/icons-material/Add';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@shared/config/routes';
import { DriversTable } from '../DriversTable/DriversTable';

export const DriversPage = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            Drivers
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={() => navigate(ROUTES.DRIVER_CREATE)}
            sx={{
              borderRadius: '8px',
              textTransform: 'none',
              px: 3,
              border: '1px solid',
              borderColor: 'primary.main',
              color: 'primary.main',
              '&:hover': {
                border: '1px solid',
                borderColor: 'primary.dark',
                bgcolor: 'rgba(255, 107, 0, 0.04)',
              },
            }}
          >
            Add Single Driver
          </Button>
          <Button
            variant="contained"
            startIcon={<GroupAddIcon />}
            sx={{
              borderRadius: '8px',
              textTransform: 'none',
              px: 3,
              bgcolor: 'primary.main',
              '&:hover': {
                bgcolor: 'primary.dark',
              },
            }}
          >
            Add Bulk Drivers
          </Button>
        </Box>
      </Box>

      {/* Summary Cards */}
      <Box>
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500, color: 'text.secondary' }}>
          Drivers Summary
        </Typography>
        <Grid container spacing={2}>
          {[
            { label: 'Total Drivers', value: '23', color: '#ff6b00' },
            { label: 'Drivers Online', value: '20', color: '#00c853' },
            { label: 'Total Rides', value: '33', color: '#6200ea' },
          ].map((card, index) => (
            <Grid key={index} size={{ xs: 12, md: 4 }}>
              <Paper
                sx={{
                  p: 2,
                  borderRadius: 2,
                  bgcolor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'divider',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="h3" sx={{ fontWeight: 700, mb: 0.5 }}>
                    {card.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {card.label}
                  </Typography>
                  {card.subLabel && (
                    <Typography
                      variant="caption"
                      sx={{
                        mt: 1,
                        color: 'primary.main',
                        cursor: 'pointer',
                        '&:hover': { textDecoration: 'underline' },
                      }}
                    >
                      → {card.subLabel}
                    </Typography>
                  )}
                </Box>
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '4px',
                    bgcolor: card.color,
                  }}
                />
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Table & Filters */}
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Drivers
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <TextField
              size="small"
              placeholder="Search by Driver ID or Driver Name"
              sx={{ width: 300 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="outlined"
              startIcon={<FileDownloadIcon fontSize="small" />}
              sx={{
                borderRadius: '8px',
                textTransform: 'none',
                border: '1px solid',
                borderColor: 'divider',
                color: 'text.primary',
              }}
            >
              Download Drivers
            </Button>
          </Box>
        </Box>
        <DriversTable />
      </Box>
    </Box>
  );
};
