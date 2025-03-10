// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";
// import "./Registrar2.css";

// const Registrar2 = () => {
//   const [formData, setFormData] = useState({
//     nombre: "",
//     apellido: "",
//     email: "",
//     contraseña: "", // Cambié "password" por "contraseña"
//     telefono: "",
//   });
//   const [mensaje, setMensaje] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Utiliza la URL base desde el archivo .env (si estás en desarrollo local)
//       const response = await axios.post(
//         `${process.env.REACT_APP_API_URL || "http://localhost:5000"}/registro`, // Cambio en la URL se las variables de entorno .env
//         formData
//       );
//       setMensaje(response.data.message);
//       setTimeout(() => navigate("/login"), 2000);
//     } catch (error) {
//       // Si el error tiene un response, mostramos el error del backend, si no, mostramos el mensaje por defecto
//       const errorMsg = error.response?.data?.error || "Error en el registro";
//       console.error("Error en el registro:", error);  
//       setMensaje(errorMsg);
//     }
//   };

//   return (
//     <div className="register-container">
//       <div className="register-image">
//         <img src="/images/registrarse.jpg" alt="Register-img" />
//       </div>

//       <div className="register-form-container">
//         <h1>Crear Cuenta</h1>
//         <p>Crea tu cuenta en segundos</p>
//         {mensaje && <p>{mensaje}</p>}
//         <form className="register-form" onSubmit={handleSubmit}>
//           <div className="input-group">
//             <input
//               type="text"
//               name="nombre"
//               placeholder="Nombre"
//               value={formData.nombre}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="input-group">
//             <input
//               type="text"
//               name="apellido"
//               placeholder="Apellidos"
//               value={formData.apellido}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="input-group">
//             <input
//               type="email"
//               name="email"
//               placeholder="Dirección correo electrónico"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="input-group">
//             <input
//               type="password"
//               name="contraseña" // Cambié "password" por "contraseña"
//               placeholder="Crear contraseña (mínimo 6 caracteres)"
//               value={formData.contraseña} // Cambié "password" por "contraseña"
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="input-group">
//             <input
//               type="text"
//               name="telefono"
//               placeholder="Teléfono"
//               value={formData.telefono}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="checkbox-group">
//             <input type="checkbox" id="terms" required />
//             <label htmlFor="terms" className="terms-label">
//               Acepto los términos y condiciones
//             </label>
//           </div>
//           <button type="submit" className="btn-create-account">
//             Crear cuenta
//           </button>
//         </form>
//         <p className="member-text">
//           Ya estás registrado?{" "}
//           <Link to="/login" className="login-link">
//             Iniciar Sesión
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Registrar2;

//VERSION N°02 DEL REGISTRAR

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2"; // Importamos SweetAlert
import "./Registrar2.css";

const Registrar2 = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    contraseña: "",
    telefono: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL || "http://localhost:5000"}/registro`,
        formData
      );

      // Mostramos la alerta de éxito
      Swal.fire({
        title: "Registro exitoso",
        text: response.data.message || "Tu cuenta ha sido creada correctamente.",
        icon: "success",
        confirmButtonText: "Iniciar sesión",
      }).then(() => {
        navigate("/login"); // Redirige después de cerrar la alerta
      });

    } catch (error) {
      const errorMsg = error.response?.data?.error || "Error en el registro";
      console.error("Error en el registro:", error);

      // Mostramos una alerta de error con SweetAlert
      Swal.fire({
        title: "Error",
        text: errorMsg,
        icon: "error",
        confirmButtonText: "Intentar de nuevo",
      });
    }
  };

  return (
    <div className="register-container">
      <div className="register-image">
        <img src="/images/registrarse.jpg" alt="Register-img" />
      </div>

      <div className="register-form-container">
        <h1>Crear Cuenta</h1>
        <p>Crea tu cuenta en segundos</p>
        
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              name="apellido"
              placeholder="Apellidos"
              value={formData.apellido}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              name="contraseña"
              placeholder="Crear contraseña (mínimo 6 caracteres)"
              value={formData.contraseña}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              name="telefono"
              placeholder="Teléfono"
              value={formData.telefono}
              onChange={handleChange}
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
  );
};

export default Registrar2;

