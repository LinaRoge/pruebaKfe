import React from "react";
import { Link } from "react-router-dom"; // Importamos Link para redirigir al usuario
import "./DetallePago.css"; // Puedes agregar estilos adicionales si lo deseas

export const DetallePago = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">Lo sentimos!</h1>
      <p className="not-found-message">
        Estimado cliente nuestra página se encuentra en manteniemto.
      </p>
      <Link to="/" className="not-found-home-button">
        Volver al inicio
      </Link>
    </div>
  );
};
