import { useRef, useState } from 'react';
import { toPng } from 'html-to-image';

const ScreenshotImageComponent = () => {
    const containerRef = useRef(null);
    const [screenshot, setScreenshot] = useState(null);
    const isSelf = false;

    const takeSelfScreenshot = () => {
        if (containerRef.current) {
            toPng(containerRef.current, { cacheBust: true })
                .then((dataUrl) => {
                    console.log(dataUrl);
                })
                .catch((error) => {
                    console.error('Error taking screenshot:', error);
                });
        }
    };

    const download = async () => {
        const element = (window as any).editor.Canvas.getBody();
        const dataUrl = await toPng(element, { cacheBust: true });
        const a = document.createElement('a');
        a.setAttribute('download', 'screenshot-hq.png');
        a.setAttribute('href', dataUrl.replace('image/png', 'image/octet-stream'));
        a.click();
    };

    const takeScreenshot = () => {
        const element = (window as any).editor.Canvas.getBody();
        if (element) {
            toPng(element, { cacheBust: true })
                .then((dataUrl) => {
                    console.log(dataUrl);
                })
                .catch((error) => {
                    console.error('Error taking screenshot:', error);
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
                    title="Take HQ Screenshot"
                >
                    📸
                </button>
            </div>
        )) ||
        (!isSelf && (
            <div className="flex items-center gap-1">
                <button 
                    onClick={takeScreenshot}
                    className="p-1 hover:bg-gray-100 rounded transition-colors text-xs"
                    title="Take HQ Screenshot"
                >
                    📸
                </button>

                <button 
                    onClick={() => download()}
                    className="px-2 py-1 text-xs bg-green-50 hover:bg-green-100 border rounded transition-colors"
                    title="Download HQ Screenshot"
                >
                    💾
                </button>
            </div>
        ))
    );
};

export default ScreenshotImageComponent;