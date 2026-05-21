import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getChallanDetailsPath } from '@shared/config/routes';

export interface Challan {
  id: string;
  challanNo: string;
  vehicleRegNumber: string;
  offenceType: string;
  fineAmount: number;
  placeOfOffence: string;
  offenceDate: string;
  status: 'Unpaid' | 'Disputed' | 'Overdue' | 'Settlement In Progress';
  lastUpdatedAt: string;
}

interface ChallansTableProps {
  data: Challan[];
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Unpaid':
      return 'text.primary';
    case 'Disputed':
      return 'warning.main';
    case 'Overdue':
      return 'error.main';
    case 'Settlement In Progress':
      return 'info.main';
    default:
      return 'text.primary';
  }
};

export const ChallansTable = ({ data }: ChallansTableProps) => {
  const navigate = useNavigate();

  return (
    <TableContainer
      component={Paper}
      sx={{
        bgcolor: 'background.paper',
        borderRadius: '8px',
        boxShadow: 'none',
        border: '1px solid',
        borderColor: 'divider',
        mt: 2,
      }}
    >
      <Table stickyHeader>
        <TableHead sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)' }}>
          <TableRow>
            <TableCell sx={{ fontWeight: 600 }}>Challan No</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Vehicle Reg Number</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Offence Type</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Fine Amount</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Place of Offence</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Offence Date</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Last Updated at</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id} hover sx={{ cursor: 'pointer' }} onClick={() => navigate(getChallanDetailsPath(row.id))}>
              <TableCell sx={{ color: 'primary.main', fontWeight: 500 }}>
                {row.challanNo}
              </TableCell>
              <TableCell>{row.vehicleRegNumber}</TableCell>
              <TableCell>{row.offenceType}</TableCell>
              <TableCell>₹ {row.fineAmount.toLocaleString('en-IN')}</TableCell>
              <TableCell>{row.placeOfOffence}</TableCell>
              <TableCell>{row.offenceDate}</TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      bgcolor: getStatusColor(row.status),
                    }}
                  />
                  <Typography
                    sx={{
                      color: getStatusColor(row.status),
                      fontWeight: 600,
                      fontSize: '0.875rem',
                    }}
                  >
                    {row.status}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell sx={{ color: 'text.secondary', fontSize: '0.8125rem' }}>
                {row.lastUpdatedAt}
              </TableCell>
            </TableRow>
          ))}
          {data.length === 0 && (
            <TableRow>
              <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                <Typography color="text.secondary">No challans found.</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
