"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { usePathname, useSearchParams } from "next/navigation";
import NavigationInterceptor from "./NavigationInterceptor";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useTheme } from "@/contexts/ThemeContext";

interface NavigationContextType {
  isLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
}

const NavigationContext = createContext<NavigationContextType>({
  isLoading: false,
  startLoading: () => {},
  stopLoading: () => {},
});

export const useNavigation = () => useContext(NavigationContext);

interface NavigationProviderProps {
  children: ReactNode;
}

export const NavigationProvider = ({ children }: NavigationProviderProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [manualLoading, setManualLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { theme } = useTheme();

  const startLoading = () => {
    setManualLoading(true);
  };

  const stopLoading = () => {
    setManualLoading(false);
  };

  // Immediately show loader on any route change attempt
  useEffect(() => {
    // Show loader immediately when navigation starts
    setIsLoading(true);
    setManualLoading(false); // Reset manual loading

    // Keep loader visible for minimum duration to ensure smooth UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200); // Increased duration for better UX

    return () => {
      clearTimeout(timer);
    };
  }, [pathname, searchParams]);

  // Handle manual loading trigger
  useEffect(() => {
    if (manualLoading) {
      setIsLoading(true);
    }
  }, [manualLoading]);

  const contextValue = {
    isLoading: isLoading || manualLoading,
    startLoading,
    stopLoading,
  };

  return (
    <NavigationContext.Provider value={contextValue}>
      {/* Navigation Interceptor for immediate loader trigger */}
      <NavigationInterceptor />

      {/* Top loading bar */}
      {(isLoading || manualLoading) && (
        <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
          <div className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 animate-loading"></div>
        </div>
      )}

      {children}

      {/* Full screen loader with Header and Sidebar */}
      {(isLoading || manualLoading) && (
        <div
          className={`fixed inset-0 z-40 transition-opacity duration-300 ${
            theme === "dark"
              ? "bg-[radial-gradient(circle_at_center,_#111,_#000)]"
              : "bg-gradient-to-br from-slate-50 via-gray-50 to-stone-50"
          }`}
        >
          {/* Header and Sidebar */}
          <Header logoText="Kozeo" />

          <div className="flex h-full">
            <Sidebar />

            {/* Main loading content */}
            <div className="flex-1 flex items-center justify-center">
              {/* Glow effects matching login page */}
              {theme === "dark" && (
                <>
                  <div className="fixed top-56 right-4 w-2 h-0 rounded-full opacity-90 bg-purple-500 shadow-[0_0_250px_100px_rgba(168,85,247,0.35)] pointer-events-none z-0" />
                  <div className="fixed bottom-4 left-4 w-2 h-0 rounded-full opacity-90 bg-cyan-400 shadow-[0_0_250px_100px_rgba(34,211,238,0.35)] pointer-events-none z-0" />
                </>
              )}

              <div className="bg-transparent bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 flex flex-col items-center border-opacity-20 z-10 animate-fadeIn">
                <div className="relative mb-4">
                  <div
                    className={`animate-spin rounded-full h-16 w-16 border-4 ${
                      theme === "dark"
                        ? "border-white border-opacity-20"
                        : "border-gray-300"
                    }`}
                  ></div>
                  <div
                    className={`animate-spin rounded-full h-16 w-16 border-4 border-t-transparent absolute top-0 left-0 ${
                      theme === "dark" ? "border-cyan-400" : "border-blue-500"
                    }`}
                  ></div>
                </div>
                <p
                  className={`text-lg font-medium transition-colors duration-300 ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  Loading...
                </p>
                <p
                  className={`text-sm mt-1 transition-colors duration-300 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Please wait
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </NavigationContext.Provider>
  );
};
