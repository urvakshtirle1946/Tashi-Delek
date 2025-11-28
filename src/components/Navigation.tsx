import { Mountain, Camera, Map, Archive, Calendar, Package, UtensilsCrossed, Users } from "lucide-react";
import { NavBar } from "@/components/ui/tubelight-navbar";

const Navigation = () => {
  const navItems = [
    { name: "Home", url: "/", icon: Mountain },
    { name: "Tours", url: "/tours", icon: Camera },
    { name: "Map", url: "/map", icon: Map },
    { name: "Archives", url: "/archives", icon: Archive },
    { name: "Calendar", url: "/calendar", icon: Calendar },
    { name: "Packages", url: "/packages", icon: Package },
    { name: "Food", url: "/food", icon: UtensilsCrossed },
    { name: "Guides", url: "/guides", icon: Users },
  ];

  return <NavBar items={navItems} />;
};

export default Navigation;