const BodyStyle = () => {
  const editor = (window as any).editor;

  const setBodyStyle = () => {
    editor.setStyle("body { overflow-x: auto; overflow-y: auto;}");
  };

  return (
    <button 
      className="px-2 py-1 text-xs bg-purple-50 hover:bg-purple-100 border rounded transition-colors" 
      type="button" 
      onClick={() => setBodyStyle()}
      title="Set Body Style"
    >
      📄
    </button>
  );
};

export default BodyStyle;