import { useState, useCallback, useRef, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth-context";

export const useSendRequest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const auth = useContext(AuthContext);

  const activeHttpRequests = useRef([]);

  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setIsLoading(true);

      const httpAbortController = new AbortController();
      activeHttpRequests.current.push(httpAbortController);

      if (auth.isAdmin) {
        headers.admin_id = auth.userId;
      }

      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortController.signal,
        });

        const responseData = await response.json();

        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortController
        );

        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setIsLoading(false);
        return responseData;
      } catch (e) {
        setIsLoading(false);
        setError(e.message);
        throw e;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);

  return [isLoading, error, sendRequest, clearError];
};
