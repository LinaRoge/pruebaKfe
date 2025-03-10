// ///server.js

// const express = require("express");
// const bcrypt = require("bcryptjs");
// const { pool } = require("./coneccion/coneccion"); // Ajusta la ruta según tu estructura
// const { body, validationResult } = require("express-validator"); // Importar express-validator para validación
// const app = express();
// const PORT = process.env.PORT_SERVER || 5000;
// const cors = require('cors');

// // Función para verificar si el correo ya existe
// const verificarCorreoExistente = async (email) => {
//   try {
//     const result = await pool.query("SELECT * FROM usuarios WHERE email = $1", [email]);
//     return result.rows.length > 0;  // Devuelve true si el correo existe, false si no
//   } catch (error) {
//     console.error("Error al verificar correo:", error);
//     throw new Error("Error al verificar el correo");
//   }
// };

// // Registrar usuario
// const registrarUsuario = async ({ nombre, apellido, email, contraseña, telefono }) => {
//   try {
//     const result = await pool.query(
//       "INSERT INTO usuarios (nombre, apellido, email, contraseña, telefono) VALUES ($1, $2, $3, $4, $5) RETURNING *",
//       [nombre, apellido, email, contraseña, telefono]
//     );
//     return result.rows[0]; // Devuelve el usuario registrado
//   } catch (error) {
//     console.error("Error al registrar usuario:", error.message);
//     throw new Error("Error al registrar usuario");
//   }
// };

// // Middleware para parsear JSON
// app.use(express.json());

// //CORS para todas las solicitudes

// app.use(cors());

// // Ruta POST /registro para registrar nuevos usuarios
// app.post(
//   "/registro",
//   [
//     body("nombre").isString().notEmpty(),
//     body("apellido").isString().notEmpty(),
//     body("email").isEmail(),
//     body("telefono").isString().notEmpty(),
//     body("contraseña").isString().isLength({ min: 6 }),
//   ],
//   async (req, res) => {
//     // Validar los datos
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const { nombre, apellido, email, contraseña, telefono } = req.body;

//     try {
//       // Verificar si el correo ya está registrado
//       const usuarioExistente = await verificarCorreoExistente(email);
//       if (usuarioExistente) {
//         return res.status(400).json({ error: "El correo electrónico ya está registrado" });
//       }

//       // Encriptar la contraseña
//       const salt = await bcrypt.genSalt(10);
//       const passwordEncriptada = await bcrypt.hash(contraseña, salt);

//       // Registrar usuario si no existe
//       const usuarioRegistrado = await registrarUsuario({
//         nombre,
//         apellido,
//         email,
//         contraseña: passwordEncriptada,
//         telefono,
//       });

//       res.status(201).json({ message: "Usuario registrado correctamente", usuario: usuarioRegistrado });
//     } catch (error) {
//       console.error("Error en el registro:", error.message);
//       res.status(500).json({ error: "Error en el registro" });
//     }
//   }
// );

// // Iniciar servidor
// app.listen(PORT, () => {
//   console.log(`Servidor corriendo en el puerto ${PORT}`);
// });

const express = require("express");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const { pool } = require("./coneccion/coneccion"); // Ajusta la ruta según tu estructura
const { body, validationResult } = require("express-validator"); // Importar express-validator para validación
const { iniciarSesion } = require("./consultas/iniciarSesion"); // Importar la función de inicio de sesión
const app = express();
const PORT = process.env.PORT_SERVER || 3000;

// Middleware para parsear JSON y habilitar CORS
app.use(express.json());
app.use(cors());

// Función para verificar si el correo ya existe
const verificarCorreoExistente = async (email) => {
  try {
    const result = await pool.query("SELECT * FROM usuarios WHERE email = $1", [email]);
    return result.rows.length > 0; // Devuelve true si el correo existe, false si no
  } catch (error) {
    console.error("Error al verificar correo:", error);
    throw new Error("Error al verificar el correo");
  }
};

// Registrar usuario
const registrarUsuario = async ({ nombre, apellido, email, contraseña, telefono }) => {
  try {
    const result = await pool.query(
      "INSERT INTO usuarios (nombre, apellido, email, contraseña, telefono) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [nombre, apellido, email, contraseña, telefono]
    );
    return result.rows[0]; // Devuelve el usuario registrado
  } catch (error) {
    console.error("Error al registrar usuario:", error.message);
    throw new Error("Error al registrar usuario");
  }
};

// Ruta POST /registro para registrar nuevos usuarios
app.post(
  "/registro",
  [
    body("nombre").isString().notEmpty(),
    body("apellido").isString().notEmpty(),
    body("email").isEmail(),
    body("telefono").isString().notEmpty(),
    body("contraseña").isString().isLength({ min: 6 }),
  ],
  async (req, res) => {
    // Validar los datos
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { nombre, apellido, email, contraseña, telefono } = req.body;

    try {
      // Verificar si el correo ya está registrado
      const usuarioExistente = await verificarCorreoExistente(email);
      if (usuarioExistente) {
        return res.status(400).json({ error: "El correo electrónico ya está registrado" });
      }

      // Encriptar la contraseña
      const salt = await bcrypt.genSalt(10);
      const passwordEncriptada = await bcrypt.hash(contraseña, salt);

      // Registrar usuario si no existe
      const usuarioRegistrado = await registrarUsuario({
        nombre,
        apellido,
        email,
        contraseña: passwordEncriptada,
        telefono,
      });

      res.status(201).json({ message: "Usuario registrado correctamente", usuario: usuarioRegistrado });
    } catch (error) {
      console.error("Error en el registro:", error.message);
      res.status(500).json({ error: "Error en el registro" });
    }
  }
);

// Ruta POST /login para iniciar sesión
app.post(
  "/login",
  [body("email").isEmail(), body("contraseña").isString().notEmpty()],
  async (req, res) => {
    // Validar los datos de entrada
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, contraseña } = req.body;

    try {
      const usuario = await iniciarSesion({ email, contraseña });
      res.status(200).json({ message: "Inicio de sesión exitoso", usuario });
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
      res.status(401).json({ error: error.message });
    }
  }
);

//FORMULARIO DE CONTACTO

// Endpoint para recibir mensajes de contacto
app.post("/contacto", async (req, res) => {
  console.log("Solicitud recibida en /contacto");
  const { nombre, email, mensaje } = req.body;

  // Validar que se reciban todos los campos
  if (!nombre || !email || !mensaje) {
    return res.status(400).json({ error: "Todos los campos son requeridos." });
  }

  try {
    // Insertar el mensaje de contacto en la base de datos
    const result = await pool.query(
      "INSERT INTO contacto (nombre, email, mensaje) VALUES ($1, $2, $3) RETURNING *",
      [nombre, email, mensaje]
    );
    res.status(201).json({
      message: "Mensaje enviado correctamente",
      contacto: result.rows[0],
    });
  } catch (err) {
    console.error("Error al insertar contacto:", err);
    res.status(500).json({ error: "Error al insertar contacto." });
  }
});

// RUTA PARA INSERTAR UN COMENTARIO
app.post("/comentarios", async (req, res) => {
  const { nombre, email, comentario } = req.body;
  // Verifica que se hayan enviado todos los campos
  if (!nombre || !email || !comentario) {
    return res.status(400).json({ error: "Todos los campos son requeridos." });
  }
  try {
    const result = await pool.query(
      "INSERT INTO comentarios (nombre, email, comentario) VALUES ($1, $2, $3) RETURNING *",
      [nombre, email, comentario]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error al insertar comentario:", err);
    res.status(500).json({ error: "Error al insertar comentario." });
  }
});

// RUTA PARA OBTENER COMENTARIOS (solo nombre y comentario)
app.get("/comentarios", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT nombre, comentario FROM comentarios ORDER BY fecha_envio DESC"
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error al obtener comentarios:", err);
    res.status(500).json({ error: "Error al obtener comentarios." });
  }
});


// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

