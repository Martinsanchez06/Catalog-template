import { useState, useEffect } from "react";
import axios, { AxiosRequestConfig } from "axios";

const useGet = <T,>(url: string, reloadTrigger?: number, config?: AxiosRequestConfig) => {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await axios.get<T>(url, config);
                setData(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [url, reloadTrigger]); // El reloadTrigger fuerza el reinicio de la petición

    return { data, isLoading, error };
};

export default useGet;
