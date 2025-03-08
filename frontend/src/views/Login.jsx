import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import Swal from "sweetalert2";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Submitting form with:", { email, password });

    try {
      const response = await axios.post("/login", { email, password });
      console.log("Respuesta del servidor:", response);

      if (response.data.token && response.data.user) {
        console.log("Token recibido:", response.data.token);
        console.log("Usuario recibido:", response.data.user);

        // Guardar token y datos del usuario en localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        // Redirigir al usuario
        Swal.fire(
          "¡Bienvenido!",
          `Bienvenido, ${response.data.user.nombre}`,
          "success"
        );
        navigate("/"); // Redirigir a la página principal
      } else {
        Swal.fire("Error", "Las credenciales son incorrectas", "error");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      Swal.fire(
        "Error",
        error.response?.data?.error || "Hubo un problema con el servidor.",
        "error"
      );
    }
  };

  return (
    <div className="page-container">
      <div className="login-container">
        <div className="login-image">
          <img src="/images/login.jpg" alt="Login" />
        </div>

        <div className="login-form-container">
          <h1>Iniciar Sesión</h1>
          <p>Ingresa tus datos</p>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="checkbox-group">
              <input type="checkbox" id="keepLoggedIn" />
              <label htmlFor="keepLoggedIn" className="terms-label">
                Mantenerme conectado
              </label>
            </div>
            <Link to="/forgot-password" className="forget-password">
              He olvidado mi contraseña
            </Link>
            <div>
              <button type="submit" className="btn-login">
                Iniciar Sesión
              </button>
            </div>
          </form>
          <p className="member-text">
            ¿No tienes cuenta?{" "}
            <Link to="/registro" className="signup-link">
              Registrarse
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
