// import React, { useState, useEffect } from "react";
// import "./Blog.css";

// const BlogVista1 = () => {
//   // Estados para los campos del formulario y los comentarios
//   const [comentario, setComentario] = useState("");
//   const [nombre, setNombre] = useState("");
//   const [email, setEmail] = useState("");
//   const [comentarios, setComentarios] = useState([]);

//   // Al montar el componente, obtenemos los comentarios existentes
//   useEffect(() => {
//     fetchComentarios();
//   }, []);

//   const fetchComentarios = async () => {
//     try {
//       const response = await fetch(
//         `${import.meta.env.VITE_API_URL}/comentarios`
//       );
//       const data = await response.json();
//       setComentarios(data);
//     } catch (error) {
//       console.error("Error fetching comments:", error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const newComentario = { nombre, email, comentario };

//     try {
//       const response = await fetch("http://localhost:5000/comentarios", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(newComentario),
//       });
//       if (response.ok) {
//         // Limpiamos los campos del formulario
//         setComentario("");
//         setNombre("");
//         setEmail("");
//         // Actualizamos la lista de comentarios
//         fetchComentarios();
//       } else {
//         console.error("Error al enviar comentario");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <div className="blog-container">
//       {/* Navbar */}
//       {/* <Navbar /> */}

//       {/* Encabezado */}
//       <header className="blog-header">Bazar K-FE BLOG</header>

//       {/* Sección de Imágenes */}
//       <div className="blog-images">
//         <img src="/images/01_Blog.png" alt="Imagen 1" className="blog-image" />
//         <img src="/images/02_Blog.png" alt="Imagen 2" className="blog-image" />
//       </div>

//       {/* Sección de Texto en 3 Columnas */}
//       <div className="blog-text">
//         {/* Aquí va el contenido textual del blog */}
//       </div>

//       {/* Formulario de Comentarios */}
//       <div className="contact-form-container">
//         <h1>Cuentanos tu opinión</h1>
//         <p>
//           Dejanos tus comentarios. Su dirección de correo electrónico no será
//           publicada
//         </p>
//         <form className="contact-form" onSubmit={handleSubmit}>
//           <textarea
//             placeholder="Escribe tu comentario aquí..."
//             rows="10"
//             required
//             value={comentario}
//             onChange={(e) => setComentario(e.target.value)}
//           ></textarea>
//           <input
//             type="text"
//             placeholder="Nombre"
//             required
//             value={nombre}
//             onChange={(e) => setNombre(e.target.value)}
//           />
//           <input
//             type="email"
//             placeholder="Correo Electrónico"
//             required
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <button type="submit" className="btn-enviar">
//             PUBLICAR COMENTARIO
//           </button>
//         </form>
//       </div>

//       {/* Visualización de Comentarios */}
//       <div className="comentarios-lista">
//         <h2>Opiniones Recibidas</h2>
//         {comentarios.length > 0 ? (
//           comentarios.map((com, index) => (
//             <div key={index} className="comentario">
//               <p>
//                 <strong>{com.nombre}</strong>
//               </p>
//               <p>{com.comentario}</p>
//             </div>
//           ))
//         ) : (
//           <p>No hay opiniones aún.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BlogVista1;

//VERSION N°02 DE BLOGVISTA1

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Blog.css";

const BlogVista1 = () => {
  // Estados para los campos del formulario y los comentarios
  const [comentario, setComentario] = useState("");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [comentarios, setComentarios] = useState([]);

  // Al montar el componente, obtenemos los comentarios existentes
  useEffect(() => {
    fetchComentarios();
  }, []);

  const fetchComentarios = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL || "http://localhost:5000"}/comentarios`
      );
      setComentarios(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newComentario = { nombre, email, comentario };
  
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL || "http://localhost:5000"}/comentarios`,
        newComentario,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // Si la respuesta es exitosa, axios no lanzará error
      // Puedes validar el status si lo consideras necesario, por ejemplo:
      if (response.status === 200 || response.status === 201) {
        // Limpiamos los campos del formulario
        setComentario("");
        setNombre("");
        setEmail("");
        // Actualizamos la lista de comentarios
        fetchComentarios();
      } else {
        console.error("Error al enviar comentario");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  return (
    <div className="blog-container">
      {/* Encabezado */}
      <header className="blog-header">Bazar K-FE BLOG</header>

      {/* Sección de Imágenes */}
      <div className="blog-images">
        <img src="/images/01_Blog.png" alt="Imagen 1" className="blog-image" />
        <img src="/images/02_Blog.png" alt="Imagen 2" className="blog-image" />
      </div>

      {/* Sección de Texto en 3 Columnas */}
      <div className="blog-text">
        {/* Aquí va el contenido textual del blog */}
      </div>

      {/* Formulario de Comentarios */}
      <div className="contact-form-container">
        <h1>Cuéntanos tu opinión</h1>
        <p>
          Déjanos tus comentarios. Su dirección de correo electrónico no será
          publicada.
        </p>
        <form className="contact-form" onSubmit={handleSubmit}>
          <textarea
            placeholder="Escribe tu comentario aquí..."
            rows="10"
            required
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
          ></textarea>
          <input
            type="text"
            placeholder="Nombre"
            required
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <input
            type="email"
            placeholder="Correo Electrónico"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className="btn-enviar">
            PUBLICAR COMENTARIO
          </button>
        </form>
      </div>

      {/* Visualización de Comentarios */}
      <div className="comentarios-lista">
        <h2>Opiniones Recibidas</h2>
        {comentarios.length > 0 ? (
          comentarios.map((com, index) => (
            <div key={index} className="comentario">
              <p>
                <strong>{com.nombre}</strong>
              </p>
              <p>{com.comentario}</p>
            </div>
          ))
        ) : (
          <p>No hay opiniones aún.</p>
        )}
      </div>
    </div>
  );
};

export default BlogVista1;
