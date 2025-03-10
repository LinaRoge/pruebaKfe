// require("dotenv").config();
// const { pool } = require("../coneccion/coneccion");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");

// const iniciarSesion = async (datos) => {
//   const { email, contraseña } = datos;

//   const consulta = `
//     SELECT * FROM usuarios
//     WHERE email = $1;
//   `;

//   try {
//     // Realizar la consulta a la base de datos
//     const { rows } = await pool.query(consulta, [email]);

//     // Si no encontramos al usuario
//     if (rows.length === 0) {
//       throw new Error("Usuario no encontrado");
//     }

//     const usuario = rows[0];

//     // Depurar los valores
//     console.log("Contraseña ingresada:", contraseña); // Contraseña proporcionada por el usuario
//     console.log("Contraseña cifrada en la base de datos:", usuario.contraseña); // Contraseña cifrada en la base de datos

//     // Compara la contraseña proporcionada con la almacenada (cifrada)
//     const esValida = await bcrypt.compare(contraseña, usuario.contraseña);

//     console.log("Contraseña válida:", esValida); // Resultado de la comparación

//     if (!esValida) {
//       throw new Error("Contraseña incorrecta");
//     }

//     // Generamos el token JWT
//     const token = jwt.sign(
//       { id_usuario: usuario.id_usuario, email: usuario.email },
//       process.env.SECRET_JWT_KEY, // La clave secreta del JWT
//       { expiresIn: "1h" }
//     );

//     // Si el token se genera correctamente, lo logueamos
//     console.log("Token generado:", token); // Asegúrate de que este mensaje sea claro
//     console.log("Usuario:", usuario);
//     // Retornamos el token y el usuario en la respuesta
//     return { token, usuario }; // Ahora el usuario también es devuelto
//   } catch (error) {
//     // Loguea el error para depuración
//     console.error("Error en el inicio de sesión:", error);

//     // Lanza un error con un mensaje personalizado
//     throw new Error(error.message || "Error al procesar la solicitud");
//   }
// };
// // Función para cerrar sesión
// // simplemente elimina la cookie que contiene el token JWT, cerrando efectivamente la sesión del usuario.
// const cerrarSesion = (req, res) => {
//   return res
//     .clearCookie("access_token")
//     .json({ message: "Sesión cerrada exitosamente" });
// };

// (module.exports = iniciarSesion), cerrarSesion;

const bcrypt = require("bcryptjs");
const { pool } = require("../coneccion/coneccion"); // Ajusta la ruta según tu estructura
const jwt = require("jsonwebtoken");

const iniciarSesion = async ({ email, contraseña }) => {
  try {
    // Buscar el usuario por email
    const result = await pool.query("SELECT * FROM usuarios WHERE email = $1", [email]);

    if (result.rows.length === 0) {
      throw new Error("Correo o contraseña incorrectos");
    }

    const usuario = result.rows[0];

    // Comparar la contraseña ingresada con la almacenada en la base de datos
    const contraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña);

    if (!contraseñaValida) {
      throw new Error("Correo o contraseña incorrectos");
    }

    // Generar un token JWT (opcional)
    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      "secreto", // Usa una clave secreta segura
      { expiresIn: "1h" } // Token expira en 1 hora
    );

    // Retornar los datos del usuario sin la contraseña y con el token
    return { id: usuario.id, nombre: usuario.nombre, email: usuario.email, token };
  } catch (error) {
    console.error("Error al iniciar sesión:", error.message);
    throw new Error(error.message);
  }
};

module.exports = { iniciarSesion };

