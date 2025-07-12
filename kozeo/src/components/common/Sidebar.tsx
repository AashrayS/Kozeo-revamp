"use client";

import {
  FiUser,
  FiShoppingBag,
  FiBriefcase,
  FiMessageSquare,
  FiChevronLeft,
  FiChevronRight,
  FiHome,
} from "react-icons/fi";
import { useState } from "react";
import { IconType } from "react-icons";
import { useNavigationLoader } from "./useNavigationLoader";
import { useUser } from "../../../store/hooks";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(true);
  const { navigateWithLoader, startLoading } = useNavigationLoader();
  const { user, username, isAuthenticated } = useUser();

  // Debug logging
  console.log("Sidebar - User state:", { user, username, isAuthenticated });

  // Get username from Redux user state or fallback to a default
  const profileUsername = username || "profile";

  const tabs: { name: string; icon: IconType; path: string }[] = [
    { name: "Home", icon: FiHome, path: "/Atrium" },
    { name: "Profile", icon: FiUser, path: `/profile/${profileUsername}` },
    { name: "Store", icon: FiShoppingBag, path: "/store" },
    { name: "Gigs", icon: FiBriefcase, path: "/gigs" }, // Update to go to gig list
    {
      name: "Discussion Rooms",
      icon: FiMessageSquare,
      path: "/Atrium/discussion",
    },
  ];

  const handleNavigation = (path: string) => {
    // Always trigger loader immediately for any navigation
    debugger
    navigateWithLoader(path);
  };

  return (
    <div className="relative">
      <aside
        className={`sticky top-0 h-screen border-r text-white border-neutral-700 flex flex-col justify-between transition-all duration-300 ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        <div className="flex flex-col p-4 space-y-6">
          <nav className="space-y-8">
            {tabs.map(({ name, icon: Icon, path }) => (
              <button
                key={name}
                onClick={() => handleNavigation(path)}
                className="flex items-center gap-3 w-full px-4 py-2 rounded-md hover:bg-neutral-800 transition-colors"
              >
                <Icon className="text-2xl shrink-0" />
                {!collapsed && <span className="text-base">{name}</span>}
              </button>
            ))}
          </nav>

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex items-center gap-3 w-full px-4 py-2 rounded-md hover:bg-neutral-800 transition-colors"
          >
            {collapsed ? (
              <FiChevronRight className="text-2xl shrink-0" />
            ) : (
              <>
                <FiChevronLeft className="text-2xl shrink-0" />
                <span className="text-base">Collapse</span>
              </>
            )}
          </button>
        </div>
      </aside>
    </div>
  );
}
