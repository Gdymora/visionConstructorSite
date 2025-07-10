import { Canvas } from "@grapesjs/react";
import { useWidth } from "../../providers/WidthProvider";

const MainContent = () => {
  const { width } = useWidth();

  return (
    <main className="flex-1">
      <div className="w-full h-full flex justify-center items-center bg-white dark:bg-gray-800 dark:text-white transition-colors highlight p-4">
        <Canvas
          className="gjs-custom-editor-canvas"
          style={{ 
            width: width || "80%",
            maxWidth: "1200px", // Обмежуємо максимальну ширину
            minWidth: "600px",  // Мінімальна ширина
            height: "calc(100vh - 140px)",
            overflowY: "auto"
          }}
        />
      </div>
    </main>
  );
};

export default MainContent;