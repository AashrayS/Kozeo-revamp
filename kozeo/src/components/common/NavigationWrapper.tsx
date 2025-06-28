"use client";

import { Suspense } from "react";
import { NavigationProvider } from "./NavigationProvider";

interface NavigationWrapperProps {
  children: React.ReactNode;
}

// Loading fallback component
const NavigationFallback = () => (
  <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_#111,_#000)] flex items-center justify-center z-50">
    <div className="relative">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-white border-opacity-20"></div>
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-cyan-400 border-t-transparent absolute top-0 left-0"></div>
    </div>
  </div>
);

export const NavigationWrapper = ({ children }: NavigationWrapperProps) => {
  return (
    <Suspense fallback={<NavigationFallback />}>
      <NavigationProvider>{children}</NavigationProvider>
    </Suspense>
  );
};
