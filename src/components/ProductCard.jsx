import React, { useContext, useState } from "react";
import {
  Card,
  Stack,
  CardMedia,
  Typography,
  Button,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Rating,
} from "@mui/material";
import { CartContext } from "../context/CartContext";
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Card
      sx={{
        height: "auto",
        width: "1000",
        display: "flex",
        flexDirection: "column",
        p: 2,
        transition: "transform 0.2s ease-in-out",
        "&:hover": {
          transform: "scale(1.02)",
        },
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={product.image}
        alt={product.title}
        sx={{ objectFit: "contain" }}
      />
      <Stack
        direction="row"
        sx={{ justifyContent: "space-between", alignItems: "center" }}
      >
        <Typography gutterBottom variant="body2">
          {product.title.slice(0, 15)}...
        </Typography>
        <Typography gutterBottom variant="h6" sx={{ fontWeight: "bold" }}>
          ₹{product.price}
        </Typography>
      </Stack>
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button size="small" variant="outlined" onClick={handleOpen}>
          Read More
        </Button>
        <IconButton onClick={() => addToCart(product)}>
          <ShoppingCartIcon sx={{ color: '#febd69' }} />
        </IconButton>
      </CardActions>

      {/* Product Details Popup */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>{product.title}</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 3,
            }}
          >
            <CardMedia
              component="img"
              height="200"
              image={product.image}
              alt={product.title}
              sx={{
                width: { xs: "100%", md: "40%" },
                objectFit: "contain",
                mb: { xs: 2, md: 0 },
              }}
            />
            <Box sx={{ flex: 1 }}>
              <Typography variant="body1" gutterBottom>
                Category: {product.category}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {product.description}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold" }}
                gutterBottom
              >
                ₹{product.price}
              </Typography>
              <Rating name="read-only" value={product.rating?.rate} readOnly />
              <Typography variant="body2">
                ({product.rating?.count} reviews)
              </Typography>
            </Box>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <IconButton onClick={() => addToCart(product)}>
          <ShoppingCartIcon sx={{ color: '#febd69' }}/>
        </IconButton>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
