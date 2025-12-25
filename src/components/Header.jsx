import React, { useState } from 'react';
import { useNavigate, useLocation, Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  Badge as MuiBadge
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import TheatersIcon from '@mui/icons-material/Theaters';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';

const HeaderContainer = styled(AppBar)`
  background: ${({ theme }) => theme.colors.primary};
  box-shadow: ${({ theme }) => theme.shadows.medium};
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: ${({ theme }) => theme.spacing.sm};
  
  &:hover {
    opacity: 0.9;
  }
`;

const LogoText = styled(Typography)`
  font-weight: 700;
  background: linear-gradient(45deg, #fff 30%, #ffd740 90%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const NavLinks = styled(Box)`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-left: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: 900px) {
    margin-left: ${({ theme }) => theme.spacing.md};
    gap: ${({ theme }) => theme.spacing.xs};
  }
`;

const NavButton = styled(Button)`
  color: white;
  font-weight: 500;
  text-transform: none;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  
  &.active {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const ActionButtons = styled(Box)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-left: auto;
`;

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationsAnchor, setNotificationsAnchor] = useState(null);

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationsOpen = (event) => {
    setNotificationsAnchor(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setNotificationsAnchor(null);
  };

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const drawerContent = (
    <Box sx={{ width: 250 }} role="presentation" onClick={handleDrawerToggle}>
      <List>
        <ListItem button component={RouterLink} to="/" selected={isActive('/')}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Главная" />
        </ListItem>
        
        <ListItem button component={RouterLink} to="/add" selected={isActive('/add')}>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary="Добавить" />
        </ListItem>
        
        <ListItem button component={RouterLink} to="/statistics" selected={isActive('/statistics')}>
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="Статистика" />
        </ListItem>
        
        <ListItem button component={RouterLink} to="/settings" selected={isActive('/settings')}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Настройки" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <HeaderContainer position="sticky">
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          
          <Logo onClick={handleLogoClick}>
            <TheatersIcon />
            <MenuBookIcon />
            <LogoText variant="h6" sx={{ ml: 1 }}>
              MediaWeeb
            </LogoText>
          </Logo>

          {!isMobile && (
            <NavLinks>
              <NavButton
                component={RouterLink}
                to="/"
                className={isActive('/') ? 'active' : ''}
              >
                Главная
              </NavButton>
              
              <NavButton
                component={RouterLink}
                to="/add"
                className={isActive('/add') ? 'active' : ''}
              >
                Добавить
              </NavButton>
              
              <NavButton
                component={RouterLink}
                to="/statistics"
                className={isActive('/statistics') ? 'active' : ''}
              >
                Статистика
              </NavButton>
            </NavLinks>
          )}

          <ActionButtons>
            <IconButton color="inherit" onClick={() => navigate('/search')}>
              <SearchIcon />
            </IconButton>
            
            <IconButton 
              color="inherit"
              onClick={handleNotificationsOpen}
            >
              <MuiBadge badgeContent={3} color="secondary">
                <NotificationsIcon />
              </MuiBadge>
            </IconButton>
            
            {!isMobile && (
              <IconButton
                color="inherit"
                onClick={handleMenuOpen}
                sx={{ ml: 1 }}
              >
                <PersonIcon />
              </IconButton>
            )}
          </ActionButtons>
        </Toolbar>
      </HeaderContainer>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
      >
        {drawerContent}
      </Drawer>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => { handleMenuClose(); navigate('/profile'); }}>
          Профиль
        </MenuItem>
        <MenuItem onClick={() => { handleMenuClose(); navigate('/settings'); }}>
          Настройки
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          Выйти
        </MenuItem>
      </Menu>

      <Menu
        anchorEl={notificationsAnchor}
        open={Boolean(notificationsAnchor)}
        onClose={handleNotificationsClose}
      >
        <MenuItem onClick={handleNotificationsClose}>
          Новый аниме добавлен в коллекцию
        </MenuItem>
        <MenuItem onClick={handleNotificationsClose}>
          Рейтинг "Атака титанов" обновлен
        </MenuItem>
        <MenuItem onClick={handleNotificationsClose}>
          Напоминание: продолжить просмотр
        </MenuItem>
        <MenuItem 
          onClick={() => {
            handleNotificationsClose();
            navigate('/notifications');
          }}
          sx={{ textAlign: 'center', color: 'primary.main' }}
        >
          Показать все
        </MenuItem>
      </Menu>
    </>
  );
};

export default Header;