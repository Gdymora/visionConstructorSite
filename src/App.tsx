import { Routes, Route, BrowserRouter as Router, Navigate, useNavigate } from "react-router-dom";
import "./App.css";
import "./assets/style/style.css";
import "./assets/style/style_home.css";
import './assets/style/icons.min.css';
import './assets/style/modal_window.css';
import './assets/style/bootstrap.css';
//import "bootstrap/dist/css/bootstrap.min.css";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login"; 
import { useEffect } from "react";
import ControlPanel from "./components/ControlPanel/ControlPanel";
import TemplatesPanel from "./components/TemplatesPanel/TemplatesPanel";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MediaPanel from "./components/MediaPanel/MedialPanel";
import Editor from "./Editor";
import Home from "./components/Home/Home";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("token") !== null;

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (!isAuthenticated) {
          navigate("/");
          return;
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchUserDetails();
  }, []);

  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  /* useEffect(() => {
    const unloadHandler = (event) => {
      event.preventDefault();
      event.returnValue = "";
      const confirmationMessage = "Before you leave, please make sure all your data is saved. Otherwise, it will be lost.";
      return confirmationMessage;
    };
    window.addEventListener("beforeunload", unloadHandler);
    return () => {
      // Прибирання обробника події перед видаленням компонента
      window.removeEventListener("beforeunload", unloadHandler);
    };
  }, []); */

  return (
    <Router>
      <div className="app">
        <ToastContainer /> {/* Контейнер для сповіщень */}
        <Routes>
          {/*  <Route path="/" element={<Index />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/app"
            element={
              <PrivateRoute>
                <Editor />
              </PrivateRoute>
            }
          />         
          <Route
            path="/templates-panel"
            element={
              <PrivateRoute>
                <TemplatesPanel />
              </PrivateRoute>
            }
          />
          <Route
            path="/control-panel"
            element={
              <PrivateRoute>
                <ControlPanel />
              </PrivateRoute>
            }
          />
          <Route
            path="/media-panel"
            element={
              <PrivateRoute>
                <MediaPanel />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
