"use client";

import { KeyboardArrowDown, KeyboardArrowRight } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
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
      { id: "Gujrat", title: "Gujrat" },
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
      { id: "odishA", title: "Odisha" },
      { id: "andhra-Pradesh", title: "Andhra Pradesh" },
      { id: "tamil-Nadu", title: "Tamil Nadu" },
      { id: "pondicherry", title: "Pondicherry" },
    ],
  },
  {
    id: "island-territories",
    title: "Island Territories",
    subsections: [
      { id: "andaman-nicobar", title: "Andaman and Nicobar Islands" },
      { id: "Lakshadweep", title: "Lakshadweep" },
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
            Blue Flag Beaches 
          </Typography>

          {/* Odisha */}
          <Box id="odisha" className="mb-6">
            <Typography variant="h5" className="mb-2 text-gray-700">
              Odisha
            </Typography>
            <Box className="flex flex-col md:flex-row md:space-x-4">
              <Box className="bg-blue-100 p-2 rounded mb-2 md:mb-0 md:w-1/2">
                <Link to={`/beaches/puri`} className="text-gray-600 hover:underline">
                  Puri Beach
                </Link>
              </Box>
              <Box className="bg-blue-100 p-2 rounded mb-2 md:mb-0 md:w-1/2">
                <Link to={`/beaches/pati-sonepur`} className="text-gray-600 hover:underline">
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
              <Link to={`/beaches/rushikonda`} className="text-gray-600 hover:underline">
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
              <Link to={`/beaches/kovalam`} className="text-gray-600 hover:underline">
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
              <Link to={`/beaches/eden`} className="text-gray-600 hover:underline">
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
              <Link to={`/beaches/radhanagar`} className="text-gray-600 hover:underline">
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
                <Link to={`/beaches/minicoy-thundi`} className="text-gray-600 hover:underline">
                  Minicoy Thundi Beach
                </Link>
              </Box>
              <Box className="bg-blue-100 p-2 rounded mb-2 md:mb-0 md:w-1/2">
                <Link to={`/beaches/kadmat`} className="text-gray-600 hover:underline">
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
              <Link to={`/beaches/kappad`} className="text-gray-600 hover:underline">
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
                <Link to={`/beaches/kasarkod`} className="text-gray-600 hover:underline">
                  Kasarkod Beach
                </Link>
              </Box>
              <Box className="bg-blue-100 p-2 rounded mb-2 md:mb-0 md:w-1/2">
                <Link to={`/beaches/padubidri`} className="text-gray-600 hover:underline">
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
              <Link to={`/beaches/ghoghla`} className="text-gray-600 hover:underline">
                Ghoghla Beach
              </Link>
            </Box>
          </Box>

          {/* gujrat */}
          <Box id="gujrat" className="mb-6">
            <Typography variant="h5" className="mb-2 text-gray-700">
              Gujrat
            </Typography>
            <Box className="bg-blue-100 p-2 rounded">
              <Link to={`/beaches/Shivrajpur`} className="text-gray-600 hover:underline">
              Shivrajpur beach
              </Link>
            </Box>
          </Box>

          {/* WEST COAST */}
          <Typography variant="h4" id="west-coast" className="mb-6 text-gray-800">
             West coast Beaches
          </Typography>

          {/* Gujarat */}
<Box id="gujarat" className="mb-6">
  <Typography variant="h5" className="mb-2 text-gray-700">
    Gujarat
  </Typography>
  {/* Row 1 */}
  <Box className="flex flex-row space-x-4 mb-2">
    <Box className="bg-blue-100 p-2 rounded w-1/2">
      <Link to={`/beaches/Dumas`} className="text-gray-600 hover:underline">
        Dumas Beach
      </Link>
    </Box>
    <Box className="bg-blue-100 p-2 rounded w-1/2">
      <Link to={`/beaches/Suvali`} className="text-gray-600 hover:underline">
        Suvali Beach
      </Link>
    </Box>
  </Box>
  {/* Row 2 */}
  <Box className="flex flex-row space-x-4 mb-2">
    <Box className="bg-blue-100 p-2 rounded w-1/2">
      <Link to={`/beaches/Umbharat`} className="text-gray-600 hover:underline">
        Umbharat Beach
      </Link>
    </Box>
    <Box className="bg-blue-100 p-2 rounded w-1/2">
      <Link to={`/beaches/Dandi`} className="text-gray-600 hover:underline">
        Dandi Beach
      </Link>
    </Box>
  </Box>
  {/* Row 3 */}
  <Box className="flex flex-row space-x-4 mb-2">
    <Box className="bg-blue-100 p-2 rounded w-1/2">
      <Link to={`/beaches/Dabhari`} className="text-gray-600 hover:underline">
        Dabhari Beach
      </Link>
    </Box>
    <Box className="bg-blue-100 p-2 rounded w-1/2">
      <Link to={`/beaches/Diu`} className="text-gray-600 hover:underline">
        Diu Beach
      </Link>
    </Box>
  </Box>
  {/* Row 4 */}
  <Box className="flex flex-row space-x-4 mb-2">
    <Box className="bg-blue-100 p-2 rounded w-1/2">
      <Link to={`/beaches/Tithal`} className="text-gray-600 hover:underline">
        Tithal Beach
      </Link>
    </Box>
    <Box className="bg-blue-100 p-2 rounded w-1/2">
      <Link to={`/beaches/Mandavi`} className="text-gray-600 hover:underline">
        Mandavi Beach
      </Link>
    </Box>
  </Box>
  {/* Row 5 (Last row with a single item) */}
  <Box className="flex flex-row space-x-4">
    <Box className="bg-blue-100 p-2 rounded w-1/2">
      <Link to={`/beaches/Khambhat`} className="text-gray-600 hover:underline">
        Khambhat Beach
      </Link>
    </Box>
  </Box>
</Box>

          {/* Maharashtra */}
<Box id="maharashtra" className="mb-6">
  <Typography variant="h5" className="mb-2 text-gray-700">
    Maharashtra
  </Typography>
  <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {[
      "Aksa Beach", "Alibaug Beach", "Gorai Beach", "Juhu Beach",
      "Manori Beach", "Marvé Beach", "Versova Beach", "Agardanda Beach",
      "Diveagar Beach", "Ganpatipule Beach", "Guhagar Beach", "Kelwa Beach",
      "Tarkarli Beach", "Shivaji Park Beach", "Anjarle Beach", "Dapoli Beach",
      "Dahanu Beach", "Srivardhan Beach", "Kihim Beach", "Mandwa Beach",
      "Velneshwar Beach", "Vengurla Beach", "Bassein Beach", "Bhandarpule Beach",
      "Nagaon Beach", "Revdanda Beach", "Rewas Beach", "Kashid Beach",
      "Karde (Murud) Beach", "Harihareshwar Beach", "Bagmandla Beach", "Kelshi Beach",
      "Harnai Beach", "Bordi Beach", "Ratnagiri Beach", "Awas Beach",
      "Sasawne Beach", "Malvan Beach"
    ].map((beach) => (
      <Box key={beach} className="bg-blue-100 p-2 rounded">
        <Link to={`/beaches/${beach.replace(/\s+/g, '')}`} className="text-gray-600 hover:underline">
          {beach}
        </Link>
      </Box>
    ))}
  </Box>
</Box>

{/* Goa */}
<Box id="goa" className="mb-6">
  <Typography variant="h5" className="mb-2 text-gray-700">
    Goa
  </Typography>
  <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {[
      "Agonda Beach", "Arambol Beach", "Benaulim Beach", "Cavelossim Beach",
      "Chapora Beach", "Mandrem Beach", "Palolem Beach", "Varca Beach",
      "Baga Beach", "Candolim Beach", "Calangute Beach", "Colva Beach",
      "Miramar Beach", "Morjim Beach", "Bambolim Beach", "Cabo de Rama Beach",
      "Anjuna Beach", "Utorda Beach", "Majorda Beach", "Betalbatim Beach",
      "Sernabatim Beach", "Cavelossim Beach", "Mobor Beach", "Betul Beach",
      "Querim Beach", "Kalacha Beach", "Mandrem Beach", "Ashvem Beach",
      "Vagator Beach", "Ozran Beach", "Sinquerim Beach", "Coco Beach",
      "Kegdole Beach", "Caranzalem Beach", "Dona Paula Beach", "Vaiguinim Beach",
      "Siridao Beach", "Bogmalo Beach", "Baina Beach", "Hansa Beach",
      "Hollant Beach", "Cansaulim Beach", "Velsao Beach", "Canaiguinim Beach",
      "Kakolem Beach", "Dharvalem Beach", "Cola Beach", "Agonda Beach",
      "Palolem Beach", "Patnem Beach", "Rajbag Beach", "Talpona Beach",
      "Galgibag Beach", "Polem Beach", "Pebble Beach Goa"
    ].map((beach) => (
      <Box key={beach} className="bg-blue-100 p-2 rounded">
        <Link to={`/beaches/${beach.replace(/\s+/g, '')}`} className="text-gray-600 hover:underline">
          {beach}
        </Link>
      </Box>
    ))}
  </Box>
</Box>

{/* Karnataka */}
<Box id="karnataka" className="mb-6">
  <Typography variant="h5" className="mb-2 text-gray-700">
    Karnataka
  </Typography>
  <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {[
      "Karwar Beach", "Kudle Beach", "Panambur Beach", "NITK Beach",
      "Sasihithlu Beach", "Maravanthe Beach", "Tannirubhavi Beach", "Malpe Beach",
      "Murudeshwara Beach", "Apsarakonda Beach", "Om Beach, Gokarna", "Kaup Beach",
      "Kodi Beach", "Someshwar Beach", "St Mary's Island Beach", "Mukka Beach",
      "Ullal Beach"
    ].map((beach) => (
      <Box key={beach} className="bg-blue-100 p-2 rounded">
        <Link to={`/beaches/${beach.replace(/\s+/g, '')}`} className="text-gray-600 hover:underline">
          {beach}
        </Link>
      </Box>
    ))}
  </Box>
</Box>

{/* Kerala */}
<Box id="kerala" className="mb-6">
  <Typography variant="h5" className="mb-2 text-gray-700">
    Kerala
  </Typography>
  <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {[
      "Chavakkad Beach", "Cherai Beach", "Fort Kochi Beach", "Kollam Beach",
      "Kanhangad Beach", "Marari Beach", "Meenkunnu Beach", "Muzhappilangad Beach",
      "Payyambalam Beach", "Saddam Beach", "Shangumughom Beach", "Snehatheeram Beach",
      "Kappil Beach Varkala", "Thirumullavaram Beach", "Kovalam Beach", "Hawa Beach, Kovalam",
      "Samudra Beach, Kovalam", "Lighthouse Beach, Kovalam", "Kannur Beach", "Kappad Beach",
      "Varkala Beach / Papanasham Beach", "Padinjarekkara Beach", "Tanur Beach", "Azheekal Beach",
      "Alappuzha Beach", "Kozhikode Beach", "Bekal Beach", "Thiruvambadi Beach", "Kappil Beach"
    ].map((beach) => (
      <Box key={beach} className="bg-blue-100 p-2 rounded">
        <Link to={`/beaches/${beach.replace(/\s+/g, '')}`} className="text-gray-600 hover:underline">
          {beach}
        </Link>
      </Box>
    ))}
  </Box>
</Box>

{/* EAST COAST */}
          <Typography variant="h4" id="east-coast" className="mb-6 text-gray-800">
             East coast Beaches
          </Typography>

{/* West Bengal */}
<Box id="west-bengal" className="mb-6">
  <Typography variant="h5" className="mb-2 text-gray-700">
    West Bengal
  </Typography>
  <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {[
      "Henry Island Beach", "Bakkhali Sea Beach", "Frasergunj Sea Beach", "Gangasagar Sea Beach",
      "Junput Beach", "Bankiput Sea Beach", "Mandarmani Beach", "Shankarpur Beach",
      "Tajpur Beach", "Digha Sea Beach", "Udaypur Sea Beach"
    ].map((beach) => (
      <Box key={beach} className="bg-blue-100 p-2 rounded">
        <Link to={`/beaches/${beach.replace(/\s+/g, '')}`} className="text-gray-600 hover:underline">
          {beach}
        </Link>
      </Box>
    ))}
  </Box>
</Box>

{/* Odisha */}
<Box id="odishA" className="mb-6">
  <Typography variant="h5" className="mb-2 text-gray-700">
    Odisha
  </Typography>
  <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {[
      "Talsari Beach", "Dagara Beach", "Chandipur-on-Sea", "Gahirmatha Beach",
      "Satabhaya Beach", "Pentha Sea Beach", "Hukitola Beach", "Paradeep Sea Beach",
      "Astaranga Beach", "Beleswar Beach", "Konark Beach", "Chandrabhaga Beach",
      "Ramachandi Beach", "Puri Beach", "Satpada Beach", "Parikud Beach",
      "Ganjam Beach", "Aryapalli Beach", "Gopalpur-on-Sea", "Dhabaleshwar Beach",
      "Ramayapatnam Beach", "Sonapur Beach"
    ].map((beach) => (
      <Box key={beach} className="bg-blue-100 p-2 rounded">
        <Link to={`/beaches/${beach.replace(/\s+/g, '')}`} className="text-gray-600 hover:underline">
          {beach}
        </Link>
      </Box>
    ))}
  </Box>
</Box>

{/* Andhra Pradesh */}
<Box id="andhra-Pradesh" className="mb-6">
  <Typography variant="h5" className="mb-2 text-gray-700">
    Andhra Pradesh
  </Typography>
  <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {[
      "Sonpur Beach", "Donkuru Beach", "Nelavanka Beach", "Kaviti Beach",
      "Onturu Beach", "Ramayyapatnam Beach", "Baruva Beach", "Battigalluru Beach",
      "Sirmamidi Beach", "Ratti Beach", "Shivasagar Beach", "Dokulapadu Beach",
      "Nuvvalarevu Beach", "KR Peta Beach", "Bavanapadu Beach", "Mula Peta Beach",
      "BVS Beach", "Patha Meghavaram Beach", "Guppidipeta Beach", "Kotharevu Beach",
      "Rajaram Puram Beach", "Kalingapatnam Beach", "Bandaruvanipeta Beach", "Mogadalapadu Beach",
      "Vatsavalasa Beach", "S. Matchelesam Beach", "Balarampuram Beach", "Kunduvanipeta Beach",
      "PD Palem Beach", "Budagatlapalem Beach", "Kotcherla Beach", "Jeerupalem Beach",
      "Kovvada Beach", "Pothayyapeta Beach", "Chintapalli NGF Beach", "Chintapalli Beach",
      "Tammayyapalem Beach", "Konada Beach", "Divis Beach", "Bheemili Beach",
      "Mangamaripeta Beach", "Thotlakonda Beach", "Rushikonda Beach", "Sagarnagar Beach",
      "Jodugullapalem Beach", "RK Beach", "Durga Beach", "Yarada Beach",
      "Gagavaram Beach", "Adi's Beach", "Appikonda Beach", "Tikkavanipalem Beach",
      "Mutyalammapalem Beach", "Thanthadi Beach", "Seethapalem Beach", "Rambilli Beach",
      "Kothapatnam Beach", "Revupolavaram Beach", "Gudivada Beach", "Gurrajupeta Beach",
      "Pedhatheenarla Beach", "Rajjyapeta Beach", "Boyapadu Beach", "DLPuram Beach",
      "Pentakota Beach", "Rajavaram Beach", "Addaripeta Beach", "Danvaipeta Beach",
      "Gaddipeta Beach", "K. Perumallapuram Beach", "Konapapapeta Beach", "Uppada Beach",
      "Nemam Beach", "NTR Beach", "Seahorse Beach", "Dragonmouth Beach",
      "Pallam Beach", "Sunrise Beach", "Surasani Yanam Beach", "Vasalatippa Beach",
      "Odalarevu Beach", "Turpupalem Beach", "Kesanapalli Beach", "Shankaraguptham Beach",
      "Chintalamori Beach", "Natural Beach", "KDP Beach", "Antervedi Beach",
      "Pedamainavanilanka Beach", "Perupalem Beach", "Kanakadurga Beach", "Gollapalem Beach",
      "Podu Beach", "Gollapalem Beach", "Pedapatnam Beach", "Modi Beach",
      "Tallapalem Beach", "Manginapudi Beach", "Crab Beach", "Gopuvanipalem Beach",
      "Lonely Beach", "Chinakaragraharam Beach", "Destiny Beach", "Machilipatnam Beach",
      "Hamsaladeevi Beach", "Diviseema Beach", "Dindi Beach", "Nizampatnam Beach",
      "Suryalanka Beach", "Pandurangapuram Beach", "Vodarevu Beach", "Ramachandrapuram Beach",
      "Motupalli Beach", "Chinaganjam Beach", "Pedaganjam Beach", "Kanapurthi Beach",
      "Kodurivaripalem Beach", "Katamvaripalem Beach", "Kanuparthi Beach", "Motumala Beach",
      "Pinnivaripalem Beach", "Kothapatnam Beach", "Gavandlapallem Beach", "Rajupalem Beach",
      "Etthamukhala Beach", "Madanur Beach", "White sand Beach", "Pakka Beach",
      "Pakala Beach", "Ullapalem Beach", "Pedda Pallepalem Beach", "Karedu Beach",
      "G-Star Shiv Beach", "Shiv satendra Prajapati Beach", "Alagayapalem Beach", "Chackicherla Beach",
      "Ramayapattanam Public Beach", "Karla palem Beach", "SSR Port Beach", "Pallipalem Public Beach",
      "Kotha sathram Beach", "Pedaramudu palem Beach", "Chinnaramudu palem Beach", "Thummalapenta Beach",
      "Thatichetla Palem Beach", "LN Puram Beach", "Iskapalli Beach", "Ponnapudi Beach",
      "Ramathirdamu Beach", "Govundlapalem Beach", "Kudithipalem Beach", "Gangapatnam Beach",
      "Mypadu Beach", "Zard Beach", "Kotha Koduru Beach", "Koduru Beach",
      "Katepalli Beach", "Nelaturu Beach", "Krishnapatnam Beach", "Theegapalem Beach",
      "Srinivasa satram Beach", "Pattapupalem Beach", "Moonside Beach", "Thupilipalem Beach",
      "Kondurpalem Beach", "Alone Beach", "Raviguntapalem Beach", "Nawabpet Beach"
    ].map((beach) => (
      <Box key={beach} className="bg-blue-100 p-2 rounded">
        <Link to={`/beaches/${beach.replace(/\s+/g, '')}`} className="text-gray-600 hover:underline">
          {beach}
        </Link>
      </Box>
    ))}
  </Box>
</Box>

{/* Tamil Nadu */}
<Box id="tamil-Nadu" className="mb-6">
  <Typography variant="h5" className="mb-2 text-gray-700">
    Tamil Nadu
  </Typography>
  <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {[
      "Marina Beach", "Edward Elliot's Beach", "Kasimedu's N4 Beach", "Golden Beach, Chennai",
      "Thiruvanmayur Beach, Chennai", "Silver Beach", "Covelong Beach", "Mahabalipuram Beach",
      "Olaikuda Beach", "Ariyaman/kushi Beach, Rameswaram", "Pamban Beach, Rameswaram", 
      "Dhanushkodi Beach", "Velankanni Beach", "Sothavilai Beach", "Kanyakumari Beach",
      "Vattakotai Beach", "Sanguthurai Beach", "Sengumal Beach", "Thoothukudi Beach", 
      "Tiruchendur Beach", "Poompuhar beach"
    ].map((beach) => (
      <Box key={beach} className="bg-blue-100 p-2 rounded">
        <Link to={`/beaches/${beach.replace(/\s+/g, '')}`} className="text-gray-600 hover:underline">
          {beach}
        </Link>
      </Box>
    ))}
  </Box>
</Box>

{/* Pondicherry */}
<Box id="pondicherry" className="mb-6">
  <Typography variant="h5" className="mb-2 text-gray-700">
    Pondicherry
  </Typography>
  <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {[
      "Promenade Beach", "Karaikal Beach", "Yanam Beach",
      "Auroville Beach", "Paradise Beach", "Serenity Beach"
    ].map((beach) => (
      <Box key={beach} className="bg-blue-100 p-2 rounded">
        <Link to={`/beaches/${beach.replace(/\s+/g, '')}`} className="text-gray-600 hover:underline">
          {beach}
        </Link>
      </Box>
    ))}
  </Box>
</Box>

{/* Island Territories */}
          <Typography variant="h4" id="island-territories" className="mb-6 text-gray-800">
            Island Territories
          </Typography>

{/* Andaman and Nicobar Islands */}
<Box id="andaman-nicobar" className="mb-6">
  <Typography variant="h5" className="mb-2 text-gray-700">
    Andaman and Nicobar Islands
  </Typography>
  <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {[
      "Radhanagar Beach", "Bharatpur Beach", "Laxmanpur Beach",
      "Kala Patthar Beach", "Elephant Beach", "Baratang Island",
      "Wandoor Beach"
    ].map((beach) => (
      <Box key={beach} className="bg-blue-100 p-2 rounded">
        <Link to={`/beaches/${beach.replace(/\s+/g, '')}`} className="text-gray-600 hover:underline">
          {beach}
        </Link>
      </Box>
    ))}
  </Box>
</Box>

{/* Lakshadweep Islands */}
<Box id="Lakshadweep" className="mb-6">
  <Typography variant="h5" className="mb-2 text-gray-700">
    Lakshadweep Islands
  </Typography>
  <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {[
      "Bangaram Beach", "Kadamat Beach", "Agatti Beach",
      "Kalpeni Beach", "Kavaratti Island", "Minicoy Beach"
    ].map((beach) => (
      <Box key={beach} className="bg-blue-100 p-2 rounded">
        <Link to={`/beaches/${beach.replace(/\s+/g, '')}`} className="text-gray-600 hover:underline">
          {beach}
        </Link>
      </Box>
    ))}
  </Box>
</Box>


        </Box>
      </Box>
      <Footer />
    </div>
  );
};

export default BeachWiki;
