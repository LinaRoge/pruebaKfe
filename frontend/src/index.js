import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import axios from "axios";
import { AuthProvider } from "./context/AuthContext";

import AppProvider from "./context/AppProvider";

import ErrorBoundary from "./components/ErrorBoundary";

console.log("Base URL:", process.env.REACT_APP_API_URL);
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

//Mostrar las variables de entorno por consola
console.log("ENV Variables:", import.meta.env || process.env);



ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
  <BrowserRouter>
    <ErrorBoundary>
      <AppProvider>
        <App />
      </AppProvider>
    </ErrorBoundary>
  </BrowserRouter>
  </AuthProvider>
);