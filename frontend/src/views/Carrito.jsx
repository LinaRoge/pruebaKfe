import { useContext } from "react";
import { kfeContext } from "../context/AppProvider";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./Carrito.css";
import { jwtDecode } from "jwt-decode";

const Carrito = () => {
  const { carrito, totalAPagar, agregarCarrito, eliminarCarrito } =
    useContext(kfeContext);

  const navigate = useNavigate(); // Inicializamos useNavigate

  const handlePago = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      // Si no existe un token, redirigir al login
      Swal.fire({
        title: "¡No estás logueado!",
        text: "Para realizar el pedido, debes iniciar sesión.",
        icon: "warning",
        confirmButtonText: "Ir al Login",
      }).then(() => {
        navigate("/login"); // Redirigimos al login
      });
      return;
    }

    // Intentamos decodificar el token para comprobar su validez
    try {
      const decodedToken = jwtDecode(token); // Usamos jwtDecode en lugar de jwt_decode
      const currentTime = Date.now() / 1000; // El tiempo actual en segundos

      if (decodedToken.exp < currentTime) {
        // Si el token está expirado, lo eliminamos y redirigimos al login
        localStorage.removeItem("token");
        Swal.fire({
          title: "Token expirado",
          text: "Tu sesión ha expirado, por favor, inicia sesión nuevamente.",
          icon: "warning",
          confirmButtonText: "Ir al Login",
        }).then(() => {
          navigate("/login");
        });
      } else {
        // Si el token es válido, redirigimos a DetallePago
        navigate("/DetallePago");
      }
    } catch (error) {
      // Si ocurre un error al decodificar el token, eliminamos el token y redirigimos a login
      localStorage.removeItem("token");
      Swal.fire({
        title: "¡Error de autenticación!",
        text: "El token no es válido. Por favor, inicia sesión.",
        icon: "error",
        confirmButtonText: "Ir al Login",
      }).then(() => {
        navigate("/login");
      });
    }
  };
  return (
    <div>
      <div className="detalleCarrito">
        <h2 className="carrito-header">Tu carrito</h2>

        {/* Encabezado de la lista con los títulos */}
        <div className="header-row">
          <span>Producto</span>
          <span>Cantidad</span>
          <span>Precio</span>
        </div>

        <ul>
          {carrito.map((producto) => (
            <li key={producto.id_producto} className="producto-item">
              {/* Columna izquierda: imagen y nombre del producto */}
              <div>
                <img src={producto.imagen} alt={producto.marca} />
              </div>

              {/* Columna central: cantidad */}
              <div className="cantidad">
                <button
                  className="decrementa"
                  onClick={() => eliminarCarrito(producto)} // Se mantiene para restar 1
                >
                  <b> - </b>
                </button>
                {producto.count}
                <button
                  className="incrementa"
                  onClick={() => agregarCarrito(producto, 1)} // Pasa solo 1 al incrementar
                >
                  <b> + </b>
                </button>
              </div>

              {/* Columna derecha: precio total */}
              <div className="precio producto-precio">
                $
                {parseFloat(producto.precio.replace("$", "").replace(".", "")) *
                  producto.count}
              </div>
            </li>
          ))}
        </ul>

        {/* Total a pagar */}
        <div className="total-a-pagar">
          <p>PAGAR PEDIDO</p>
          <p>
            <b>${totalAPagar}</b>
          </p>

          {/* Botón para pagar */}
          <button className="btn-pagar" onClick={handlePago}>
            Pagar Pedido
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carrito;
