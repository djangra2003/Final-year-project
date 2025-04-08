"use client";

import { KeyboardArrowDown, KeyboardArrowRight, Search, WavesOutlined } from "@mui/icons-material";
import { Box, IconButton, InputAdornment, TextField, Typography, useTheme } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
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
      transition: { staggerChildren: 0.1 }
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
          p: 4,
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(10px)",
          borderRadius: 2,
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
          border: "1px solid rgba(255,255,255,0.3)",
          mx: 4
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
        />
      </Box>

      {/* Main Wrapper */}
      <Box className="flex min-h-screen relative">
        {/* Left Sidebar (Sticky below HeroSection) */}
        <Box
          component={motion.div}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          sx={{
            width: 256,
            background: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(10px)",
            borderRadius: 2,
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            border: "1px solid rgba(255,255,255,0.3)",
            p: 4,
            position: "sticky",
            top: 0,
            height: "100vh",
            overflowY: "auto",
            m: 2
          }}>
          <Typography variant="h6" className="mb-4 text-gray-800">
            Quick Navigation
          </Typography>
          <Box className="space-y-2">
            {Object.keys(beachesData as BeachData).map((sectionId) => (
              <Box key={sectionId}>
                <Box
                  className="flex items-center hover:bg-gray-100 rounded px-3 py-2 cursor-pointer transition-colors"
                  onClick={() => toggleSection(sectionId)}
                >
                  <IconButton size="small" className="p-0 mr-2">
                    {expandedSections.includes(sectionId) ? (
                      <KeyboardArrowDown fontSize="small" />
                    ) : (
                      <KeyboardArrowRight fontSize="small" />
                    )}
                  </IconButton>
                  <Typography className="text-blue-600 hover:underline text-sm">
                    {formatSectionName(sectionId)}
                  </Typography>
                </Box>
                {expandedSections.includes(sectionId) && (
                  <Box className="ml-6 space-y-1">
                    {Object.keys((beachesData as BeachData)[sectionId]).map((subsectionId) => (
                      <Box
                        key={subsectionId}
                        onClick={() => scrollToSection(subsectionId)}
                        className="flex items-center hover:bg-gray-100 rounded px-3 py-2 cursor-pointer transition-colors"
                      >
                        <Typography className="text-blue-600 hover:underline text-sm">
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
            ml: 4,
            p: 8,
            flexGrow: 1,
            background: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(10px)",
            borderRadius: 2,
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            border: "1px solid rgba(255,255,255,0.3)",
            m: 2
          }}>
          {searchQuery.trim() ? (
            // Search Results View
            <Box>
              <Typography variant="h4" className="mb-6 text-gray-800">
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
                      p: 4,
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
                      <Typography variant="h6">{beach.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
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
                <Typography variant="h4" id={sectionId} className="mb-6 text-gray-800">
                  {formatSectionName(sectionId)}
                </Typography>
                {Object.keys((beachesData as BeachData)[sectionId]).map((subsectionId) => (
                  <Box id={subsectionId} className="mb-6" key={subsectionId}>
                    <Typography variant="h5" className="mb-2 text-gray-700">
                      {subsectionId}
                    </Typography>
                    <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {(beachesData as BeachData)[sectionId][subsectionId].map((beach: string) => (
                        <Box
                          component={motion.div}
                          variants={itemVariants}
                          whileHover={{ scale: 1.02 }}
                          key={beach}
                          sx={{
                            p: 2,
                            borderRadius: 2,
                            background: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
                            boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              boxShadow: "0 8px 32px rgba(0,0,0,0.15)"
                            }
                          }}>
                          <Link to={`/beaches/${beach.replace(/\s+/g, '')}`} className="text-gray-600 hover:underline">
                            {beach}
                          </Link>
                        </Box>
                      ))}
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
