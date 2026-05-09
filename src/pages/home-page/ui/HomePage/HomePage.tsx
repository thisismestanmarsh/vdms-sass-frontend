import { Container, Typography, Box, Grid, Card, CardContent, Avatar, useTheme, alpha } from '@mui/material';
import { cloneElement } from 'react';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '@entities/user/model/userStore';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PeopleIcon from '@mui/icons-material/People';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import HubIcon from '@mui/icons-material/Hub';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
// import AssignmentIcon from '@mui/icons-material/Assignment';
import SpeedIcon from '@mui/icons-material/Speed';
import GavelIcon from '@mui/icons-material/Gavel';

export const HomePage = () => {
  const { t } = useTranslation();
  const { authData } = useUserStore();
  const theme = useTheme();

  if (!authData) return null;

  const stats = [
    { label: 'Total Vehicles', value: '1,284', icon: <DirectionsCarIcon />, color: '#6366F1', trend: '+12%' },
    { label: 'Active Drivers', value: '852', icon: <PeopleIcon />, color: '#10B981', trend: '+5%' },
    { label: 'Pending Issues', value: '43', icon: <ReportProblemIcon />, color: '#F59E0B', trend: '-8%' },
    { label: 'Active Hubs', value: '24', icon: <HubIcon />, color: '#EC4899', trend: '+2%' },
  ];

  const quickActions = [
    { label: 'Fleet Health', icon: <TrendingUpIcon />, desc: 'Real-time monitoring' },
    { label: 'Fuel Expenses', icon: <AccountBalanceWalletIcon />, desc: 'Monthly report' },
    // { label: 'Work Orders', icon: <AssignmentIcon />, desc: 'Manage repairs' },
    { label: 'Challans', icon: <GavelIcon />, desc: 'Traffic violations' },
    { label: 'Usage Optimization', icon: <SpeedIcon />, desc: 'Data insights' },
  ];

  return (
    <Container maxWidth={false} sx={{ py: 4, px: { xs: 2, md: 4 } }}>
      {/* Welcome Banner */}
      <Box
        sx={{
          mb: 4,
          p: 4,
          borderRadius: 4,
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${alpha(theme.palette.primary.dark, 0.8)} 100%)`,
          color: 'white',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          position: 'relative',
          overflow: 'hidden',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: -50,
            right: -50,
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
          }
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
          {t('welcome')}, {authData.user.name}!
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.9, fontWeight: 400 }}>
          Here's what's happening with your fleet today.
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, idx) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={idx}>
            <Card sx={{
              height: 180,
              width: 200,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              borderRadius: 3,
              boxShadow: '0 2px 12px 0 rgba(0,0,0,0.05)',
              transition: 'all 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 24px 0 rgba(0,0,0,0.1)'
              }
            }}>
              <CardContent sx={{ p: 2.5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Avatar sx={{
                    width: 40,
                    height: 40,
                    bgcolor: alpha(stat.color, 0.1),
                    color: stat.color,
                    borderRadius: 1.5
                  }}>
                    {cloneElement(stat.icon as React.ReactElement<any>, { sx: { fontSize: 20 } })}
                  </Avatar>
                  <Typography variant="caption" sx={{
                    color: stat.trend.startsWith('+') ? 'success.main' : 'error.main',
                    fontWeight: 700,
                    bgcolor: alpha(stat.trend.startsWith('+') ? theme.palette.success.main : theme.palette.error.main, 0.1),
                    px: 1,
                    py: 0.25,
                    borderRadius: 1
                  }}>
                    {stat.trend}
                  </Typography>
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5, fontSize: '1.75rem' }}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600, opacity: 0.8 }}>
                  {stat.label}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
        Quick Insights
      </Typography>

      <Grid container spacing={3}>
        {quickActions.map((action, idx) => (
          <Grid size={{ xs: 12, sm: 6, md: 2.4 }} key={idx}>
            <Card variant="outlined" sx={{
              height: 180,
              width: 200,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              borderRadius: 3,
              cursor: 'not-allowed',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.2s',
              '&:hover': { borderColor: 'divider' }
            }}>
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  bgcolor: 'warning.main',
                  color: 'warning.contrastText',
                  px: 1,
                  py: 1.2,
                  fontSize: '10px',
                  fontWeight: 800,
                  borderBottomLeftRadius: 8
                }}
              >
                COMING SOON
              </Box>
              <CardContent sx={{ textAlign: 'center', p: 2 }}>
                <Box sx={{ color: 'text.disabled', mb: 1.5, '& svg': { fontSize: 32 } }}>
                  {action.icon}
                </Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'text.disabled', mb: 0.5, lineHeight: 1.2 }}>
                  {action.label}
                </Typography>
                <Typography variant="caption" color="text.disabled" sx={{ opacity: 0.6, display: 'block' }}>
                  {action.desc}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
