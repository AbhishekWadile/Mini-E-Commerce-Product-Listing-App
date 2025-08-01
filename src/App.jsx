import React, { useMemo, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import { CartProvider } from "./context/CartContext";
import CartDrawer from "./components/CartDrawer";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  const theme = useMemo(
    () => createTheme({ palette: { mode: darkMode ? "dark" : "light" } }),
    [darkMode]
  );

  return (
    <CartProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
          <CartDrawer />
          <Container sx={{ mt: 10 }}>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              gutterBottom
            >
              Products
            </Typography>
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/product/:id" element={<ProductDetails />} />
            </Routes>
          </Container>
          <Box
            component="footer"
            sx={{
              textAlign: "center",
              py: 3,
              mt: 4,
              borderTop: "1px solid",
              borderColor: "divider",
            }}
          >
            <Typography variant="body2" color="text.secondary">
              © {new Date().getFullYear()} Mini E-Commerce. All rights reserved.
            </Typography>
          </Box>
        </Router>
      </ThemeProvider>
    </CartProvider>
  );
}
