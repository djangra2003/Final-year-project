"use client";

import React, { useState } from "react";
import { Box, Typography, IconButton, Link as RouterLink } from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowRight } from "@mui/icons-material";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import HeroSection from "../Components/HeroSection";
import { Link } from "react-router-dom";

interface Subsection {
  id: string;
  title: string;
}

interface Section {
  id: string;
  title: string;
  subsections?: Subsection[];
}

const sections: Section[] = [
  {
    id: "blue-flag",
    title: "Blue Flag beaches",
    subsections: [
      { id: "odisha", title: "Odisha" },
      { id: "andhra-pradesh", title: "Andhra Pradesh" },
      { id: "tamil-nadu", title: "Tamil Nadu" },
      { id: "puducherry", title: "Puducherry" },
      { id: "andaman-and-nicobar", title: "Andaman and Nicobar" },
      { id: "lakshadweep", title: "Lakshadweep" },
      { id: "kerala", title: "Kerala" },
      { id: "karnataka", title: "Karnataka" },
      { id: "diu-and-daman", title: "Diu and Daman" },
    ],
  },
  {
    id: "west-coast",
    title: "West coast",
    subsections: [
      { id: "gujarat", title: "Gujarat" },
      { id: "maharashtra", title: "Maharashtra" },
      { id: "goa", title: "Goa" },
      { id: "karnataka", title: "Karnataka" },
      { id: "kerala", title: "Kerala" },
    ],
  },
  {
    id: "east-coast",
    title: "East coast",
    subsections: [
      { id: "west-bengal", title: "West Bengal" },
      { id: "odisha", title: "Odisha" },
      { id: "andhra-pradesh", title: "Andhra Pradesh" },
      { id: "tamil-nadu", title: "Tamil Nadu" },
      { id: "pondicherry", title: "Pondicherry" },
    ],
  },
  {
    id: "island-territories",
    title: "Island Territories",
    subsections: [
      { id: "andaman-nicobar", title: "Andaman and Nicobar Islands" },
      { id: "lakshadweep", title: "Lakshadweep" },
    ],
  },
];

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
        <Box
          className="w-64 h-screen overflow-y-auto border-r border-gray-200 bg-white p-4 shadow-md"
          style={{ position: "sticky", top: "0px" }} // Sidebar starts after HeroSection
        >
          <Box className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200">
            <Typography variant="h6" className="font-bold text-gray-800">
              Contents
            </Typography>
            <button onClick={() => setContentVisible(!contentVisible)} className="text-blue-600 text-sm hover:underline">
              {contentVisible ? "hide" : "show"}
            </button>
          </Box>

          {contentVisible && (
            <Box className="space-y-2">
              {sections.map((section) => (
                <Box key={section.id}>
                  <Box
                    className="flex items-center hover:bg-gray-100 rounded px-3 py-2 cursor-pointer transition-colors"
                    onClick={() => (section.subsections ? toggleSection(section.id) : scrollToSection(section.id))}
                  >
                    {section.subsections && (
                      <IconButton size="small" className="p-0 mr-2">
                        {expandedSections.includes(section.id) ? (
                          <KeyboardArrowDown fontSize="small" />
                        ) : (
                          <KeyboardArrowRight fontSize="small" />
                        )}
                      </IconButton>
                    )}
                    <Typography className="text-blue-600 hover:underline text-sm">
                      {section.title}
                    </Typography>
                  </Box>
                  {section.subsections && expandedSections.includes(section.id) && (
                    <Box className="ml-6 space-y-1">
                      {section.subsections.map((subsection) => (
                        <Box
                          key={subsection.id}
                          onClick={() => scrollToSection(subsection.id)}
                          className="flex items-center hover:bg-gray-100 rounded px-3 py-2 cursor-pointer transition-colors"
                        >
                          <Typography className="text-blue-600 hover:underline text-sm">{subsection.title}</Typography>
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
          <Typography variant="h4" id="blue-flag" className="mb-6 text-gray-800">
            Blue Flag Beaches in India
          </Typography>

          {/* Odisha */}
          <Box id="odisha" className="mb-6">
            <Typography variant="h5" className="mb-2 text-gray-700">
              Odisha
            </Typography>
            <Box className="flex flex-col md:flex-row md:space-x-4">
              <Box className="bg-blue-100 p-2 rounded mb-2 md:mb-0 md:w-1/2">
                <Link to="/beaches/puri" className="text-gray-600 hover:underline">
                  Puri Beach
                </Link>
              </Box>
              <Box className="bg-blue-100 p-2 rounded mb-2 md:mb-0 md:w-1/2">
                <Link to="/beaches/pati-sonepur" className="text-gray-600 hover:underline">
                  Pati Sonepur Sea Beach
                </Link>
              </Box>
            </Box>
          </Box>

          {/* Andhra Pradesh */}
          <Box id="andhra-pradesh" className="mb-6">
            <Typography variant="h5" className="mb-2 text-gray-700">
              Andhra Pradesh
            </Typography>
            <Box className="bg-blue-100 p-2 rounded">
              <Link to="/beaches/rushikonda" className="text-gray-600 hover:underline">
                Rushikonda Beach
              </Link>
            </Box>
          </Box>

          {/* Tamil Nadu */}
          <Box id="tamil-nadu" className="mb-6">
            <Typography variant="h5" className="mb-2 text-gray-700">
              Tamil Nadu
            </Typography>
            <Box className="bg-blue-100 p-2 rounded">
              <Link to="/beaches/kovalam" className="text-gray-600 hover:underline">
                Kovalam Beach
              </Link>
            </Box>
          </Box>

          {/* Puducherry */}
          <Box id="puducherry" className="mb-6">
            <Typography variant="h5" className="mb-2 text-gray-700">
              Puducherry
            </Typography>
            <Box className="bg-blue-100 p-2 rounded">
              <Link to="/beaches/eden" className="text-gray-600 hover:underline">
                Eden Beach
              </Link>
            </Box>
          </Box>

          {/* Andaman and Nicobar */}
          <Box id="andaman-and-nicobar" className="mb-6">
            <Typography variant="h5" className="mb-2 text-gray-700">
              Andaman and Nicobar
            </Typography>
            <Box className="bg-blue-100 p-2 rounded">
              <Link to="/beaches/radhanagar" className="text-gray-600 hover:underline">
                Radhanagar Beach
              </Link>
            </Box>
          </Box>

          {/* Lakshadweep */}
          <Box id="lakshadweep" className="mb-6">
            <Typography variant="h5" className="mb-2 text-gray-700">
              Lakshadweep
            </Typography>
            <Box className="flex flex-col md:flex-row md:space-x-4">
              <Box className="bg-blue-100 p-2 rounded mb-2 md:mb-0 md:w-1/2">
                <Link to="/beaches/minicoy-thundi" className="text-gray-600 hover:underline">
                  Minicoy Thundi Beach
                </Link>
              </Box>
              <Box className="bg-blue-100 p-2 rounded mb-2 md:mb-0 md:w-1/2">
                <Link to="/beaches/kadmat" className="text-gray-600 hover:underline">
                  Kadmat Beach
                </Link>
              </Box>
            </Box>
          </Box>

          {/* Kerala */}
          <Box id="kerala" className="mb-6">
            <Typography variant="h5" className="mb-2 text-gray-700">
              Kerala
            </Typography>
            <Box className="bg-blue-100 p-2 rounded">
              <Link to="/beaches/kappad" className="text-gray-600 hover:underline">
                Kappad Beach
              </Link>
            </Box>
          </Box>

          {/* Karnataka */}
          <Box id="karnataka" className="mb-6">
            <Typography variant="h5" className="mb-2 text-gray-700">
              Karnataka
            </Typography>
            <Box className="flex flex-col md:flex-row md:space-x-4">
              <Box className="bg-blue-100 p-2 rounded mb-2 md:mb-0 md:w-1/2">
                <Link to="/beaches/kasarkod" className="text-gray-600 hover:underline">
                  Kasarkod Beach
                </Link>
              </Box>
              <Box className="bg-blue-100 p-2 rounded mb-2 md:mb-0 md:w-1/2">
                <Link to="/beaches/padubidri" className="text-gray-600 hover:underline">
                  Padubidri Beach
                </Link>
              </Box>
            </Box>
          </Box>

          {/* Diu and Daman */}
          <Box id="diu-and-daman" className="mb-6">
            <Typography variant="h5" className="mb-2 text-gray-700">
              Diu and Daman
            </Typography>
            <Box className="bg-blue-100 p-2 rounded">
              <Link to="/beaches/ghoghla" className="text-gray-600 hover:underline">
                Ghoghla Beach
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>

      <Footer />
    </div>
  );
};

export default BeachWiki;
