import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Grid, CircularProgress, Box, TextField, FormControl, InputLabel, Select, MenuItem, Slider, Typography
} from '@mui/material';
import ProductCard from './ProductCard';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [ratingFilter, setRatingFilter] = useState(0);

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      });
  }, []);

  const categories = [...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter(product => {
    return (
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (categoryFilter ? product.category === categoryFilter : true) &&
      product.price >= priceRange[0] &&
      product.price <= priceRange[1] &&
      product.rating?.rate >= ratingFilter
    );
  });

  if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto' }} />;

  return (
    <Box sx={{ flexGrow: 1, px: { xs: 1, sm: 2, md: 3 } }}>
      <TextField
        label="Search by category"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={categoryFilter}
              label="Category"
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <MenuItem value="" sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>All</MenuItem>
              {categories.map(cat => (
                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Typography gutterBottom>Price Range</Typography>
          <Slider
            value={priceRange}
            onChange={(e, newValue) => setPriceRange(newValue)}
            valueLabelDisplay="auto"
            min={0}
            max={1000}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <TextField
            type="number"
            label="Min Rating"
            fullWidth
            inputProps={{ min: 0, max: 5, step: 0.1 }}
            value={ratingFilter}
            onChange={(e) => setRatingFilter(parseFloat(e.target.value) || 0)}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} justifyContent="center">
        {filteredProducts.map(product => (
          <Grid item xs={12} sm={6} md={4} lg={5} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}