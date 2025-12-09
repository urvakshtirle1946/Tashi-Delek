import { Mountain, Camera, Map, Archive, Calendar, Package, UtensilsCrossed, Users, UserCircle } from "lucide-react";
import { Link } from "react-router-dom";
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

  return (
    <>
      <NavBar items={navItems} />
      {/* Top-right profile/login icon */}
      <div className="fixed top-3 right-4 z-50">
        {(() => {
          const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
          const userStr = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
          const user = userStr ? JSON.parse(userStr) : null;
          if (token && user) {
            return (
              <Link to="/profile" className="flex items-center gap-2 px-3 py-2 rounded-full bg-black/20 backdrop-blur text-white hover:text-[#D6A85A]">
                <UserCircle size={20} />
                <span className="hidden sm:inline">{user.name?.split(' ')[0] || 'Profile'}</span>
              </Link>
            );
          }
          return (
            <div className="flex items-center gap-2">
              <Link to="/login" className="px-3 py-2 rounded-full bg-black/20 backdrop-blur text-white hover:text-[#D6A85A]">Login</Link>
              <Link to="/register" className="px-3 py-2 rounded-full bg-black/20 backdrop-blur text-white hover:text-[#D6A85A]">Register</Link>
            </div>
          );
        })()}
      </div>
    </>
  );
};

export default Navigation;