import { createContext, useState, useContext } from "react";

interface WidthContextType {
  width: string;
  setWidth: (width: string) => void;
}

const WidthContext = createContext<WidthContextType | undefined>(undefined);

const WidthProvider = ({ children }) => {
  const [width, setWidth] = useState("50%");

  return <WidthContext.Provider value={{ width, setWidth }}>{children}</WidthContext.Provider>;
};

const useWidth = () => {
  const context = useContext(WidthContext);
  if (!context) {
    throw new Error("useWidth must be used within a WidthProvider");
  }
  return context;
};

export { WidthProvider, useWidth };
