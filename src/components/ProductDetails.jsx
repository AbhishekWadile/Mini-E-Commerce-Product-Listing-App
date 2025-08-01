import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  Box,
  Rating,
  CardActions,
  Button,
  Grid
} from "@mui/material";
import { CartContext } from '../context/CartContext';

export default function ProductDetails() {
  const { id } = useParams();
  const newid = id.replace(":", "");
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${newid}`).then((res) => {
      setProduct(res.data);
      setLoading(false);
    });
  }, [id]);

  if (loading)
    return <CircularProgress sx={{ display: "block", mx: "auto" }} />;

  return (
    <Card sx={{ p: 2 }}>
      <Grid container spacing={2} sx={{display: 'flex'}} alignItems="center" direction={{ xs: 'column', md: 'row' , lg:'row' }}>
        <Grid item xs={12} md={6}>
          <CardMedia
            component="img"
            image={product.image}
            alt={product.title}
            sx={{ width: '100%', maxHeight: 300, objectFit: "contain" }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {product.title}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Category: {product.category}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {product.description}
            </Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }} gutterBottom>
              ₹{product.price}
            </Typography>
            <Box sx={{ "& > legend": { mt: 2 } }}>
              <Rating
                name="simple-uncontrolled"
                onChange={(event, newValue) => {
                  console.log(newValue);
                }}
                defaultValue={product.rating?.rate}
              />
            </Box>
            <Typography variant="caption">
              ({product.rating?.count} reviews)
            </Typography>
            <CardActions sx={{ mt: 2 }}>
              <Button
                size="small"
                variant="contained"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </Button>
            </CardActions>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
}