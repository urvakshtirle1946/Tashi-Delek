import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AudioProvider } from "@/contexts/AudioContext";
import Loader from "@/components/Loader";
import Navigation from "@/components/Navigation";
import Index from "./pages/Index";
import VirtualTours from "./pages/VirtualTours";
import RumtekTour from "./pages/RumtekTour";
import InteractiveMapPage from "./pages/Map";
import CulturalCalendarPage from "./pages/Calendar";
import TravelPackagesPage from "./pages/Packages";
import FoodPage from "./pages/Food";
import GuidesPage from "./pages/Guides";
import CommunityPage from "./pages/Community";
import NotFound from "./pages/NotFound";

// Component to conditionally render Navigation
const ConditionalNavigation = () => {
  const location = useLocation();
  // Hide navigation on 3D tour pages
  const hideNavRoutes = ['/tours/rumtek'];

  if (hideNavRoutes.includes(location.pathname)) {
    return null;
  }

  return <Navigation />;
};

const App = () => {
  // Check if loader has already been shown in this session
  const [showLoader, setShowLoader] = useState(() => {
    // Only show loader if it hasn't been completed in this session
    return !sessionStorage.getItem('loaderCompleted');
  });

  useEffect(() => {
    // When loader completes, mark it in sessionStorage
    if (!showLoader) {
      sessionStorage.setItem('loaderCompleted', 'true');
    }
  }, [showLoader]);

  return (
    <AudioProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {showLoader && <Loader onComplete={() => setShowLoader(false)} />}
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <ConditionalNavigation />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/tours" element={<VirtualTours />} />
            <Route path="/tours/rumtek" element={<RumtekTour />} />
            <Route path="/map" element={<InteractiveMapPage />} />
            <Route path="/calendar" element={<CulturalCalendarPage />} />
            <Route path="/packages" element={<TravelPackagesPage />} />
            <Route path="/food" element={<FoodPage />} />
            <Route path="/guides" element={<GuidesPage />} />
            <Route path="/archives" element={<CommunityPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AudioProvider>
  );
};

export default App;
