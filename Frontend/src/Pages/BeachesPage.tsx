"use client";

import { KeyboardArrowDown, KeyboardArrowRight, Search } from "@mui/icons-material";
import { Box, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
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
  const [expandedSections, setExpandedSections] = useState<string[]>(["west-coast"]);
  const [searchQuery, setSearchQuery] = useState<string>("");

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
    <div>
      <Header />
      <HeroSection title="Beaches" subtitle="Discover the Best Beaches in India" />

      {/* Search Bar */}
      <Box className="p-4 bg-white shadow-md">
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
      <Box className="flex min-h-screen bg-gray-50 relative">
        {/* Left Sidebar (Sticky below HeroSection) */}
        <Box className="w-64 bg-white shadow-md p-4 sticky top-0 h-screen overflow-y-auto">
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
        <Box className="ml-4 p-8 flex-grow bg-white shadow-inner">
          {searchQuery.trim() ? (
            // Search Results View
            <Box>
              <Typography variant="h4" className="mb-6 text-gray-800">
                Search Results
              </Typography>
              <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredBeaches?.map((beach) => (
                  <Box key={beach.name} className="bg-blue-100 p-4 rounded">
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
                        <Box key={beach} className="bg-blue-100 p-2 rounded">
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
    </div>
  );
};

export default BeachWiki;
