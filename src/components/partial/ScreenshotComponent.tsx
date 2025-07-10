import { useRef, useState } from "react";
import html2canvas from "html2canvas";

const ScreenshotComponent = () => {
  const containerRef = useRef(null);
  const [screenshot, setScreenshot] = useState(null);
  const isSelf = false;

  const takeSelfScreenshot = () => {
    if (containerRef.current) {
      html2canvas(containerRef.current).then((canvas) => {
        const url = canvas.toDataURL();
        console.log(url);
      });
    }
  };

  async function download() {
    const element = (window as any).editor.Canvas.getBody(); 
    const canvas = await html2canvas(element);
    canvas.style.display = "none";
    document.body.appendChild(canvas);
    const image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    const a = document.createElement("a");
    a.setAttribute("download", `screenshot.png`);
    a.setAttribute("href", image);
    a.click();
  }

  const takeScreenshot = () => {
    const element = (window as any).editor.Canvas.getBody();
    if (element) {
      html2canvas(element, {
        logging: true,
        useCORS: true,
      }).then((canvas) => {
        const url = canvas.toDataURL();
        console.log(url);
      });
    }
  };

  return (
    (isSelf && (
      <div>
        <div ref={containerRef}>
          <h1>Hello, world!</h1>
          <p>This is a screenshot example.</p>
        </div>
        <button 
          onClick={takeSelfScreenshot}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
          title="Take Screenshot"
        >
          📷
        </button>
      </div>
    )) ||
    (!isSelf && (
      <div className="flex items-center gap-1">      
        <button 
          onClick={takeScreenshot}
          className="p-1 hover:bg-gray-100 rounded transition-colors text-xs"
          title="Take Screenshot"
        >
          📷
        </button>

        <button 
          onClick={() => download()}
          className="px-2 py-1 text-xs bg-blue-50 hover:bg-blue-100 border rounded transition-colors"
          title="Download Screenshot"
        >
          ⬇️
        </button>
      </div>
    ))
  );
};

export default ScreenshotComponent;