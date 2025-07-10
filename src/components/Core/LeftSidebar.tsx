import * as React from "react";
import { BlocksProvider, LayersProvider, PagesProvider, SelectorsProvider, StylesProvider, TraitsProvider } from "@grapesjs/react";
import { mdiBrush, mdiLayers, mdiViewGridPlus, mdiTextBoxMultiple, mdiCog } from "@mdi/js";
import Icon from "@mdi/react";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useState } from "react";
import CustomSelectorManager from "../CustomSelectorManager";
import { MAIN_BORDER_COLOR, cx } from "../common";
import CustomStyleManager from "../CustomStyleManager";
import CustomTraitManager from "../CustomTraitManager"; 
import CustomLayerManager from "../CustomLayerManager";
import CustomPageManager from "../CustomPageManager";
import CustomSubmenuBlockManager from "./partial/CustomSubmenuBlockManager";
const defaultTabProps = {
  className: "!min-w-0",
};

export default function LeftSidebar({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const [selectedTab, setSelectedTab] = useState(3);

  return (
    <div className={cx("flex flex-col", className)}>
      <Tabs value={selectedTab} onChange={(_, v) => setSelectedTab(v)} variant="fullWidth">
        <Tab {...defaultTabProps} label={<Icon size={1} path={mdiBrush} />} />
        <Tab {...defaultTabProps} label={<Icon size={1} path={mdiCog} />} />
        <Tab {...defaultTabProps} label={<Icon size={1} path={mdiLayers} />} />
        <Tab {...defaultTabProps} label={<Icon size={1} path={mdiViewGridPlus} />} />
        <Tab {...defaultTabProps} label={<Icon size={1} path={mdiTextBoxMultiple} />} />
      </Tabs>
    <div className={cx("overflow-y-auto border-t", MAIN_BORDER_COLOR)} 
     style={{ height: 'calc(100vh - 400px)' }}>   {selectedTab === 0 && (
          <>
            <SelectorsProvider>{(props) => <CustomSelectorManager {...props} />}</SelectorsProvider>
            <StylesProvider>{(props) => <CustomStyleManager {...props} />}</StylesProvider>
          </>
        )}
        {selectedTab === 1 && <TraitsProvider>{(props) => <CustomTraitManager {...props} />}</TraitsProvider>}
        {selectedTab === 2 && <LayersProvider>{(props) => <CustomLayerManager {...props} />}</LayersProvider>}
        {selectedTab === 3 && <BlocksProvider>{(props) => <CustomSubmenuBlockManager {...props} />}</BlocksProvider>}
        {selectedTab === 4 && <PagesProvider>{(props) => <CustomPageManager {...props} />}</PagesProvider>}
      </div>
    </div>
  );
}
