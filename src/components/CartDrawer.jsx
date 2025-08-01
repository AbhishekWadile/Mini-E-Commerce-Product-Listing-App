import React, { useContext } from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { CartContext } from "../context/CartContext";

export default function CartDrawer() {
  const { cartItems, drawerOpen, toggleDrawer, removeFromCart } =
    useContext(CartContext);

  const total = cartItems
    .reduce((sum, item) => sum + item.price * (item.quantity || 1), 0)
    .toFixed(2);

  return (
    <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
      <Box sx={{ width: 300, p: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">Your Cart</Typography>
          <IconButton onClick={toggleDrawer}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ my: 2 }} />
        <List>
          {cartItems.map((item) => (
            <ListItem
              key={item.id}
              secondaryAction={
                <Button
                  size="small"
                  color="error"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </Button>
              }
            >
              <ListItemText
                primary={`${item.title} (x${item.quantity || 1})`}
                secondary={`₹${(item.price * (item.quantity || 1)).toFixed(2)}`}
              />
            </ListItem>
          ))}
        </List>
        <Divider sx={{ my: 2 }} />
        <Typography variant="subtitle1">Total: ₹{total}</Typography>
        <Button variant="contained" fullWidth sx={{ mt: 2 }}>
          Proceed to Pay
        </Button>
      </Box>
    </Drawer>
  );
}
