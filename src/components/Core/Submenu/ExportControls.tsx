import { useEditor } from "@grapesjs/react";

const ExportControls = () => {
  const editor = useEditor();

  const exportHtml = () => {
    try {
      editor.runCommand('gjs-export-zip');
    } catch (error) {
      console.error('Error exporting HTML:', error);
    }
  };

  const exportReact = () => {
    try {
      editor.runCommand('gjs-export-react');
    } catch (error) {
      console.error('Error exporting React:', error);
    }
  };

  // Додатковий метод для отримання React проекту як blob (без скачування)
  const getReactProjectBlob = async () => {
    try {
      const blob = await editor.createReactProjectZip();
      console.log('React project blob created:', blob);
      return blob;
    } catch (error) {
      console.error('Error creating React project blob:', error);
      throw error;
    }
  };

  return (
    <>
      <li className="px-2 py-2">
        <button 
          onClick={exportHtml}
          className="w-full text-left hover:bg-gray-100 px-2 py-1 rounded"
          title="Export as HTML/CSS/JS project"
        >
          HTML
        </button>
      </li> 
      <li className="px-2 py-2">
        <button 
          onClick={exportReact}
          className="w-full text-left hover:bg-gray-100 px-2 py-1 rounded"
          title="Export as React TypeScript project with Tailwind CSS"
        >
          React
        </button>
      </li>
    </>
  );
};

export default ExportControls;