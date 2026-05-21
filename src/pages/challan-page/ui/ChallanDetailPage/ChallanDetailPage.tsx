import { Box, Typography, Button, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { ROUTES } from '@shared/config/routes';
import { useState } from 'react';
import { SettleChallanModal } from '../SettleChallanModal/SettleChallanModal';

// Dummy data for detail page to simulate an unpaid challan
const DUMMY_DETAIL = {
  id: '1',
  challanNo: 'D10021',
  vehicleRegNumber: 'HR26 TU1345',
  offenceType: 'Overspeeding',
  fineAmount: 4000,
  placeOfOffence: 'Saket',
  offenceDate: '13:28, 28 Dec',
  status: 'Unpaid',
  lastUpdatedAt: '13:28, 28 Dec',
};

export const ChallanDetailPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState(DUMMY_DETAIL.status);

  const handleSettleSubmit = (amount: string, files: File[]) => {
    // In a real app we'd make an API call here.
    console.log('Settling challan with:', amount, 'files:', files);
    setStatus('Settlement In Progress');
    setModalOpen(false);
  };

  return (
    <Box sx={{ p: 3, maxWidth: 1200, margin: '0 auto' }}>
      <Typography variant="body2" sx={{ mb: 2 }}>
        <Link to={ROUTES.CHALLANS} style={{ color: 'inherit', textDecoration: 'none' }}>Challans</Link> / {DUMMY_DETAIL.challanNo}
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Ticket Detail
          </Typography>
        </Box>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setModalOpen(true)}
          sx={{ borderRadius: '8px', textTransform: 'none' }}
          disabled={status === 'Settlement In Progress'}
        >
          Settle Challan
        </Button>
      </Box>

      <Paper sx={{ p: 3, borderRadius: '12px', bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', boxShadow: 'none' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Box>
            <Typography variant="body2" color="text.secondary">Challan Number</Typography>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>{DUMMY_DETAIL.challanNo}</Typography>
          </Box>
        </Box>
        <Typography variant="body1" sx={{ fontWeight: 600, mb: 2 }}>Challan Details</Typography>

        <Box display={'flex'}>
          <Box flex={1}>
            <Typography variant="body2" color="text.secondary">Vehicle Number</Typography>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>{DUMMY_DETAIL.vehicleRegNumber}</Typography>
          </Box>
          <Box flex={1}>
            <Typography variant="body2" color="text.secondary">Offence Date</Typography>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>{DUMMY_DETAIL.offenceDate}</Typography>
          </Box>
          <Box flex={1}>
            <Typography variant="body2" color="text.secondary">Total Amount</Typography>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>₹ {DUMMY_DETAIL.fineAmount.toLocaleString('en-IN')}</Typography>
          </Box>
          <Box flex={1}>
            <Typography variant="body2" color="text.secondary">Place of Offence</Typography>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>{DUMMY_DETAIL.placeOfOffence}</Typography>
          </Box>
        </Box>

        <Box display={'flex'} mt={4} width={'50%'}>
          <Box flex={1}>
            <Typography variant="body2" color="text.secondary">Offence Date</Typography>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>{DUMMY_DETAIL.offenceDate}</Typography>
          </Box>
          <Box flex={1}>
            <Typography variant="body2" color="text.secondary">Status</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  bgcolor: status === 'Settlement In Progress' ? 'info.main' : 'warning.main', // Assuming unpaid/disputed is orange-ish in detail view, or we can use error
                }}
              />
              <Typography variant="body1" sx={{ fontWeight: 600, color: status === 'Settlement In Progress' ? 'info.main' : 'warning.main' }}>
                {status}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>

      <SettleChallanModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSettle={handleSettleSubmit}
      />
    </Box>
  );
};
