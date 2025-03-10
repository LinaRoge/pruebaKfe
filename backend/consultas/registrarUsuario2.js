// backend/registrarusuario2.js
const bcrypt = require("bcryptjs");
const { pool } = require("../coneccion/coneccion"); // Ajusta la ruta según tu estructura

// Función para verificar si el correo ya existe
const verificarCorreoExistente = async (email) => {
  try {
    const result = await pool.query("SELECT * FROM usuarios WHERE email = $1", [email]);
    return result.rows.length > 0;  // Devuelve true si el correo existe, false si no
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

module.exports = {
  verificarCorreoExistente,
  registrarUsuario,
};
