import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Registrarse.css";
import axios from "axios"; // Utilizando axios para las peticiones
import Swal from "sweetalert2";

function Register() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [telefono, setTelefono] = useState("");
  const navigate = useNavigate(); // Hook para redirección

  // Función para verificar si el email ya está registrado
  async function verificarCorreoExistente(email) {
    try {
      const response = await axios.get(`/verificar-email?email=${email}`);
      return response.data.existe; // true si el correo ya está en la base de datos
    } catch (error) {
      console.error("Error al verificar el correo:", error);
      return false; // En caso de error, permitir el registro
    }
  }

  async function registrarse(event) {
    event.preventDefault();

    // Validar que la contraseña tenga al menos 6 caracteres
    if (password.length < 6) {
      Swal.fire(
        "Error",
        "La contraseña debe tener al menos 6 caracteres",
        "error"
      );
      return;
    }

    // Verificar si el email ya está registrado
    const emailExiste = await verificarCorreoExistente(email);
    if (emailExiste) {
      Swal.fire("Error", "El usuario ya está registrado", "error");
      return;
    }

    const userData = {
      nombre,
      apellido,
      email,
      telefono,
      password,
    };

    try {
      const response = await axios.post("/registro", userData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data.error) {
        Swal.fire("Error", response.data.error, "error");
      } else {
        Swal.fire(
          "¡Cuenta creada!",
          "Tu cuenta fue creada con éxito.",
          "success"
        );
        navigate("/login"); // Redirige tras el registro
      }
    } catch (error) {
      console.error("Error al registrar:", error);
      Swal.fire("Error", "Hubo un problema al registrar la cuenta", "error");
    }
  }

  return (
    <div>
      <div className="register-container">
        <div className="register-image">
          <img src="/images/registrarse.jpg" alt="Register-img" />
        </div>

        <div className="register-form-container">
          <h1>Crear Cuenta</h1>
          <p>Crea tu cuenta en segundos</p>
          <form className="register-form" onSubmit={registrarse}>
            <div className="input-group">
              <input
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="text"
                placeholder="Apellidos"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="email"
                placeholder="Dirección correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                placeholder="Crear contraseña (mínimo 6 caracteres)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="text"
                placeholder="Teléfono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                required
              />
            </div>
            <div className="checkbox-group">
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms" className="terms-label">
                Acepto los términos y condiciones
              </label>
            </div>
            <button type="submit" className="btn-create-account">
              Crear cuenta
            </button>
          </form>
          <p className="member-text">
            Ya estás registrado?{" "}
            <Link to="/login" className="login-link">
              Iniciar Sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
