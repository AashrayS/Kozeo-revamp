// utilities/api.js

// GraphQL API configuration
const GRAPHQL_ENDPOINT =
  process.env.NEXT_PUBLIC_GRAPHQL_URL ||
  "https://your-graphql-endpoint.com/graphql";

// Token management
const TOKEN_KEY = "kozeo_auth_token";
const REFRESH_TOKEN_KEY = "kozeo_refresh_token";

/**
 * Get JWT token from localStorage
 * @returns {string|null} JWT token or null if not found
 */
export const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(TOKEN_KEY);
  }
  return null;
};

/**
 * Set JWT token in localStorage
 * @param {string} token - JWT token to store
 */
export const setToken = (token) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(TOKEN_KEY, token);
  }
};

/**
 * Get refresh token from localStorage
 * @returns {string|null} Refresh token or null if not found
 */
export const getRefreshToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  }
  return null;
};

/**
 * Set refresh token in localStorage
 * @param {string} refreshToken - Refresh token to store
 */
export const setRefreshToken = (refreshToken) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }
};

/**
 * Remove tokens from localStorage (logout)
 */
export const clearTokens = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  }
};

/**
 * Check if user is authenticated
 * @returns {boolean} True if token exists
 */
export const isAuthenticated = () => {
  return !!getToken();
};

/**
 * Refresh JWT token using refresh token
 * @returns {Promise<boolean>} True if refresh was successful
 */
export const refreshAuthToken = async () => {
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    console.error("No refresh token available");
    return false;
  }

  try {
    const refreshMutation = `
      mutation RefreshToken($refreshToken: String!) {
        refreshToken(refreshToken: $refreshToken) {
          accessToken
          refreshToken
          user {
            id
            email
            username
          }
        }
      }
    `;

    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: refreshMutation,
        variables: { refreshToken },
      }),
    });

    const result = await response.json();

    if (result.errors) {
      console.error("Token refresh failed:", result.errors);
      clearTokens();
      return false;
    }

    if (result.data?.refreshToken) {
      setToken(result.data.refreshToken.accessToken);
      setRefreshToken(result.data.refreshToken.refreshToken);
      return true;
    }

    return false;
  } catch (error) {
    console.error("Network error during token refresh:", error);
    clearTokens();
    return false;
  }
};

/**
 * Main GraphQL API call function with JWT authentication
 * @param {string} query - GraphQL query or mutation string
 * @param {Object} variables - Variables for the GraphQL operation
 * @param {Object} options - Additional options
 * @param {boolean} options.requireAuth - Whether authentication is required (default: true)
 * @param {boolean} options.autoRetry - Whether to retry with token refresh on auth failure (default: true)
 * @returns {Promise<Object>} API response data
 */
export const callApi = async (query, variables = {}, options = {}) => {
  const { requireAuth = true, autoRetry = true } = options;

  // Prepare headers
  const headers = {
    "Content-Type": "application/json",
  };

  // Add JWT token if available and required
  if (requireAuth) {
    const token = getToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    } else {
      throw new Error("Authentication token not found. Please log in.");
    }
  }

  try {
    // Make the GraphQL request
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: "POST",
      headers,
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    // Parse response
    const result = await response.json();

    // Handle GraphQL errors
    if (result.errors) {
      // Check for authentication errors
      const authError = result.errors.find(
        (error) =>
          error.extensions?.code === "UNAUTHENTICATED" ||
          error.message.includes("token") ||
          error.message.includes("unauthorized")
      );

      if (authError && autoRetry && requireAuth) {
        console.log(
          "Authentication error detected, attempting token refresh..."
        );

        // Try to refresh token
        const refreshSuccess = await refreshAuthToken();

        if (refreshSuccess) {
          console.log("Token refreshed successfully, retrying request...");
          // Retry the original request with new token
          return callApi(query, variables, { ...options, autoRetry: false });
        } else {
          // Refresh failed, redirect to login or handle as needed
          console.error("Token refresh failed, user needs to log in again");
          clearTokens();

          // You can customize this behavior based on your app's needs
          if (typeof window !== "undefined") {
            window.location.href = "/login";
          }

          throw new Error("Session expired. Please log in again.");
        }
      }

      // For other GraphQL errors, throw with details
      console.error("GraphQL errors:", result.errors);
      throw new Error(result.errors.map((err) => err.message).join(", "));
    }

    // Handle HTTP errors
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Return successful response data
    return result.data;
  } catch (error) {
    console.error("API call failed:", error);

    // Re-throw the error for the calling code to handle
    throw error;
  }
};

/**
 * Convenience function for queries
 * @param {string} query - GraphQL query string
 * @param {Object} variables - Query variables
 * @param {Object} options - Additional options
 * @returns {Promise<Object>} Query result
 */
export const query = (queryString, variables = {}, options = {}) => {
  return callApi(queryString, variables, options);
};

/**
 * Convenience function for mutations
 * @param {string} mutation - GraphQL mutation string
 * @param {Object} variables - Mutation variables
 * @param {Object} options - Additional options
 * @returns {Promise<Object>} Mutation result
 */
export const mutate = (mutationString, variables = {}, options = {}) => {
  return callApi(mutationString, variables, options);
};
