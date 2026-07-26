MyWallet

Este proyecto consiste en una aplicación web desarrollada con el objetivo de permitir a los usuarios administrar de forma sencilla y segura sus métodos de pago.
La aplicación implementa un sistema completo de autenticación y registro de cuentas y administración de metodos de pago, donde el frontend desarrollado con React se apoya de una API REST desarrollada en FastAPI y con un respaldo de información usando una base de datos My sql en Clever Cloud.
Los usuarios pueden crear una cuenta, iniciar sesión y gestionar unicamente los metodos de pago que ellos mismos registraron

Como se mencionó anteriormente, la aplicación está dividida en 3 componentes principales:
Frontend: desarrollado con React, encargado de la interfaz de usuario y la comunicación con la API mediante Axios.
Backend: desarrollado con FastAPI, responsable de la autenticación, validación de datos y operaciones CRUD sobre la base de datos.
Base de datos: Desarrollada con MySQL y montada en un servidor en la nube para que sea accesible en todo momento.

Funcionalidades de cada sección son las siguientes

Usuarios
-Registro de cuenta.
-Inicio de sesión.
-Edición de perfil.
-Almacenamiento temporal de la sesión mediante LocalStorage.
-Protección de rutas privadas.

Métodos de pago
-Alta de nuevos métodos de pago.
-Consulta por usuario.
-Actualización de información.
-Eliminación de registros.
-Asociación automática del método de pago con el usuario autenticado.
