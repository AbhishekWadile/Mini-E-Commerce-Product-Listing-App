import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Badge } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { CartContext } from '../context/CartContext';

export default function Navbar({ darkMode, setDarkMode }) {
  const { cartItems, toggleDrawer } = useContext(CartContext);

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Mini E-Commerce
        </Typography>
        <IconButton color="inherit" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <LightModeIcon />:<DarkModeIcon />}
        </IconButton>
        <IconButton color="inherit" onClick={toggleDrawer}>
          <Badge badgeContent={cartItems.length} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
