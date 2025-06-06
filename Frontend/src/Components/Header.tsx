import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Box,
  Button,
  CardMedia,
  IconButton,
  Toolbar,
  Typography,
  useScrollTrigger
} from '@mui/material';
import { keyframes } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useUser } from '../context/UserContext';
import UserMenu from './UserMenu';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideIn = keyframes`
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

interface ElevationScrollProps {
  children: React.ReactElement;
  window?: () => Window;
}

const ElevationScroll: React.FC<ElevationScrollProps> = (props) => {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
    style: {
      backgroundColor: trigger ? 'rgba(0, 0, 0, 0.8)' : 'transparent',
      transition: 'background-color 0.3s ease-in-out'
    }
  });
};

const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated, checkAuth } = useUser();
  const location = useLocation();
  const isLoginOrSignupPage = ['/login', '/signup', '/forgot-password', '/profile'].includes(location.pathname);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      await checkAuth();
      setMounted(true);
    };
    initAuth();
  }, [checkAuth]);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  if (!mounted) return null;

  return (
    <ElevationScroll>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 'none',
          top: 0,
          zIndex: 10,
          animation: `${fadeIn} 1s ease-in-out`,
          color: isLoginOrSignupPage ? 'black' : 'white',
          transition: 'all 0.3s ease-in-out'
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: { xs: 2, sm: 4 },
            flexWrap: 'wrap'
          }}
        >
          <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit', marginRight: 'auto' }}>
              <CardMedia
                component="img"
                alt="Logo"
                height="100%"
                image={logo}
                sx={{
                  width: "auto",
                  height: "60px",
                  objectFit: "contain",
                  padding: "8px 0",
                  '&:hover': {
                    animation: `${pulse} 1s infinite`,
                    cursor: 'pointer'
                  }
                }}
              />
              <Typography variant="h6" component="div" sx={{ 
                ml: 1, 
                fontWeight: 'bold', 
                fontFamily: "'Montserrat', sans-serif",
                '&:hover': { 
                  color: isLoginOrSignupPage ? '#ff6f61' : '#ff6f61',
                  animation: `${pulse} 1s infinite`
                } 
              }}>
                Beach Buddy
              </Typography>
            </Link>

          <Box sx={{ display: { xs: 'block', md: 'none' } }}>
            <IconButton
              color="inherit"
              onClick={() => setMobileOpen(!mobileOpen)}
              sx={{
                '&:hover': {
                  backgroundColor: isLoginOrSignupPage ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)',
                  transition: 'background-color 0.3s ease-in-out'
                }
              }}
            >
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          </Box>

          <Box
            sx={{
              display: { xs: mobileOpen ? 'flex' : 'none', md: 'flex' },
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              width: { xs: '100%', md: 'auto' },
              mt: { xs: 2, md: 0 },
              backgroundColor: { xs: isLoginOrSignupPage ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)', md: 'transparent' },
              padding: { xs: 2, md: 0 },
              borderRadius: { xs: 2, md: 0 },
              animation: mobileOpen ? `${slideIn} 0.5s ease-in-out` : 'none'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                gap: { xs: 2, md: 1 },
                position: { md: 'absolute' },
                left: { md: '50%' },
                transform: { md: 'translateX(-50%)' },
                zIndex: 1,
                mb: { xs: 2, md: 0 },
                '& > *': {
                  animation: `${fadeIn} 0.5s ease-in-out`
                }
              }}
            >
              <Link to="/">
                <Button
                  color="inherit"
                  sx={{
                    fontFamily: "'Montserrat', sans-serif",
                    '&:hover': {
                      color: isLoginOrSignupPage ? '#ff6f61' : '#ff6f61',
                      backgroundColor: isLoginOrSignupPage ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)',
                      transition: 'all 0.3s ease-in-out',
                    },
                  }}
                >
                  Home
                </Button>
              </Link>
              <Link to="/beaches">
                <Button
                  color="inherit"
                  sx={{
                    fontFamily: "'Montserrat', sans-serif",
                    '&:hover': {
                      color: isLoginOrSignupPage ? '#ff6f61' : '#ff6f61',
                      backgroundColor: isLoginOrSignupPage ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)',
                      transition: 'all 0.3s ease-in-out',
                    },
                  }}
                >
                  
                  Beaches
                </Button>
              </Link>
              <Link to="/about">
                <Button
                  color="inherit"
                  sx={{
                    fontFamily: "'Montserrat', sans-serif",
                    '&:hover': {
                      color: isLoginOrSignupPage ? '#ff6f61' : '#ff6f61',
                      backgroundColor: isLoginOrSignupPage ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)',
                      transition: 'all 0.3s ease-in-out',
                    },
                  }}
                >
                  About Us
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  color="inherit"
                  sx={{
                    fontFamily: "'Montserrat', sans-serif",
                    '&:hover': {
                      color: isLoginOrSignupPage ? '#ff6f61' : '#ff6f61',
                      backgroundColor: isLoginOrSignupPage ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)',
                      transition: 'all 0.3s ease-in-out',
                    },
                  }}
                >
                  Contact Us
                </Button>
              </Link>
              <Link to="/wishlist">
                <Button
                  color="inherit"
                  sx={{
                    fontFamily: "'Montserrat', sans-serif",
                    '&:hover': {
                      color: isLoginOrSignupPage ? '#ff6f61' : '#ff6f61',
                      backgroundColor: isLoginOrSignupPage ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)',
                      transition: 'all 0.3s ease-in-out',
                    },
                  }}
                >
                  Favourites
                </Button>
              </Link>
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                gap: 2,
                ml: { md: 'auto' }
              }}
            >
              {isAuthenticated ? (
                <UserMenu key="user-menu" />
              ) : (
                <>
                  <Link to="/signup">
                    <Button
                      variant="outlined"
                      sx={authBtnStyle(isLoginOrSignupPage)}
                    >
                      Sign Up
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button
                      variant="outlined"
                      sx={authBtnStyle(isLoginOrSignupPage)}
                    >
                      Login
                    </Button>
                  </Link>
                </>
              )}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </ElevationScroll>
  );
};

const navBtnStyle = (isLight: boolean) => ({
  '&:hover': {
    color: '#ff6f61',
    backgroundColor: isLight ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)',
    transition: 'all 0.3s ease-in-out'
  }
});

const authBtnStyle = (isLight: boolean) => ({
  color: isLight ? 'black' : 'white',
  borderColor: isLight ? 'black' : 'white',
  width: { xs: '100%', md: 'auto' },
  '&:hover': {
    color: '#ff6f61',
    borderColor: '#ff6f61',
    transition: 'all 0.3s ease-in-out'
  }
});

export default Header;
