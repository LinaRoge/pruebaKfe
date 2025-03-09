# DESAFIOLATAM BAZAR K-FÉ

Bienvenido al repositorio de **DESAFIOLATAM BAZAR K-FÉ**. https://frontendkfe.onrender.com/

## Descripción

**DESAFIOLATAM CAFÉ** es un proyecto orientado a la elaboración de una tienda ecommerce de productos de café.

##Integrantes

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
   cd vive_outdoors
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia la aplicación:
   ```bash
   npm start
   ```
Estructura del Proyecto:

/backend:
Contiene el servidor API desarrollado con Express y que se conecta a una base de datos PostgreSQL.
Crea un archivo .env en el directorio /backend con las siguientes variables:
REACT_APP_API_URL=http://tu_url_backend

/frontend:
Contiene la aplicación web en React (Vite) que consume la API.
Crea un archivo .env en el directorio /backend con las siguientes variables:

DB_HOST="Nombre_de_tu_localhost"
DB_DATABASE="bazar_k_fe"
DB_USER="Tu_usuario_de_BD"
DB_PASSWORD="Tu_clave_de_BD"
SECRET_JWT_KEY="tu_clave_secreta"
PORT=5432  

Nota:
En la configuración de conexión a PostgreSQL, se recomienda usar SSL de la siguiente forma para Render:

ssl: { rejectUnauthorized: false }


DESPLIEGUE
Desplegar el Backend en Render
Tipo de Servicio: Web Service.
Directorio Raíz: backend
Build Command: npm install
(No es necesario ejecutar un build si el backend es solo Node.js).
Start Command: npm start
Variables de Entorno: Configura las variables de entorno (DB_HOST, DB_DATABASE, DB_USER, DB_PASSWORD, SECRET_JWT_KEY) en el panel de Render.


