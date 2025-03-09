import { Avatar, Box, Button, Container, Grid, Paper, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import { useUser } from '../context/UserContext';

const ProfilePage: React.FC = () => {
  const { user, setUser } = useUser();
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState<File | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setProfileImage(event.target.files[0]);
    }
  };

  const handleSaveChanges = async () => {
    // Here you would typically send the updated data to your backend
    // For example, using fetch or axios to update the user profile
    const updatedUser = { username, email }; // Add more fields as needed

    // Simulate saving changes
    console.log('Saving changes:', updatedUser);
    // If you have an API endpoint, you can call it here
    // await fetch('/api/user/update', { method: 'POST', body: JSON.stringify(updatedUser) });

    // Update user context
    setUser(updatedUser);
    alert('Profile updated successfully!');
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 12, mb: 4, flex: 1 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
              <Avatar
                src={profileImage ? URL.createObjectURL(profileImage) : ''}
                sx={{
                  width: 150,
                  height: 150,
                  margin: '0 auto',
                  bgcolor: 'primary.main',
                  fontSize: '4rem'
                }}
              >
                {username[0]?.toUpperCase()}
              </Avatar>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="profile-image-upload"
                type="file"
                onChange={handleImageChange}
              />
              <label htmlFor="profile-image-upload">
                <Button variant="contained" component="span" sx={{ mt: 2 }}>
                  Upload Image
                </Button>
              </label>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h4" gutterBottom>
                Profile Information
              </Typography>
              <TextField
                fullWidth
                margin="normal"
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled
              />
              <TextField
                fullWidth
                margin="normal"
                label="New Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSaveChanges}
                sx={{ mt: 2 }}
              >
                Save Changes
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
      <Footer />
    </Box>
  );
};

export default ProfilePage; 