// consultas/contacto.js
const pool = require("../coneccion"); // Asegúrate de importar tu conexión a la base de datos

const insertarContacto = async (nombre, email, mensaje) => {
  try {
    const result = await pool.query(
      "INSERT INTO contacto (nombre, email, mensaje) VALUES ($1, $2, $3) RETURNING *",
      [nombre, email, mensaje]
    );
    return result.rows[0]; // Retorna el primer contacto insertado
  } catch (err) {
    throw new Error("Error al insertar contacto: " + err.message); // Propaga el error
  }
};
