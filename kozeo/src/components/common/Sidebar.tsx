"use client";

import {
  FiUser,
  FiShoppingBag,
  FiBriefcase,
  FiMessageSquare,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { useState } from "react";

const tabs = [
  { name: "Profile", icon: FiUser },
  { name: "Store", icon: FiShoppingBag },
  { name: "Open Gigs", icon: FiBriefcase },
  { name: "Discussion Rooms", icon: FiMessageSquare },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="relative">
      {/* Sidebar main */}
      <aside
        className={`sticky top-0 h-screen border-r text-white  border-neutral-700 flex flex-col justify-between transition-all duration-300 ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        <div className="flex flex-col p-4 space-y-6">
          <nav className="space-y-8">
            {tabs.map(({ name, icon: Icon }) => (
              <button
                key={name}
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
