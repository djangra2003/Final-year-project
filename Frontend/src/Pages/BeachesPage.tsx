"use client";

import { KeyboardArrowDown, KeyboardArrowRight } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import HeroSection from "../Components/HeroSection";
import beachesData from "./name.json";

const BeachWiki: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<string[]>(["west-coast"]);
  const [contentVisible, setContentVisible] = useState<boolean>(true);

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

  return (
    <div>
      <Header />
      <HeroSection title="Beaches" subtitle="Discover the Best Beaches in India" />

      {/* Main Wrapper */}
      <Box className="flex min-h-screen bg-gray-50 relative">
        {/* Left Sidebar (Sticky below HeroSection) */}
        <Box className="w-64 bg-white shadow-md p-4 sticky top-0 h-screen overflow-y-auto">
          <Typography variant="h6" className="mb-4 text-gray-800">
            Quick Navigation
          </Typography>
          {contentVisible && (
            <Box className="space-y-2">
              {Object.keys(beachesData).map((sectionId) => (
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
                      {sectionId.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}
                    </Typography>
                  </Box>
                  {expandedSections.includes(sectionId) && (
                    <Box className="ml-6 space-y-1">
                      {Object.keys(beachesData[sectionId]).map((subsectionId) => (
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
          )}
        </Box>

        {/* Main Content */}
        <Box className="ml-4 p-8 flex-grow bg-white shadow-inner">
          {Object.keys(beachesData).map((sectionId) => (
            <React.Fragment key={sectionId}>
              <Typography variant="h4" id={sectionId} className="mb-6 text-gray-800">
                {sectionId.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}
              </Typography>
              {Object.keys(beachesData[sectionId]).map((subsectionId) => (
                <Box id={subsectionId} className="mb-6" key={subsectionId}>
                  <Typography variant="h5" className="mb-2 text-gray-700">
                    {subsectionId}
                  </Typography>
                  <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {beachesData[sectionId][subsectionId].map((beach: string) => (
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
          ))}
        </Box>
      </Box>
      <Footer />
    </div>
  );
};

export default BeachWiki;
