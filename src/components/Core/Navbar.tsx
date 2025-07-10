import { useState } from "react";
import ProjectControls from "./Submenu/ProjectControls";
import TemplatesPanel from "../TemplatesPanel/TemplatesPanel";
import ControlPanel from "../ControlPanel/ControlPanel";
import ModalCustom from "../partial/ModalCustom";
import MediaPanel from "../MediaPanel/MedialPanel";
import ExportControls from "./Submenu/ExportControls";
import { WithEditor } from "@grapesjs/react";
import SideModal from "../partial/SideModal";
import BlockCategoriesManager from "./partial/BlockCategoriesManager";

const Navbar = () => {
  const [templatesPanelVisible, setTemplatesPanelVisible] = useState(false);
  const [controlPanelVisible, setControlPanelVisible] = useState(false);
  const [mediaVisible, setMediaVisible] = useState(false);
  const [blockVisible, setBlockVisible] = useState(false);

  const closeControlPanelVisible = () => setControlPanelVisible(false);
  const closeTemplatesPanelVisible = () => setTemplatesPanelVisible(false);
  const closeMediaVisible = () => setMediaVisible(false);

  return (
    <div className="ml-4">
      <ul className="top-nav flex justify-start">
        <li className="m-1">
          File
          <ul className="sub">
            <ProjectControls />
          </ul>
        </li>
        <li className="m-1">
          <button>Export</button>
          <ul className="sub">
            <WithEditor>
              <ExportControls />
            </WithEditor>
          </ul>
        </li>
        <li className="m-1">
          <button onClick={() => setControlPanelVisible(true)}>
            Control panel
          </button>
        </li>
        <li className="m-1">
          <button onClick={() => setTemplatesPanelVisible(true)}>
            Template panel
          </button>
        </li>
        <li className="m-1">
          <button onClick={() => setMediaVisible(true)}>Media panel</button>
        </li>
        <li className="m-1">
          <button onClick={() => setBlockVisible(true)}>Blocks</button>
        </li> 
      </ul>

      {templatesPanelVisible && (
        <ModalCustom
          isOpen={templatesPanelVisible}
          closeModal={closeTemplatesPanelVisible}
          text={{ title: "Open Template" }}
          maxW={"max-w-6xl"}
        >
          <TemplatesPanel />
        </ModalCustom>
      )}

      {controlPanelVisible && (
        <ModalCustom
          isOpen={controlPanelVisible}
          closeModal={closeControlPanelVisible}
          text={{ title: "Open Control" }}
          maxW={"max-w-7xl"}
        >
          <ControlPanel />
        </ModalCustom>
      )}
      {mediaVisible && (
        <ModalCustom
          isOpen={mediaVisible}
          closeModal={closeMediaVisible}
          text={{ title: "Open Media" }}
          maxW={"max-w-7xl"}
        >
          <MediaPanel />
        </ModalCustom>
      )}

      {blockVisible && (
        <SideModal
          isOpen={blockVisible}
          onClose={() => setBlockVisible(false)}
          title="Blocks"
          position="right"
          width="max-w-3xl"
        >
          <BlockCategoriesManager
            categories={["Header", "Content", "Features", "Gallery", "Contact"]}
          />
        </SideModal>
      )}
    </div>
  );
};

export default Navbar;
