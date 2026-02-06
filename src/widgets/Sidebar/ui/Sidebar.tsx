import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
  Collapse,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import GridViewIcon from '@mui/icons-material/GridView';
import HomeIcon from '@mui/icons-material/Home';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import SecurityIcon from '@mui/icons-material/Security';
import PeopleIcon from '@mui/icons-material/People';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import BuildIcon from '@mui/icons-material/Build';
import { useNavigate, useLocation } from 'react-router-dom';
import { ROUTES } from '@shared/config/routes';
import { useState, useEffect } from 'react';

const drawerWidth = 240;

interface SidebarProps {
  isOpen: boolean;
}

export const Sidebar = ({ isOpen }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [accessOpen, setAccessOpen] = useState(false);

  useEffect(() => {
    if (location.pathname.startsWith('/access')) {
      setAccessOpen(true);
    }
  }, [location.pathname]);

  const handleAccessClick = () => {
    setAccessOpen(!accessOpen);
  };

  const isSelected = (path: string) => {
    if (path === ROUTES.HUBS) {
      return location.pathname.startsWith('/hubs') || location.pathname.startsWith('/zones');
    }
    return location.pathname === path;
  };

  const menuButtonStyle = (isSubItem = false) => ({
    margin: isSubItem ? '2px 8px 2px 24px' : '4px 8px',
    borderRadius: '8px',
    '&.Mui-selected': {
      bgcolor: 'rgba(255, 107, 0, 0.1) !important',
      '& .MuiListItemIcon-root': {
        color: 'primary.main',
      },
      '& .MuiListItemText-primary': {
        color: 'primary.main',
        fontWeight: 700,
      },
    },
    '&:hover': {
      bgcolor: 'rgba(255, 107, 0, 0.05)',
    },
  });

  return (
    <Drawer
      variant="persistent"
      open={isOpen}
      sx={{
        width: isOpen ? drawerWidth : 0,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {[
            { text: 'Home', icon: <HomeIcon />, path: ROUTES.HOME },
            { text: 'Hubs', icon: <GridViewIcon />, path: ROUTES.HUBS },
            { text: 'Vehicles', icon: <DirectionsCarIcon />, path: ROUTES.VEHICLES },
            { text: 'Drivers', icon: <PeopleIcon />, path: ROUTES.DRIVERS },
            { text: 'Workshops', icon: <BuildIcon />, path: ROUTES.WORKSHOPS },
            { text: 'Profile', icon: <PersonIcon />, path: ROUTES.PROFILE },
          ].map((item) => {
            const active = isSelected(item.path);
            return (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  onClick={() => navigate(item.path)}
                  selected={active}
                  sx={menuButtonStyle()}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    sx={{
                      '& .MuiListItemText-primary': {
                        fontSize: '14px',
                        fontWeight: active ? 700 : 500,
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}

          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              onClick={handleAccessClick}
              selected={location.pathname.startsWith('/access')}
              sx={menuButtonStyle()}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                <VpnKeyIcon />
              </ListItemIcon>
              <ListItemText
                primary="Access"
                sx={{
                  '& .MuiListItemText-primary': {
                    fontSize: '14px',
                    fontWeight: location.pathname.startsWith('/access') ? 700 : 500,
                  },
                }}
              />
              {accessOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={accessOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  onClick={() => navigate(ROUTES.PERMISSIONS)}
                  selected={location.pathname.startsWith(ROUTES.PERMISSIONS)}
                  sx={menuButtonStyle(true)}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <SecurityIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Permissions"
                    sx={{
                      '& .MuiListItemText-primary': {
                        fontSize: '13px',
                        fontWeight: location.pathname.startsWith(ROUTES.PERMISSIONS) ? 600 : 400,
                      },
                    }}
                  />
                </ListItemButton>
                <ListItemButton
                  onClick={() => navigate(ROUTES.ROLES)}
                  selected={location.pathname === ROUTES.ROLES}
                  sx={menuButtonStyle(true)}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <PeopleIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Roles"
                    sx={{
                      '& .MuiListItemText-primary': {
                        fontSize: '13px',
                        fontWeight: location.pathname === ROUTES.ROLES ? 600 : 400,
                      },
                    }}
                  />
                </ListItemButton>
                <ListItemButton
                  onClick={() => navigate(ROUTES.USERS)}
                  selected={location.pathname === ROUTES.USERS}
                  sx={menuButtonStyle(true)}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <PersonIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Users"
                    sx={{
                      '& .MuiListItemText-primary': {
                        fontSize: '13px',
                        fontWeight: location.pathname === ROUTES.USERS ? 600 : 400,
                      },
                    }}
                  />
                </ListItemButton>
              </List>
            </Collapse>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};
