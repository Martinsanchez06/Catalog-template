import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { RootState } from "../../redux/store";

interface FetchComponentProps<T> {
  endpoint: string;
  queryKey: string;
  render: (data: T | undefined) => React.ReactNode; // Puede ser cualquier tipo de datos
  onDataLoaded?: (data: T) => void; // Callback para notificar que los datos se cargaron
}

const FetchComponent = <T,>({ endpoint, queryKey, render, onDataLoaded }: FetchComponentProps<T>) => {
  // Función de obtención de datos
  const fetchData = async (): Promise<T> => {
    const { data } = await axios.get<T>(endpoint); // Devuelve cualquier tipo (array u objeto)
    return data;
  };

  // Configuración de React Query
  const { data, isLoading, isError, error } = useQuery<T, Error>({
    queryKey: [queryKey],
    queryFn: fetchData,
  });

  // Llama al callback cuando los datos están disponibles
  useEffect(() => {
    if (data && onDataLoaded) {
      onDataLoaded(data); // Llama con los datos completos
    }
  }, [data, onDataLoaded]);

  // Manejo de estados
  if (isLoading) return <p>Cargando datos...</p>;
  if (isError) return <p>Error: {error?.message || "Error desconocido"}</p>;

  return <>{render(data)}</>; // Renderiza los datos
};

export default FetchComponent;
