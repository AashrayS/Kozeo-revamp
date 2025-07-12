import { useSelector } from "react-redux";
import {
  selectUser,
  selectIsAuthenticated,
  selectUserLoading,
  selectUserName,
} from "./userSlice.js";

// Custom hook to easily access user state
export const useUser = () => {
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectUserLoading);
  const username = useSelector(selectUserName);

  return {
    user,
    isAuthenticated,
    loading,
    username,
  };
};
