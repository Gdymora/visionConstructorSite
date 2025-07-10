import { useEffect, useState } from "react";
import LeftSidebar from "./LeftSidebar";
import useAxios from "../../Hooks/useAxios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const apiUrl = process.env.REACT_APP_API_URL;
const Sidebar = () => {
  const [isPinned, setIsPinned] = useState(true);

  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState<{
    email: string;
    name: string;
  } | null>(null);
  const { data, error, sendRequest } = useAxios(`${apiUrl}/usetdetail`);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }

    sendRequest(
      "get",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("Sidebar");
  }, []);

  useEffect(() => {
    if (data) {
      setUserDetails(data);
    }
  }, [data]);

  useEffect(() => {
    const errorNow = error;
    if (errorNow) {
      toast.error("Error:", errorNow.message);
    }
  }, [error]);
  const togglePin = () => {
    setIsPinned(!isPinned);
  };

  return (
    <nav
      className={`menu_sb bg-gray-100 text-black flex flex-col space-y-4 dark:bg-gray-700 relative transition-transform duration-300 ${
        isPinned ? "pinned" : ""
      }`}
    >
      <div className="sb_toggle-container p-2">
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={isPinned}
            onChange={togglePin}
          />
          <div className="relative w-8 h-4 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ms-2 text-xs font-medium text-gray-900 dark:text-gray-300">
            📌
          </span>
        </label>
      </div>
      <LeftSidebar
        className={`sb_left_sidebar gjs-column-r w-[300px] border-l`}
      />
      <ul className="sb_logout">
        {isPinned && (
          <button
            className="btn btn-primary"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/");
            }}
          >
            Logout
          </button>
        )}
        {userDetails && (
          <>
            <div className="dropdown-item">Name: {userDetails.name}</div>

            <div className="dropdown-item">Email: {userDetails.email}</div>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Sidebar;
