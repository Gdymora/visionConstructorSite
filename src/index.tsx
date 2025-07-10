import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import "bootstrap";
import "@fortawesome/fontawesome-free/css/all.min.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store from "./store";
import { AuthProvider } from "./components/Auth/AuthProvider.tsx";
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Provider>
  </StrictMode>
);
