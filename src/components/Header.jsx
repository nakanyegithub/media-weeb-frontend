import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import TheatersIcon from '@mui/icons-material/Theaters';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <TheatersIcon sx={{ mr: 1 }} />
        <MenuBookIcon sx={{ mr: 2 }} />
        
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          MediaWeeb Tracker
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/"
            startIcon={<HomeIcon />}
            sx={{ mr: 2 }}
          >
            Главная
          </Button>
          
          <Button 
            variant="contained" 
            color="secondary"
            component={RouterLink} 
            to="/add"
            startIcon={<AddIcon />}
          >
            Добавить
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;