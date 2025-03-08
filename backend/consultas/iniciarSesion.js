require("dotenv").config();
const { pool } = require("../coneccion/coneccion");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const iniciarSesion = async (datos) => {
  const { email, password } = datos;

  const consulta = `
    SELECT * FROM usuarios
    WHERE email = $1;
  `;

  try {
    // Realizar la consulta a la base de datos
    const { rows } = await pool.query(consulta, [email]);

    // Si no encontramos al usuario
    if (rows.length === 0) {
      throw new Error("Usuario no encontrado");
    }

    const usuario = rows[0];

    // Depurar los valores
    console.log("Contraseña ingresada:", password); // Contraseña proporcionada por el usuario
    console.log("Contraseña cifrada en la base de datos:", usuario.contraseña); // Contraseña cifrada en la base de datos

    // Compara la contraseña proporcionada con la almacenada (cifrada)
    const esValida = await bcrypt.compare(password, usuario.contraseña);

    console.log("Contraseña válida:", esValida); // Resultado de la comparación

    if (!esValida) {
      throw new Error("Contraseña incorrecta");
    }

    // Generamos el token JWT
    const token = jwt.sign(
      { id_usuario: usuario.id_usuario, email: usuario.email },
      process.env.SECRET_JWT_KEY, // La clave secreta del JWT
      { expiresIn: "1h" }
    );

    // Si el token se genera correctamente, lo logueamos
    console.log("Token generado:", token); // Asegúrate de que este mensaje sea claro
    console.log("Usuario:", usuario);
    // Retornamos el token y el usuario en la respuesta
    return { token, usuario }; // Ahora el usuario también es devuelto
  } catch (error) {
    // Loguea el error para depuración
    console.error("Error en el inicio de sesión:", error);

    // Lanza un error con un mensaje personalizado
    throw new Error(error.message || "Error al procesar la solicitud");
  }
};
// Función para cerrar sesión
// simplemente elimina la cookie que contiene el token JWT, cerrando efectivamente la sesión del usuario.
const cerrarSesion = (req, res) => {
  return res
    .clearCookie("access_token")
    .json({ message: "Sesión cerrada exitosamente" });
};

(module.exports = iniciarSesion), cerrarSesion;
