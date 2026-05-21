import { Paper, Typography } from '@mui/material';

interface SummaryCardProps {
  title: string;
  count: number;
  borderColor: string;
}

export const SummaryCard = ({ title, count, borderColor }: SummaryCardProps) => (
  <Paper
    sx={{
      p: 3,
      borderRadius: '12px',
      bgcolor: 'background.paper',
      borderBottom: `4px solid ${borderColor}`,
      display: 'flex',
      flexDirection: 'column',
      gap: 1,
      flexGrow: 1,
    }}
  >
    <Typography variant="h4" sx={{ fontWeight: 700 }}>
      {count}
    </Typography>
    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
      {title}
    </Typography>
  </Paper>
);
