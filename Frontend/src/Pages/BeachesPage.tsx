"use client";

import React, { useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowRight } from "@mui/icons-material";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import HeroSection from "../Components/HeroSection";

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
  { id: "blue-flag",
    title: "Blue Flag beaches",
    subsections: [
      { id: "gujrat", title: "Gujrat" },
      { id: "odisha", title: "Odisha" },
      { id: "andhra-pradesh", title: "Andhra Pradesh" },
      { id: "tamil-nadu", title: "Tamil Nadu" },
      { id: "puducherry", title: "Puducherry" },
      { id: "andaman-and-nicobar", title: "Andaman and Nicobar" },
      { id: "lakshadweep", title: "Lakshadweep" },
      { id: "kerela", title: "Kerela" },
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
  // { id: "see-also", title: "See also" },
  // { id: "references", title: "References" },
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
      <Box className="flex min-h-screen bg-white relative">
        {/* Left Sidebar (Sticky below HeroSection) */}
        <Box
          className="w-64 h-screen overflow-y-auto border-r border-gray-200 bg-white p-4"
          style={{ position: "sticky", top: "0px" }} // Sidebar starts after HeroSection
        >
          <Box className="flex items-center justify-between mb-2 pb-2 border-b border-gray-200">
            <Typography variant="subtitle1" className="font-bold">
              Contents
            </Typography>
            <button onClick={() => setContentVisible(!contentVisible)} className="text-blue-600 text-sm hover:underline">
              {contentVisible ? "hide" : "show"}
            </button>
          </Box>

          {contentVisible && (
            <Box className="space-y-1">
              {sections.map((section) => (
                <Box key={section.id}>
                  <Box
                    className="flex items-center hover:bg-gray-100 rounded px-2 py-1 cursor-pointer"
                    onClick={() => (section.subsections ? toggleSection(section.id) : scrollToSection(section.id))}
                  >
                    {section.subsections && (
                      <IconButton size="small" className="p-0 mr-1">
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
                    <Box className="ml-4">
                      {section.subsections.map((subsection) => (
                        <Box
                          key={subsection.id}
                          onClick={() => scrollToSection(subsection.id)}
                          className="flex items-center hover:bg-gray-100 rounded px-2 py-1 cursor-pointer"
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
        <Box className="ml-64 p-8 flex-grow">
        <Typography variant="h4" id="west-coast" className="mb-6">
            Blue Flag Beaches
          </Typography>

          <Typography variant="h5" id="gujarat" className="mb-4">
            Gujarat
          </Typography>

          <Typography className="mb-4">
            The blue flag beaches of
            <span className="text-blue-600 hover:underline cursor-pointer"> Gujarat </span> are:
          </Typography>

          <ul className="list-disc pl-8 space-y-2">
            <li><span className="text-blue-600 hover:underline cursor-pointer">Shivrajpur beach in Dwarka, at Shivrajpur village 12 km from Dwarka on Dwarka-Okha Highway.</span></li>
          </ul>
          <Typography variant="h5" id="gujarat" className="mb-4">
            Odisha
          </Typography>

          <Typography className="mb-4">
            The blue flag beaches of
            <span className="text-blue-600 hover:underline cursor-pointer"> Odisha </span> are:
          </Typography>

          <ul className="list-disc pl-8 space-y-2">
            <li><span className="text-blue-600 hover:underline cursor-pointer">Puri Beach or Puri beach in Puri</span></li>
            <li><span className="text-blue-600 hover:underline cursor-pointer">Pati Sonepur Sea Beach in Ganjam district</span></li>
          </ul>
          <Typography variant="h5" id="gujarat" className="mb-4">
            Andhra Pradesh
          </Typography>

          <Typography className="mb-4">
            The blue flag beaches of
            <span className="text-blue-600 hover:underline cursor-pointer"> Andhra Pradesh </span> are:
          </Typography>

          <ul className="list-disc pl-8 space-y-2">
            <li><span className="text-blue-600 hover:underline cursor-pointer">Rushikonda Beach in Visakhapatnam.</span></li>
          </ul>
          <Typography variant="h5" id="gujarat" className="mb-4">
            Tamil Nadu
          </Typography>

          <Typography className="mb-4">
            The blue flag beaches of
            <span className="text-blue-600 hover:underline cursor-pointer"> Tamil Nadu </span> are:
          </Typography>

          <ul className="list-disc pl-8 space-y-2">
            <li><span className="text-blue-600 hover:underline cursor-pointer">Kovalam beach, 40 km south of Chennai.</span></li>
          </ul>
          <Typography variant="h5" id="gujarat" className="mb-4">
            Gujarat
          </Typography>

          <Typography className="mb-4">
            The blue flag beaches of
            <span className="text-blue-600 hover:underline cursor-pointer"> Pudducherry </span> are:
          </Typography>

          <ul className="list-disc pl-8 space-y-2">
            <li><span className="text-blue-600 hover:underline cursor-pointer">Eden Beach in Chinna Veerampattinam</span></li>
          </ul>
          <Typography variant="h5" id="gujarat" className="mb-4">
          Andaman and Nicobar
          </Typography>

          <Typography className="mb-4">
            The blue flag beaches of
            <span className="text-blue-600 hover:underline cursor-pointer"> Andaman and Nicobar </span> are:
          </Typography>

          <ul className="list-disc pl-8 space-y-2">
            <li><span className="text-blue-600 hover:underline cursor-pointer">Radhanagar beach or Beach No 7 in Havelock Islands</span></li>
          </ul>
          <Typography variant="h5" id="gujarat" className="mb-4">
          Lakshadweep
          </Typography>

          <Typography className="mb-4">
            The blue flag beaches of
            <span className="text-blue-600 hover:underline cursor-pointer"> Lakshadweep </span> are:
          </Typography>

          <ul className="list-disc pl-8 space-y-2">
            <li><span className="text-blue-600 hover:underline cursor-pointer">Minicoy Thundi beach in Minicoy.</span></li>
            <li><span className="text-blue-600 hover:underline cursor-pointer">Kadmat beach in Kadmat island.</span></li>
          </ul>
          <Typography variant="h5" id="gujarat" className="mb-4">
          Kerala
          </Typography>

          <Typography className="mb-4">
            The blue flag beaches of
            <span className="text-blue-600 hover:underline cursor-pointer"> Kerala </span> are:
          </Typography>

          <ul className="list-disc pl-8 space-y-2">
            <li><span className="text-blue-600 hover:underline cursor-pointer">Kappad beach on north fringe of Kozhikode</span></li>
          </ul>
          <Typography variant="h5" id="gujarat" className="mb-4">
          Karnataka
          </Typography>

          <Typography className="mb-4">
            The blue flag beaches of
            <span className="text-blue-600 hover:underline cursor-pointer"> Karnataka </span> are:
          </Typography>

          <ul className="list-disc pl-8 space-y-2">
            <li><span className="text-blue-600 hover:underline cursor-pointer">Kasarkod beach in Kasarkod village in Uttara Kannada district</span></li>
            <li><span className="text-blue-600 hover:underline cursor-pointer">Padubidri Beach in Udupi district.</span></li>
          </ul>
          <Typography variant="h5" id="gujarat" className="mb-4">
          Diu and Daman
          </Typography>

          <Typography className="mb-4">
            The blue flag beaches of
            <span className="text-blue-600 hover:underline cursor-pointer"> Diu and Daman </span> are:
          </Typography>

          <ul className="list-disc pl-8 space-y-2">
            <li><span className="text-blue-600 hover:underline cursor-pointer">Ghoghla beach in Diu</span></li>
          </ul>
          <Typography variant="h4" id="west-coast" className="mb-6">
            West coast
          </Typography>

          <Typography variant="h5" id="gujarat" className="mb-4">
            Gujarat
          </Typography>

          <Typography className="mb-4">
            The beaches along the western state of
            <span className="text-blue-600 hover:underline cursor-pointer"> Gujarat </span> are:
          </Typography>

          <ul className="list-disc pl-8 space-y-2">
            <li><span className="text-blue-600 hover:underline cursor-pointer">Dumas Beach</span></li>
            <li><span className="text-blue-600 hover:underline cursor-pointer">Suvali Beach</span></li>
            <li><span className="text-blue-600 hover:underline cursor-pointer">Umbharat Beach</span></li>
            <li><span className="text-blue-600 hover:underline cursor-pointer">Dandi Beach</span></li>
            <li><span className="text-red-600 hover:underline cursor-pointer">Dabhari Beach</span></li>
            <li><span className="text-red-600 hover:underline cursor-pointer">Diu Beach</span></li>
            <li><span className="text-blue-600 hover:underline cursor-pointer">Tithal Beach</span></li>
            <li><span className="text-red-600 hover:underline cursor-pointer">Mandavi Beach</span></li>
            <li><span className="text-red-600 hover:underline cursor-pointer">Khambhat Beach</span></li>
          </ul>
          <Typography variant="h5" id="maharashtra" className="mb-4">
          Maharashtra
        </Typography>
        <Typography className="mb-4">
            The beaches along the western state of
            <span className="text-blue-600 hover:underline cursor-pointer"> Maharashtra </span> are:
          </Typography>
        <ul className="list-disc pl-8 space-y-2">
          <li>Aksa Beach</li>
          <li>Alibaug Beach</li>
          <li>Gorai Beach</li>
          <li>Juhu Beach</li>
          <li>Manori Beach</li>
          <li>Marvé Beach</li>
          <li>Versova Beach</li>
          <li>Agardanda Beach</li>
          <li>Diveagar Beach</li>
          <li>Ganpatipule Beach</li>
          <li>Guhagar Beach</li>
          <li>Kelwa Beach</li>
          <li>Tarkarli Beach</li>
          <li>Shivaji Park Beach</li>
          <li>Anjarle Beach</li>
          <li>Dapoli Beach</li>
          <li>Dahanu Beach</li>
          <li>Srivardhan Beach</li>
          <li>Kihim Beach</li>
          <li>Mandwa Beach</li>
          <li>Velneshwar Beach</li>
          <li>Vengurla Beach</li>
          <li>Bassein Beach</li>
          <li>Bhandarpule Beach</li>
          <li>Nagaon Beach</li>
          <li>Revdanda Beach</li>
          <li>Rewas Beach</li>
          <li>Kashid Beach</li>
          <li>Karde (Murud) Beach</li>
          <li>Harihareshwar Beach</li>
          <li>Bagmandla Beach</li>
          <li>Kelshi Beach</li>
          <li>Harnai Beach</li>
          <li>Bordi Beach</li>
          <li>Ratnagiri Beach</li>
          <li>Awas Beach</li>
          <li>Sasawne Beach</li>
          <li>Malvan Beach</li>
        </ul>
        </Box>
      </Box>

      <Footer />
    </div>
  );
};

export default BeachWiki;
