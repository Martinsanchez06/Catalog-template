import React, { createContext, useState, useEffect, useContext } from 'react';
import throttle from "../utilities/utilities";

// Define la estructura del contexto
interface ScrollContextType {
  scrolled: boolean;
  isBlur: boolean;
  setBlurThreshold: (value: number) => void; // Permite ajustar el umbral de blur
  setScrollThreshold: (value: number) => void; // Permite ajustar el umbral de scroll
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

export const ScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isBlur, setIsBlur] = useState(false);
  const [blurThreshold, setBlurThreshold] = useState(118); // Valor predeterminado para blur
  const [scrollThreshold, setScrollThreshold] = useState(100); // Valor predeterminado para scroll

  useEffect(() => {
    // Función throttled para manejar el scroll
    const handleThrottledScroll = throttle(() => {
      setScrolled(window.scrollY > scrollThreshold); // Umbral dinámico para `scrolled`
      setIsBlur(window.scrollY > blurThreshold); // Umbral dinámico para `blur`
    }, 100);

    window.addEventListener('scroll', handleThrottledScroll);

    return () => {
      window.removeEventListener('scroll', handleThrottledScroll);
    };
  }, [blurThreshold, scrollThreshold]);

  return (
    <ScrollContext.Provider value={{ scrolled, isBlur, setBlurThreshold, setScrollThreshold }}>
      {children}
    </ScrollContext.Provider>
  );
};

// Hook personalizado para acceder al contexto
export const useScroll = (customScrollThreshold?: number, customBlurThreshold?: number) => {
  const context = useContext(ScrollContext);
  if (context === undefined) {
    throw new Error('useScroll debe usarse dentro de un ScrollProvider');
  }

  // Si se proporciona `customScrollThreshold` o `customBlurThreshold`, actualizamos los umbrales
  useEffect(() => {
    if (customScrollThreshold !== undefined) {
      context.setScrollThreshold(customScrollThreshold);
    }
    if (customBlurThreshold !== undefined) {
      context.setBlurThreshold(customBlurThreshold);
    }
  }, [customScrollThreshold, customBlurThreshold, context]);

  return { scrolled: context.scrolled, isBlur: context.isBlur };
};
