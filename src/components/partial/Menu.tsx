import MenuDashboard from "../Dashboard/MenuDashboard";
import { faPaste, faFileWord, faImage } from "@fortawesome/free-regular-svg-icons";
import LinkWithIcon from "./LinkWithIcon";
const Menu = ({ title }) => {
  const isDashboard = title === "Dashboard";
  const isControlPanel = title === "Control Panel";
  const isTemplatePanel = title === "Templates Panel";
  const isMediaPanel = title === "Templates Panel";

  return (
    <>
      <div className="flex-1 overflow-y-auto bg-slate-900">
        <nav className="space-y-1">
          <div className="text-white items-center p-1 pt-3 min-h-[48px] border-l border-slate-500">{title}</div>
          <div className="border-b border-white"></div>
          {/* Dashboard */}
          {!isDashboard && (
            <>
              <LinkWithIcon href="/dashboard" icon={faPaste} text="Dashboard" />
            </>
          )}
          {/* Push Dashboard Menu */}
          {isDashboard && <MenuDashboard />}
          {/* Control Panel */}
          {!isControlPanel && !isDashboard && (
            <>
              <LinkWithIcon href="/control-panel" icon={faFileWord} text="ControlPanel" />
            </>
          )}
          {/* Template Panel */}
          {!isTemplatePanel && !isDashboard && (
            <>
              <LinkWithIcon href="/templates-panel" icon={faImage} text="TemplatesPanel" />
              <div className="border-b border-white"></div>
            </>
          )}
          {/* Template Panel */}
          {!isMediaPanel && !isDashboard && (
            <>
              <LinkWithIcon href="/media-panel" icon={faImage} text="MediaPanel" />
              <div className="border-b border-white"></div>
            </>
          )}
        </nav>
      </div>
    </>
  );
};

export default Menu;
