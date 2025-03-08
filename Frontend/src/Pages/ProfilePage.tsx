import { Avatar, Box, Container, Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import { useUser } from '../context/UserContext';

const ProfilePage: React.FC = () => {
  const { user } = useUser();

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 12, mb: 4, flex: 1 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
              <Avatar
                sx={{
                  width: 150,
                  height: 150,
                  margin: '0 auto',
                  bgcolor: 'primary.main',
                  fontSize: '4rem'
                }}
              >
                {user?.username?.[0]?.toUpperCase()}
              </Avatar>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h4" gutterBottom>
                Profile Information
              </Typography>
              <Typography variant="h6" gutterBottom>
                Username: {user?.username}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Email: {user?.email}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Container>
      <Footer />
    </Box>
  );
};

export default ProfilePage; 