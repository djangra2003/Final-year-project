"use client";

import { KeyboardArrowDown, KeyboardArrowRight, Search } from "@mui/icons-material";
import { Box, IconButton, InputAdornment, TextField, Tooltip, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import beachDetails from "../Components/beaches.json";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import HeroSection from "../Components/HeroSection";
import beachesData from "./name.json";

// Define interfaces for our data structure
interface BeachData {
  [key: string]: {
    [key: string]: string[];
  };
}

interface Beach {
  name: string;
  section: string;
  subsection: string;
}

const BeachWiki: React.FC = () => {
  const theme = useTheme();
  const [expandedSections, setExpandedSections] = useState<string[]>(["west-coast"]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05  }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId]
    );
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Function to get all beaches from all sections
  const getAllBeaches = (): Beach[] => {
    const allBeaches: Beach[] = [];
    
    Object.entries(beachesData as BeachData).forEach(([section, subsections]) => {
      Object.entries(subsections).forEach(([subsection, beaches]) => {
        beaches.forEach(beach => {
          allBeaches.push({ name: beach, section, subsection });
        });
      });
    });
    
    return allBeaches;
  };

  // Filter beaches based on search query
  const filteredBeaches = useMemo(() => {
    if (!searchQuery.trim()) return null;
    
    const query = searchQuery.toLowerCase();
    const allBeaches = getAllBeaches();
    
    return allBeaches.filter(beach => 
      beach.name.toLowerCase().includes(query) ||
      beach.section.toLowerCase().includes(query) ||
      beach.subsection.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // Function to format section name for display
  const formatSectionName = (name: string): string => {
    return name.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
  };

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.1) 100%)",
          pointerEvents: "none"
        }
      }}>
      <Header />
      <HeroSection title="Beaches" subtitle="Discover the Best Beaches in India" />

      {/* Search Bar */}
      <Box
        component={motion.div}
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        sx={{
          p: { xs: 2, sm: 3, md: 4 },
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(10px)",
          borderRadius: 2,
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
          border: "1px solid rgba(255,255,255,0.3)",
          mx: { xs: 2, sm: 3, md: 4 },
          mb: { xs: 2, sm: 3 }
        }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search beaches by name, region, or state..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              fontSize: { xs: '0.9rem', sm: '1rem' }
            }
          }}
        />
      </Box>

      {/* Main Wrapper */}
      <Box className="flex min-h-screen relative" sx={{ 
        flexDirection: { xs: 'column', sm: 'row' },
        gap: { xs: 2, sm: 3 }
      }}>
        {/* Left Sidebar */}
        <Box
          component={motion.div}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          sx={{
            width: { xs: '100%', sm: 256 },
            background: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(10px)",
            borderRadius: 2,
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            border: "1px solid rgba(255,255,255,0.3)",
            p: { xs: 2, sm: 3 },
            position: { xs: 'relative', sm: 'sticky' },
            top: { xs: 0, sm: 0 },
            height: { xs: 'auto', sm: '100vh' },
            overflowY: { xs: 'visible', sm: 'auto' },
            m: { xs: 2, sm: 2 },
            mb: { xs: 2, sm: 2 }
          }}>
          <Typography 
            variant="h6" 
            className="mb-4 text-gray-800"
            sx={{ 
              fontSize: { xs: '1.1rem', sm: '1.25rem' },
              textAlign: { xs: 'center', sm: 'left' }
            }}
          >
            Quick Navigation
          </Typography>
          <Box className="space-y-2">
            {Object.keys(beachesData as BeachData).map((sectionId) => (
              <Box key={sectionId}>
                <Box
                  className="flex items-center hover:bg-gray-100 rounded px-3 py-2 cursor-pointer transition-colors"
                  onClick={() => toggleSection(sectionId)}
                  sx={{
                    justifyContent: { xs: 'center', sm: 'flex-start' }
                  }}
                >
                  <IconButton size="small" className="p-0 mr-2">
                    {expandedSections.includes(sectionId) ? (
                      <KeyboardArrowDown fontSize="small" />
                    ) : (
                      <KeyboardArrowRight fontSize="small" />
                    )}
                  </IconButton>
                  <Typography 
                    className="text-blue-600 hover:underline text-sm"
                    sx={{
                      fontSize: { xs: '0.9rem', sm: '0.875rem' }
                    }}
                  >
                    {formatSectionName(sectionId)}
                  </Typography>
                </Box>
                {expandedSections.includes(sectionId) && (
                  <Box 
                    className="ml-6 space-y-1"
                    sx={{
                      ml: { xs: 2, sm: 6 }
                    }}
                  >
                    {Object.keys((beachesData as BeachData)[sectionId]).map((subsectionId) => (
                      <Box
                        key={subsectionId}
                        onClick={() => scrollToSection(subsectionId)}
                        className="flex items-center hover:bg-gray-100 rounded px-3 py-2 cursor-pointer transition-colors"
                        sx={{
                          justifyContent: { xs: 'center', sm: 'flex-start' }
                        }}
                      >
                        <Typography 
                          className="text-blue-600 hover:underline text-sm"
                          sx={{
                            fontSize: { xs: '0.85rem', sm: '0.875rem' }
                          }}
                        >
                          {subsectionId}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        </Box>

        {/* Main Content */}
        <Box
          component={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          sx={{
            ml: { xs: 0, sm: 4 },
            p: { xs: 2, sm: 3, md: 4 },
            flexGrow: 1,
            background: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(10px)",
            borderRadius: 2,
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            border: "1px solid rgba(255,255,255,0.3)",
            m: { xs: 2, sm: 2 }
          }}>
          {searchQuery.trim() ? (
            // Search Results View
            <Box>
              <Typography 
                variant="h4" 
                className="mb-6 text-gray-800"
                sx={{ 
                  fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' },
                  textAlign: { xs: 'center', sm: 'left' }
                }}
              >
                Search Results
              </Typography>
              <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredBeaches?.map((beach) => (
                  <Box
                    component={motion.div}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    key={beach.name}
                    sx={{
                      p: { xs: 2, sm: 3, md: 4 },
                      borderRadius: 2,
                      background: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
                      boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        boxShadow: "0 8px 32px rgba(0,0,0,0.15)"
                      }
                    }}>
                    <Link 
                      to={`/beaches/${beach.name.replace(/\s+/g, '')}`} 
                      className="text-gray-600 hover:underline block"
                    >
                      <Typography 
                        variant="h6"
                        sx={{ 
                          fontSize: { xs: '1.1rem', sm: '1.25rem' }
                        }}
                      >
                        {beach.name}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ 
                          fontSize: { xs: '0.8rem', sm: '0.875rem' }
                        }}
                      >
                        {formatSectionName(beach.section)} • {beach.subsection}
                      </Typography>
                    </Link>
                  </Box>
                ))}
              </Box>
            </Box>
          ) : (
            // Regular View
            Object.keys(beachesData as BeachData).map((sectionId) => (
              <React.Fragment key={sectionId}>
                <Typography 
                  variant="h4" 
                  id={sectionId} 
                  className="mb-6 text-gray-800"
                  sx={{ 
                    fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' },
                    textAlign: { xs: 'center', sm: 'left' }
                  }}
                >
                  {formatSectionName(sectionId)}
                </Typography>
                {Object.keys((beachesData as BeachData)[sectionId]).map((subsectionId) => (
                  <Box id={subsectionId} className="mb-6" key={subsectionId}>
                    <Typography 
                      variant="h5" 
                      className="mb-2 text-gray-700"
                      sx={{ 
                        fontSize: { xs: '1.25rem', sm: '1.5rem' },
                        textAlign: { xs: 'center', sm: 'left' }
                      }}
                    >
                      {subsectionId}
                    </Typography>
                    <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {(beachesData as BeachData)[sectionId][subsectionId].map((beach: string) => {
                        const beachInfo = (beachDetails as any)[beach];
                        const tooltipContent = beachInfo ? (
                          <Box sx={{ p: 1, maxWidth: 300 }}>
                            <Typography 
                              variant="subtitle2" 
                              sx={{ 
                                fontWeight: 'bold', 
                                mb: 0.5,
                                fontSize: { xs: '0.9rem', sm: '1rem' }
                              }}
                            >
                              {beach}
                            </Typography>
                            <Typography 
                              variant="body2"
                              sx={{ 
                                fontSize: { xs: '0.8rem', sm: '0.875rem' }
                              }}
                            >
                              {beachInfo.description}
                            </Typography>
                            {beachInfo.bestTimeToVisit && (
                              <Typography 
                                variant="caption" 
                                display="block" 
                                sx={{ 
                                  mt: 0.5,
                                  fontSize: { xs: '0.7rem', sm: '0.75rem' }
                                }}
                              >
                                Best Time: {beachInfo.bestTimeToVisit}
                              </Typography>
                            )}
                          </Box>
                        ) : beach;
                        
                        return (
                          <Tooltip
                            key={beach}
                            title={tooltipContent}
                            placement="right"
                            arrow
                          >
                            <Box
                              component={motion.div}
                              variants={itemVariants}
                              whileHover={{ scale: 1.02 }}
                              sx={{
                                p: { xs: 2, sm: 3 },
                                borderRadius: 2,
                                background: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
                                boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                  boxShadow: "0 8px 32px rgba(0,0,0,0.15)"
                                }
                              }}
                            >
                              <Link 
                                to={`/beaches/${beach.replace(/\s+/g, '')}`} 
                                className="text-gray-600 hover:underline"
                              >
                                <Typography 
                                  sx={{ 
                                    fontSize: { xs: '1rem', sm: '1.1rem' }
                                  }}
                                >
                                  {beach}
                                </Typography>
                              </Link>
                            </Box>
                          </Tooltip>
                        );
                      })}
                    </Box>
                  </Box>
                ))}
              </React.Fragment>
            ))
          )}
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default BeachWiki;
