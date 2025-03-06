// src/views/vontacto,js
import React, { useState } from "react";
import "./Contacto.css";

const Contacto = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newmensaje = { nombre, email, mensaje };

    try {
      const response = await fetch("https://backendkfe.onrender.com/contacto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newmensaje),
      });
      if (response.ok) {
        // Limpiamos los campos del formulario
        setMensaje("");
        setNombre("");
        setEmail("");
        // Mostrar alerta de éxito
        alert("¡Gracias por enviar tu formulario! Te contactaremos pronto.");
      } else {
        console.error("Error al enviar mensaje");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div className="contact-container">
        <div className="contact-image">
          <img src="/images/contacto.jpg" alt="Contacto" />
        </div>
        <div className="contact-form-container">
          <h1>Contáctanos</h1>
          <p>
            Si tienes alguna pregunta escríbenos a{" "}
            <strong>bazark-fe@bazarkfe.cl</strong>. También puedes rellenar el
            siguiente formulario y ¡nos pondremos en contacto contigo pronto!
          </p>
          <form className="contact-form" onSubmit={handleSubmit}>
            <textarea
              placeholder="Escribe tu mensaje aquí..."
              rows="10"
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              required
            ></textarea>
            <input
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Correo Electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="btn-enviar">
              ENVIAR
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contacto;
