import { Avatar, Box, Button, Container, Grid, Paper, TextField, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import { useUser } from '../context/UserContext';

const ProfilePage: React.FC = () => {
  const theme = useTheme();
  const { user, setUser } = useUser();
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState<File | null>(null);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setProfileImage(event.target.files[0]);
    }
  };

  const handleSaveChanges = async () => {
    const updatedUser = { username, email }; // Add more fields as needed
    console.log('Saving changes:', updatedUser);
    setUser(updatedUser);
    alert('Profile updated successfully!');
  };

  return (
    <Box 
      component={motion.div}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: theme.palette.background.default,
        background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)'
      }}
    >
      <Header />
      <Container maxWidth="md" sx={{ mt: 8, mb: 4, flex: 1 }}>
        <Paper 
          elevation={6} 
          component={motion.div}
          variants={itemVariants}
          sx={{ 
            p: 4, 
            borderRadius: 3,
            background: 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            border: '1px solid rgba(255,255,255,0.3)'
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', color: 'primary.main' }}>
            My Profile
          </Typography>
          <Typography variant="body1" sx={{ textAlign: 'center', color: 'text.secondary', mb: 4 }}>
            Manage your profile information and update your details.
          </Typography>
          <Grid container spacing={4}>
            {/* Profile Image Section */}
            <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
              <Avatar
                component={motion.div}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                src={profileImage ? URL.createObjectURL(profileImage) : ''}
                sx={{
                  width: 150,
                  height: 150,
                  margin: '0 auto',
                  bgcolor: theme.palette.primary.main,
                  fontSize: '4rem',
                  boxShadow: theme.shadows[3],
                  border: `4px solid ${theme.palette.primary.light}`,
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
                <Button
                  variant="contained"
                  component={motion.span}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  sx={{
                    mt: 2,
                    textTransform: 'none',
                    bgcolor: theme.palette.secondary.main,
                    '&:hover': {
                      bgcolor: theme.palette.secondary.dark,
                      boxShadow: theme.shadows[4]
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Upload Image
                </Button>
              </label>
            </Grid>

            {/* Profile Information Section */}
            <Grid item xs={12} md={8}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                Profile Information
              </Typography>
              <TextField
                fullWidth
                margin="normal"
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                variant="outlined"
                InputLabelProps={{ style: { color: 'text.secondary' } }}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled
                variant="outlined"
                InputLabelProps={{ style: { color: 'text.secondary' } }}
              />
              <TextField
                fullWidth
                margin="normal"
                label="New Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                InputLabelProps={{ style: { color: 'text.secondary' } }}
              />
              <Button
                component={motion.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                variant="contained"
                color="primary"
                onClick={handleSaveChanges}
                sx={{
                  mt: 3,
                  py: 1.5,
                  px: 4,
                  textTransform: 'none',
                  fontWeight: 'bold',
                  borderRadius: 2,
                  background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
                  boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                  '&:hover': {
                    background: `linear-gradient(45deg, ${theme.palette.primary.dark} 30%, ${theme.palette.primary.main} 90%)`,
                  }
                }}
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