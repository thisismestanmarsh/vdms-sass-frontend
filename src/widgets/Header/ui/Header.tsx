import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Select,
  MenuItem,
  FormControl,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTranslation } from 'react-i18next';
import { SUPPORTED_LANGUAGES } from '@shared/config/i18n/languages';
import type { SelectChangeEvent } from '@mui/material';
import { useUserStore } from '@entities/user/model/userStore';
import { useMutation } from '@tanstack/react-query';
import { api } from '@shared/api/apiClient';
import { ENDPOINTS } from '@shared/api/endpoints';
import LogoutIcon from '@mui/icons-material/Logout';
import { useState } from 'react';

interface HeaderProps {
  onMenuToggle: () => void;
}

export const Header = ({ onMenuToggle }: HeaderProps) => {
  const { i18n } = useTranslation();
  const setAuthData = useUserStore((state) => state.setAuthData);
  const user = useUserStore((state) => state.authData?.user);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  const { mutate: logoutApi } = useMutation({
    mutationFn: () => api.post(ENDPOINTS.AUTH.LOGOUT),
    onSettled: () => {
      setAuthData(undefined as any);
    },
  });

  const handleLanguageChange = (event: SelectChangeEvent) => {
    i18n.changeLanguage(event.target.value);
  };

  const handleLogoutClick = () => {
    setIsLogoutDialogOpen(true);
  };

  const handleLogoutConfirm = () => {
    setIsLogoutDialogOpen(false);
    logoutApi();
  };

  const handleLogoutCancel = () => {
    setIsLogoutDialogOpen(false);
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onMenuToggle}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          VDMS
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {user && (
            <Typography variant="body2" sx={{ color: 'white' }}>
              Hi, {user.name}
            </Typography>
          )}
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <Select
              value={i18n.resolvedLanguage || i18n.language}
              onChange={handleLanguageChange}
              displayEmpty
              sx={{
                color: 'white',
                '.MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.3)' },
              }}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <MenuItem key={lang.code} value={lang.code}>
                  {lang.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <IconButton color="inherit" onClick={handleLogoutClick} title="Logout">
            <LogoutIcon />
          </IconButton>
        </Box>
      </Toolbar>

      <Dialog
        open={isLogoutDialogOpen}
        onClose={handleLogoutCancel}
        PaperProps={{
          sx: {
            bgcolor: 'background.paper',
            backgroundImage: 'none',
            borderRadius: 3,
            p: 1,
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 600 }}>Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: 'text.secondary' }}>
            Are you sure you want to log out? You will need to login again to access your account.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button
            onClick={handleLogoutCancel}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              color: 'text.primary',
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleLogoutConfirm}
            variant="contained"
            color="error"
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              borderRadius: '8px',
              px: 3,
            }}
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
};
