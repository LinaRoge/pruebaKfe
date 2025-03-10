# DESAFIOLATAM BAZAR K-FÉ

Bienvenido al repositorio de **DESAFIOLATAM BAZAR K-FÉ**. https://frontendkfe.onrender.com/

## Descripción

**DESAFIOLATAM CAFÉ** es un proyecto orientado a la elaboración de una tienda ecommerce de productos de café.

## Integrantes

- Bernardo Gaete
- Juan Carlos Orellana
- Roger linarez

## Características

- Registro e inicio de sesión de usuarios.
- Formulario de contacto sin requerir autenticación.
- Gestión y publicación de comentarios.
- Integración con una base de datos PostgreSQL en Render.
- Despliegue del backend en Render y del frontend en Netlify


## Tecnologías

El proyecto se ha desarrollado utilizando las siguientes tecnologías:

- **Frontend:** [React] 
- **Backend:** [Node.js con Express] 
- **Base de Datos:** PostgreSQL
- **Control de Versiones:** Git y GitHub

## Instalación del Backend
Para ejecutar este proyecto en tu máquina local, sigue estos pasos:

Para ejecutar este proyecto en tu máquina local, sigue estos pasos:

1. Clona el repositorio:
   ```bash
   git clone [https://github.com/LinaRoge/pruebaKfe]
   cd bazar_k_fe
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia la aplicación:
   ```bash
   npm start
   ```
## Estructura del Proyecto

- **/backend:**  
  Contiene el servidor API desarrollado con Express, que se conecta a una base de datos PostgreSQL.

- **/frontend:**  
  Contiene la aplicación web en React (Vite) que consume la API.

---

## Variables de Entorno

### Backend

Crea un archivo `.env` en el directorio `/backend` con las siguientes variables:

```env
DB_HOST="NOMBRE_DE_TU_HOST"
DB_USER="TU_USUARIO_BD"
DB_PASSWORD="TU_CLAVE_BD"
DB_NAME="bazarkfe"
PORT=5432  # Render inyecta la variable PORT automáticamente
SECRET_JWT_KEY="tu_clave_secreta"
```

**Nota:**  
En la configuración de conexión a PostgreSQL, se recomienda usar SSL de la siguiente forma para Render:

```js
ssl: { rejectUnauthorized: false }

```
### Frontend

Crea un archivo `.env` en el directorio `/frontend` con la siguiente variable:

```env
VITE_API_URL=https://TU:URL_BACKEND
DESPLIEGUE
```


