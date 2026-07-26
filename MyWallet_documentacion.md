# **MyWallet {.center}**

<br />

#### *MyWallet* es una aplicación web que permite a los usuarios gestionar de manera sencilla sus métodos de pago

# Pantallas

### Pantalla de Inició de sesión {.center}

![1.00](blob:https://edtr.md/466cb6f5-1675-4330-84a3-77db63f6dba6)

<br />

### Pantalla de creación de cuenta {.center}

![1.00](blob:https://edtr.md/0c4fd850-fb31-477f-af45-1399a321d77d)

<br />

### Pantalla de menú principal {.center}

![1.00](blob:https://edtr.md/b299418e-cca0-4dd2-a54f-dc93404e1444)

<br />

### Pantalla de método de pago {.center}

![1.00](blob:https://edtr.md/5039d949-3513-4df2-91ce-a7be97f008f0)

<br />

### Pantalla de nuevo método de pago {.center}

![1.00](blob:https://edtr.md/e322c1b2-f790-4696-87a0-3574adda202f)

<br />

### Pantalla de edición de perfil {.center}

![1.00](blob:https://edtr.md/1358d980-42ed-463f-8899-a235b02709dd)

<br />

# Paquetes y tecnologías utilizadas:

En este proyecto se usó FastAPI con Python para desarrollar el backend y React con Javascript para desarrollar el frontend, así como una base de datos en la nube usando Clever Cloud y MySQL workbench para la creación y 

### Backend

* Python 3.13
* FastAPI
* SQLAlchemy
* PyMySQL
* Pydantic
* Passlib
* bcrypt
* Uvicorn
* python-dotenv

### Frontend

* React
* Vite
* React Router DOM
* Axios

### Base de datos

* MySQL (Clever Cloud)

<br />

# Modelo Base de datos

#### Tablas

| Metodo\_pago                        | users                               |
| :---------------------------------- | :---------------------------------- |
| id\_metodo\_pago (INT)              | id\_users (INT)                     |
| tipo\_metodo (VARCHAR 45)           | email (VARCHAR 255)                 |
| numero\_tarjeta (VARCHAR 45)        | password\_hash (VARCHAR 225)        |
| institucion (VARCHAR 45)            | nombre (VARCHAR 100)                |
| moneda (VARCHAR 45)                 | apellido (VARCHAR 100)              |
| estatus (ENUM "activo", "inactivo") | estatus (ENUM "activo", "inactivo") |
| pk\_id\_users (INT)                 | <br />                              |

<br />

![1.00](blob:https://edtr.md/56a6b7f4-0c2c-4bf6-a50f-e2d8bb6d1aeb)

#

# Activación de servidor

<br />

#### Paso 1: Abrir una terminal con la ruta de archivos ubicada en el proyecto

<br />

![1.00](blob:https://edtr.md/f48b3287-6fef-4c95-a313-66ae2542e759)

#### Paso 2: Ubicar la carpeta "backend" en el proyecto usando el código " `cd backend\` "

![1.00](blob:https://edtr.md/699025d1-9a04-4929-8446-3de821c4e85b)

#### Paso 3: Activar el entorno virtual usando el comando " `.\.venv\Scripts\Activate.ps1` "

\*Nota: Al momento de ser activado, se encenderá una alerta verde en el lado izquierdo ==(.venv)== diciendo que se está ejecutando el entorno virtual

![1.00](blob:https://edtr.md/39a3625c-12db-4379-a79d-944ace57ce41)

#### Paso 4: Ejecutar el archivo main.py desde la terminal con el comando " `python .\main.py` "

De esta forma, el servidor de FastAPI estará ejecutándose.

![1.00](blob:https://edtr.md/3d535ea6-5a4b-44ed-967c-645b62ceaade)

#### Paso 5: Ejecutar el sitio web de React desde la terminal

-Abrir una nueva terminal en el proyecto y dirigirla a la carpeta " ==frontend== "

-Una vez ubicada la carpeta, escribir el comando " `npm run dev` " para finalmente ejecutar el servidor

![1.00](blob:https://edtr.md/39d1d3d1-ea67-41ce-bc2d-35787d631367)

<br />

# Descarga de paquetes

El proyecto contiene un archivo nombrado "requierement.txt", al ejecutarlo con el comando " `pip install -r requirement.txt` "

<br />

`cd backend/`

`pip install -r requirement.txt`
