import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  url: string;
  icon: LucideIcon;
}

interface NavBarProps {
  items: NavItem[];
  className?: string;
}

export function NavBar({ items, className }: NavBarProps) {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);

  // Determine active tab based on current route
  const getActiveTab = () => {
    const currentPath = location.pathname;
    const activeItem = items.find(item => {
      if (item.url === "/") {
        return currentPath === "/";
      }
      return currentPath.startsWith(item.url);
    });
    return activeItem?.name || items[0].name;
  };

  const [activeTab, setActiveTab] = useState(() => getActiveTab());

  // Update active tab when route changes
  useEffect(() => {
    const currentPath = location.pathname;
    const activeItem = items.find(item => {
      if (item.url === "/") {
        return currentPath === "/";
      }
      return currentPath.startsWith(item.url);
    });
    if (activeItem) {
      setActiveTab(activeItem.name);
    }
  }, [location.pathname, items]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={cn(
        "fixed bottom-0 sm:top-0 left-1/2 -translate-x-1/2 z-50 mb-6 sm:pt-6 pointer-events-none",
        className,
      )}
    >
      <div className="flex items-center gap-2 border border-white/20 bg-black/10 backdrop-blur-xl supports-[backdrop-filter]:bg-black/10 py-1.5 px-2 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.3)] pointer-events-auto">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.name;

          return (
            <Link
              key={item.name}
              to={item.url}
              onClick={() => setActiveTab(item.name)}
              className={cn(
                "relative cursor-pointer text-sm font-medium px-5 py-2 rounded-full transition-all duration-300",
                "text-white/80 hover:text-[#D6A85A]",
                isActive && "bg-white/15 text-white shadow-[0_0_20px_rgba(214,168,90,0.2)]",
                "group"
              )}
            >
              <span className="hidden md:inline relative z-10">{item.name}</span>
              <span className="md:hidden relative z-10">
                <Icon size={18} strokeWidth={2.5} />
              </span>

              {/* Hover underline animation */}
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-[#D6A85A] to-[#8B5E29] rounded-full group-hover:w-3/4 transition-all duration-300" />

              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-gradient-to-r from-[#D6A85A]/10 to-[#8B5E29]/10 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-[#D6A85A] to-[#8B5E29] rounded-t-full">
                    <div className="absolute w-12 h-6 bg-[#D6A85A]/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-[#D6A85A]/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-[#D6A85A]/20 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

