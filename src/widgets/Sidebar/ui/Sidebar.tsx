import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import GridViewIcon from '@mui/icons-material/GridView';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate, useLocation } from 'react-router-dom';
import { ROUTES } from '@shared/config/routes';

const drawerWidth = 240;

interface SidebarProps {
  isOpen: boolean;
}

export const Sidebar = ({ isOpen }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, path: ROUTES.HOME },
    { text: 'Profile', icon: <PersonIcon />, path: ROUTES.PROFILE },
    { text: 'Hubs', icon: <GridViewIcon />, path: ROUTES.HUBS },
  ];

  const isSelected = (path: string) => {
    if (path === ROUTES.HUBS) {
      return location.pathname.startsWith('/hubs') || location.pathname.startsWith('/zones');
    }
    return location.pathname === path;
  };

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
          {menuItems.map((item) => {
            const active = isSelected(item.path);
            return (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  onClick={() => navigate(item.path)}
                  selected={active}
                  sx={{
                    margin: '4px 8px',
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
                  }}
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
        </List>
      </Box>
    </Drawer>
  );
};
