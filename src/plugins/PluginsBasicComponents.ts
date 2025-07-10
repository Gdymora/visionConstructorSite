import type { Editor } from "grapesjs";
import { commonTraits } from "../configs/traits";
import { ButtonComponent } from "./Basic/ButtonComponent";
import { LinkComponent } from "./Basic/LinkComponent";
import { VideoComponent } from "./Basic/VideoComponent";
import { MapComponent } from "./Basic/MapComponent";
import { TextComponent } from "./Basic/TextComponent"; 
import { ImageComponent } from "./Basic/ImageComponent"; 
import { NavMenuComponent } from "./Basic/NavMenuComponent";

export const PluginsBasicComponents = (editor: Editor) => {
  ButtonComponent(editor, commonTraits);
  LinkComponent(editor, commonTraits);
  NavMenuComponent(editor, commonTraits);
  VideoComponent(editor, commonTraits);
  ImageComponent(editor, commonTraits);
  MapComponent(editor, commonTraits);
  TextComponent(editor, commonTraits); 
  // A block for the custom component 
};
