import { Box, Typography, Button, Grid, Paper, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@shared/config/routes';
import { WorkshopsTable } from '../WorkshopsTable/WorkshopsTable';

interface SummaryCard {
  label: string;
  value: string;
  color: string;
  subLabel?: string;
}

export const WorkshopsPage = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            Workshops
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate(ROUTES.WORKSHOP_CREATE)}
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
            Add Workshop
          </Button>
        </Box>
      </Box>

      {/* Summary Cards */}
      <Box>
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500, color: 'text.secondary' }}>
          Workshops Summary
        </Typography>
        <Grid container spacing={2}>
          {(
            [
              { label: 'Total Workshops', value: '0', color: '#ff6b00' },
              { label: 'Active Workshops', value: '0', color: '#00c853' },
              { label: 'Pending Requests', value: '0', color: '#6200ea' },
            ] as SummaryCard[]
          ).map((card, index) => (
            <Grid key={index} size={{ xs: 12, md: 4 }}>
              <Paper
                sx={{
                  p: 2,
                  borderRadius: '8px',
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
            All Workshops
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <TextField
              size="small"
              placeholder="Search by Workshop ID or Name"
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
              Export
            </Button>
          </Box>
        </Box>
        <WorkshopsTable />
      </Box>
    </Box>
  );
};
