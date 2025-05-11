import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  Container,
} from '@mui/material';
import { Favorite } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

const Wishlist: React.FC = () => {
  const [wishlist, setWishlist] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setWishlist(storedWishlist);
  }, []);

  const handleRemove = (id: string) => {
    const updated = wishlist.filter(item => item.id !== id);
    localStorage.setItem('wishlist', JSON.stringify(updated));
    setWishlist(updated);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
      }}
    >
      <Header />
      <Container sx={{ flex: 1, py: 8 }}>
        <Typography variant="h4" gutterBottom>My Wishlist</Typography>

        {wishlist.length === 0 ? (
          <Typography variant="body1">Your wishlist is empty.</Typography>
        ) : (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
            {wishlist.map(beach => (
              <Card 
                key={beach.id} 
                sx={{ 
                  width: 250,
                  cursor: 'pointer',
                  '&:hover': {
                    boxShadow: 6,
                    transform: 'translateY(-4px)',
                    transition: 'all 0.3s ease-in-out'
                  }
                }}
                onClick={() => navigate(`/beaches/${beach.id}`)}
              >
                <CardContent>
                  <Typography variant="h6">{beach.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{beach.location}</Typography>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent card click when clicking the button
                      handleRemove(beach.id);
                    }}
                    color="error"
                  >
                    <Favorite />
                  </IconButton>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Container>
      <Footer />
    </Box>
  );
};

export default Wishlist;
