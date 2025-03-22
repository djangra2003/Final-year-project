import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, Button, IconButton, Toolbar, Typography, useScrollTrigger } from "@mui/material";
import { keyframes } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { useUser } from '../context/UserContext';
import UserMenu from './UserMenu';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
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
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
    style: {
      backgroundColor: trigger ? 'rgba(0, 0, 0, 0.8)' : 'transparent',
      transition: 'background-color 0.3s ease-in-out',
    },
  });
};

const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated, checkAuth } = useUser();
  const location = useLocation();
  const isLoginOrSignupPage = location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/forgot-password' || location.pathname === '/profile' 
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

  if (!mounted) {
    return null;
  }

  return (
    <ElevationScroll>
      <AppBar
        position="fixed"
        id="app-bar"
        sx={{
          boxShadow: "none",
          top: 0,
          zIndex: 10,
          animation: `${fadeIn} 1s ease-in-out`,
          color: isLoginOrSignupPage ? 'black' : 'white',
          transition: 'all 0.3s ease-in-out',
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: { xs: 2, sm: 4 },
            flexWrap: "wrap",
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{
              textShadow: isLoginOrSignupPage ? "none" : "0 2px 4px rgba(0,0,0,0.3)",
              fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
              animation: `${pulse} 2s infinite`,
              '&:hover': {
                color: isLoginOrSignupPage ? '#ff6f61' : '#ff6f61',
                transition: 'color 0.3s ease-in-out',
              },
            }}
          >
            Beach Buddy
          </Typography>

          <Box sx={{ display: { xs: "block", md: "none" } }}>
            <IconButton
              color="inherit"
              onClick={() => setMobileOpen(!mobileOpen)}
              sx={{
                '&:hover': {
                  backgroundColor: isLoginOrSignupPage ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)',
                  transition: 'background-color 0.3s ease-in-out',
                },
              }}
            >
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          </Box>

          <Box
            sx={{
              display: { xs: mobileOpen ? "flex" : "none", md: "flex" },
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              width: { xs: "100%", md: "auto" },
              mt: { xs: 2, md: 0 },
              backgroundColor: { xs: isLoginOrSignupPage ? "rgba(255, 255, 255, 0.9)" : "rgba(0, 0, 0, 0.9)", md: "transparent" },
              padding: { xs: 2, md: 0 },
              borderRadius: { xs: 2, md: 0 },
              animation: mobileOpen ? `${slideIn} 0.5s ease-in-out` : 'none',
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: { xs: 2, md: 1 },
                position: { md: "absolute" },
                left: { md: "50%" },
                transform: { md: "translateX(-50%)" },
                zIndex: 1,
                mb: { xs: 2, md: 0 },
              }}
            >
              <Link to="/">
                <Button
                  color="inherit"
                  sx={{
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
              <Link to="/activities">
                <Button
                  color="inherit"
                  sx={{
                    '&:hover': {
                      color: isLoginOrSignupPage ? '#ff6f61' : '#ff6f61',
                      backgroundColor: isLoginOrSignupPage ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)',
                      transition: 'all 0.3s ease-in-out',
                    },
                  }}
                >
                  Activities
                </Button>
              </Link>
              <Link to="/about">
                <Button
                  color="inherit"
                  sx={{
                    '&:hover': {
                      color: isLoginOrSignupPage ? '#ff6f61' : '#ff6f61',
                      backgroundColor: isLoginOrSignupPage ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)',
                      transition: 'all 0.3s ease-in-out',
                    },
                  }}
                >
                  About
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  color="inherit"
                  sx={{
                    '&:hover': {
                      color: isLoginOrSignupPage ? '#ff6f61' : '#ff6f61',
                      backgroundColor: isLoginOrSignupPage ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)',
                      transition: 'all 0.3s ease-in-out',
                    },
                  }}
                >
                  Contact
                </Button>
              </Link>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 2,
                ml: { md: 'auto' },
              }}
            >
              {isAuthenticated ? (
                <UserMenu key="user-menu" />
              ) : (
                <>
                  <Link to="/signup">
                    <Button
                      variant="outlined"
                      sx={{
                        color: isLoginOrSignupPage ? "black" : "white",
                        borderColor: isLoginOrSignupPage ? "black" : "white",
                        width: { xs: "100%", md: "auto" },
                        '&:hover': {
                          color: '#ff6f61',
                          borderColor: '#ff6f61',
                          transition: 'all 0.3s ease-in-out',
                        },
                      }}
                    >
                      Sign Up
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button
                      variant="outlined"
                      sx={{
                        color: isLoginOrSignupPage ? "black" : "white",
                        borderColor: isLoginOrSignupPage ? "black" : "white",
                        width: { xs: "100%", md: "auto" },
                        '&:hover': {
                          color: '#ff6f61',
                          borderColor: '#ff6f61',
                          transition: 'all 0.3s ease-in-out',
                        },
                      }}
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

export default Header;
