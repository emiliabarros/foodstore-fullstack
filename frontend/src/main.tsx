import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { IngredientesProvider } from "./context/IngredientesContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <IngredientesProvider>
        <App />
      </IngredientesProvider>
    </AuthProvider>
  </React.StrictMode>
);
