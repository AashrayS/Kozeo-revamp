import { useDispatch } from "react-redux";
import { clearUser } from "./userSlice.js";

// Custom hook for logout functionality
export const useLogout = () => {
  const dispatch = useDispatch();

  const logout = () => {
    // Clear Redux state (this will also clear localStorage)
    dispatch(clearUser());

    // Optional: redirect to login
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  };

  return logout;
};
