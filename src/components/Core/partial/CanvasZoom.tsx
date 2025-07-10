const CanvasZoom = () => {
  const editor = (window as any).editor;

  const setZoom = (operation) => {
    const stepZoom = 10;
    const zoom = editor.Canvas.getZoom();
    editor.Canvas.setZoom(operation === "plus" ? zoom + stepZoom : zoom - stepZoom);
  };

  return (
    <div className="flex items-center gap-1">
      <button 
        className="px-2 py-1 text-xs bg-gray-50 hover:bg-gray-100 border rounded-l transition-colors" 
        type="button" 
        onClick={() => setZoom("plus")}
        title="Zoom In"
      >
        ➕
      </button>
      <button 
        className="px-2 py-1 text-xs bg-gray-50 hover:bg-gray-100 border rounded-r transition-colors" 
        type="button" 
        onClick={() => setZoom("minus")}
        title="Zoom Out"
      >
        ➖
      </button>
    </div>
  );
};

export default CanvasZoom;