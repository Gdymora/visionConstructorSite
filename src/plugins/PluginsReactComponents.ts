import type { Editor } from "grapesjs";
import { commonTraits } from "../configs/traits";
import { ListingComponent } from "./ReactComponents/components/ListingComponents/ListingComponent";
import BaseReactComponent from "./ReactComponents/BaseReactComponent";
import { BabylonComponent } from "./ReactComponents/components/BabylonComponent/BabylonComponent";
import { ThreeJsComponent } from "./ReactComponents/components/ThreeJsComponent/ThreeJsComponent";

export const PluginsReactComponents = (editor: Editor) => {
  BaseReactComponent(editor);
  ListingComponent(editor, commonTraits);
  BabylonComponent(editor, commonTraits);
  ThreeJsComponent(editor, commonTraits);
};
