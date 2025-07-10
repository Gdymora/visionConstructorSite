import type { Editor } from "grapesjs";
import { commonTraits } from "../configs/traits"; 
import { ImageCustomSrcComponent } from "./Image/ImageCustomSrcComponent";

export const PluginsImageComponents = (editor: Editor) => {
  ImageCustomSrcComponent(editor, commonTraits);  
};
