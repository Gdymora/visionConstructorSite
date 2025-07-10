import { useEditor } from "@grapesjs/react";
const ExportControls = () => {

  // const editor = (window as any).editor; 
  const editor = useEditor();
  const exportHtml = ()=>{
    editor.runCommand('gjs-export-zip');
  }

  return (
    <>
      <li className="px-2 py-2">
        <button onClick={exportHtml}>Html</button>
      </li> 
    </>
  );
};

export default ExportControls;
