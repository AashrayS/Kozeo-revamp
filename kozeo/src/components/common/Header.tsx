"use client";

import { FiLogOut, FiBell } from "react-icons/fi";
import { logout } from "../../../utilities/operation"; // adjust path if needed

export default function Header({ logoText = "YourApp" }: { logoText?: string }) {
  return (
    <header className="w-full px-6 py-4 Z-40 bg-[#0e0e0] flex justify-between items-center ">
      <div className="text-white text-2xl font-bold tracking-wide">{logoText}</div>

        <div className="flex items-center gap-4">
        {/* Notification Button */}
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-md text-white hover:bg-neutral-800 transition-colors"
        >
          <FiBell className="text-xl" />
          <span className="hidden sm:inline">Notifications</span>
        </button>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="flex items-center gap-2 px-4 py-2 rounded-md text-white hover:bg-neutral-800 transition-colors"
        >
          <FiLogOut className="text-xl" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}
