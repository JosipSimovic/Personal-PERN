import { useState } from "react";

export const useSendRequest = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const sendRequest = async (url, method = "GET", body={}, headers={}) => {
        setIsLoading(true);
        try {
            const response = await fetch(url, {
                method,
                body,
                headers
            });

            const responseData = await response.json();
            setIsLoading(false);
            return responseData;
        } catch (e) {
            
        }
        setIsLoading(false);
    }

    const clearError = () => {
        setError(null);
    }

    return [isLoading, error, sendRequest, clearError];
}