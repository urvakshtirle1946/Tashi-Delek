import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { LoadScript } from "@react-google-maps/api";
import { AudioProvider } from "@/contexts/AudioContext";
import Loader from "@/components/Loader";
import Navigation from "@/components/Navigation";
import SmoothScroll from "@/components/SmoothScroll";
import OfflineIndicator from "@/components/OfflineIndicator";
import Index from "./pages/Index";
import VirtualTours from "./pages/VirtualTours";
import RumtekTour from "./pages/RumtekTour";
import EncheyTour from "./pages/EncheyTour";
import PelingGumpaTour from "./pages/PelingGumpaTour";
import PhodongTour from "./pages/PhodongTour";
import RavanglaTour from "./pages/RavanglaTour";
import InteractiveMapPage from "./pages/Map";
import CulturalCalendarPage from "./pages/Calendar";
import TravelPackagesPage from "./pages/Packages";
import FoodPage from "./pages/Food";
import GuidesPage from "./pages/Guides";
import CommunityPage from "./pages/Community";
import Archives from "./pages/Archives";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import { GOOGLE_MAPS_API_KEY, GOOGLE_LIBRARIES } from "@/components/ui/google-map";

// Component to conditionally render Navigation
const ConditionalNavigation = () => {
  const location = useLocation();
  // Hide navigation on 3D tour pages
  const hideNavRoutes = ['/tours/rumtek', '/tours/enchey', '/tours/pelinggumpa', '/tours/phodong', '/tours/ravangla'];

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
        <SmoothScroll />
        {showLoader && <Loader onComplete={() => setShowLoader(false)} />}
        {/* LoadScript moved to App level to prevent re-initialization and Street View 429 errors */}
        <LoadScript
          googleMapsApiKey={GOOGLE_MAPS_API_KEY}
          libraries={GOOGLE_LIBRARIES}
        >
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
              <Route path="/tours/enchey" element={<EncheyTour />} />
              <Route path="/tours/pelinggumpa" element={<PelingGumpaTour />} />
              <Route path="/tours/phodong" element={<PhodongTour />} />
              <Route path="/tours/ravangla" element={<RavanglaTour />} />
              <Route path="/map" element={<InteractiveMapPage />} />
              <Route path="/calendar" element={<CulturalCalendarPage />} />
              <Route path="/packages" element={<TravelPackagesPage />} />
              <Route path="/food" element={<FoodPage />} />
              <Route path="/guides" element={<GuidesPage />} />
              <Route path="/archives" element={<Archives />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </LoadScript>
      </TooltipProvider>
    </AudioProvider>
  );
};

export default App;
