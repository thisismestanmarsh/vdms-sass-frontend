import { Box, Typography, Tabs, Tab, Grid, Paper } from '@mui/material';
import { useState } from 'react';
import { ChallansTable, type Challan } from '../ChallansTable/ChallansTable';
import { SummaryCard } from '../components/SummaryCard';

const DUMMY_DATA: Challan[] = [
  { id: '1', challanNo: 'D10021', vehicleRegNumber: 'HR26 TU1345', offenceType: 'Overspeeding', fineAmount: 4000, placeOfOffence: 'Saket', offenceDate: '13:28, 28 Dec', status: 'Unpaid', lastUpdatedAt: '13:28, 28 Dec' },
  { id: '2', challanNo: 'D10022', vehicleRegNumber: 'HR26 TU1345', offenceType: 'Wrong Parking', fineAmount: 4000, placeOfOffence: 'Hauz Khas', offenceDate: '13:28, 28 Dec', status: 'Unpaid', lastUpdatedAt: '13:28, 28 Dec' },
  { id: '3', challanNo: 'D10023', vehicleRegNumber: 'HR26 TU1345', offenceType: 'Wrong Parking', fineAmount: 4000, placeOfOffence: 'Vasant Kunj', offenceDate: '13:28, 28 Dec', status: 'Unpaid', lastUpdatedAt: '13:28, 28 Dec' },
  { id: '4', challanNo: 'D10024', vehicleRegNumber: 'HR26 TU1345', offenceType: 'Wrong Parking', fineAmount: 4000, placeOfOffence: 'Greater Kailash', offenceDate: '13:28, 28 Dec', status: 'Unpaid', lastUpdatedAt: '13:28, 28 Dec' },
  { id: '5', challanNo: 'D10025', vehicleRegNumber: 'HR26 TU1345', offenceType: 'Overspeeding', fineAmount: 4000, placeOfOffence: 'Punjabi Bagh', offenceDate: '13:28, 28 Dec', status: 'Disputed', lastUpdatedAt: '13:28, 28 Dec' },
  { id: '6', challanNo: 'D10026', vehicleRegNumber: 'HR26 TU1345', offenceType: 'Overspeeding', fineAmount: 4000, placeOfOffence: 'Rajouri Garden', offenceDate: '13:28, 28 Dec', status: 'Disputed', lastUpdatedAt: '13:28, 28 Dec' },
  { id: '7', challanNo: 'D10027', vehicleRegNumber: 'HR26 TU1345', offenceType: 'Overspeeding', fineAmount: 4000, placeOfOffence: 'Rohini', offenceDate: '13:28, 28 Dec', status: 'Overdue', lastUpdatedAt: '13:28, 28 Dec' },
  { id: '8', challanNo: 'D10028', vehicleRegNumber: 'HR26 TU1345', offenceType: 'Wrong Parking', fineAmount: 4000, placeOfOffence: 'Dwarka', offenceDate: '13:28, 28 Dec', status: 'Overdue', lastUpdatedAt: '13:28, 28 Dec' },
  { id: '9', challanNo: 'D10029', vehicleRegNumber: 'HR26 TU1345', offenceType: 'Overspeeding', fineAmount: 4000, placeOfOffence: 'Janakpuri', offenceDate: '13:28, 28 Dec', status: 'Overdue', lastUpdatedAt: '13:28, 28 Dec' },
];

export const ChallansPage = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const filteredData = tabIndex === 0
    ? DUMMY_DATA.filter(d => d.status === 'Unpaid' || d.status === 'Overdue') // Assuming Unpaid includes Overdue conceptually, or we can just filter literal 'Unpaid'
    : DUMMY_DATA;

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Box sx={{ p: 3, width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            Challans Summary
          </Typography>
        </Box>
      </Box>

      <Box display={'flex'} gap={3}>
        <SummaryCard title="Total Challans" count={20} borderColor="#FF6B00" />
        <SummaryCard title="Paid Challans" count={20} borderColor="#4CAF50" />
        <SummaryCard title="Disputed Challans" count={20} borderColor="#9C27B0" />
        <SummaryCard title="Overdue Challans" count={20} borderColor="#F44336" />
      </Box>

      <Box>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
          Challans
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Last updated 12 mins ago
        </Typography>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabIndex} onChange={handleTabChange} sx={{ '& .MuiTab-root': { textTransform: 'none', fontWeight: 600, fontSize: '1rem' } }}>
            <Tab label="Unpaid Challans" />
            <Tab label="All Challans" />
          </Tabs>
        </Box>
        <ChallansTable data={filteredData} />
      </Box>
    </Box>
  );
};
