import type { Editor } from "grapesjs";
import { commonTraits } from "../configs/traits";

import { FetchProductListingsComponent } from "./Fetch/FetchProductListingComponent";
import { FetchTableBlockComponent } from "./Fetch/FetchTableBlockComponent";
import { FetchItemsComponent } from "./Fetch/FetchItems";
export const PluginsFetchComponents = (editor: Editor) => {
    FetchTableBlockComponent(editor, commonTraits);
    FetchProductListingsComponent(editor, commonTraits);
    FetchItemsComponent(editor, commonTraits);
};
