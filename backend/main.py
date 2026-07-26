import uvicorn
from fastapi import FastAPI, HTTPException, Depends, status
from pydantic import BaseModel
from typing import Annotated

from starlette.middleware.cors import CORSMiddleware

import models
from database import engine,SessionLocal
from sqlalchemy.orm import Session
from models import User
from security import hash_password
from security import verify_password
from typing import List
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, ForeignKey


app = FastAPI()
models.Base.metadata.create_all(bind=engine)

#Vista de usuario
class UserBase(BaseModel):
    email: str
    password: str
    nombre: str
    apellido: str
    class Config:
        from_attributes = True

class UserResponse(BaseModel):
    id_user: int
    email: str
    nombre: str
    apellido: str

    class Config:
        from_attributes = True

#Agregar nuevo usuario
class UserCreate(BaseModel):
    email: str
    password: str
    nombre: str
    apellido: str

#Inicio de sesión
class UserLogin(BaseModel):
    email: str
    password: str

#Actualización de datos
class UserUpdate(BaseModel):
    nombre: str
    apellido: str

#información de metodo de pago

class MetodoPagoCreate(BaseModel):
    tipo_metodo: str
    numero_tarjeta: str
    institucion: str
    moneda: str
    pk_id_user: int

class MetodoPagoResponse(BaseModel):
    id_metodo_pago: int
    numero_tarjeta: str
    tipo_metodo: str
    institucion: str
    moneda: str
    estatus: str
    pk_id_user: int

    class Config:
        from_attributes = True

class MetodoPagoUpdate(BaseModel):
    tipo_metodo: str
    numero_tarjeta: str
    institucion: str
    moneda: str
    estatus: str


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]

#Endpoints
@app.get("/")
def root():
    return {"message": "API en funcionaminto"}

@app.post("/login")
async def login(user: UserLogin, db: db_dependency):

    db_user = db.query(models.User).filter(
        models.User.email == user.email
    ).first()

    if not db_user:
        raise HTTPException(
            status_code=401,
            detail="Correo o contraseña incorrectos"
        )

    if not verify_password(user.password, db_user.password_hash):
        raise HTTPException(
            status_code=401,
            detail="Correo o contraseña incorrectos"
        )

    return {
        "message": "Inicio de sesión exitoso",
        "user": {
            "id_user": db_user.id_user,
            "email": db_user.email,
            "nombre": db_user.nombre,
            "apellido": db_user.apellido
        }
    }

@app.post("/users", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def create_user(user: UserCreate, db: db_dependency):

    # Verificar correo
    existing_user = db.query(models.User).filter(
        models.User.email == user.email
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="El correo ya está registrado."
        )

    # Generar hash
    hashed_password = hash_password(user.password)

    # Crear usuario
    db_user = models.User(
        email=user.email,
        password_hash=hashed_password,
        nombre=user.nombre,
        apellido=user.apellido
    )

    #db_user = models.User(**user.model_dump())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.get("/users", response_model=List[UserResponse])
async def obtener_usuarios(db: Session = Depends(get_db)):
    usuarios = db.query(models.User).all()
    return usuarios

@app.post(
    "/methods",
    response_model=MetodoPagoResponse,
    status_code=status.HTTP_201_CREATED
)
async def create_payment_method(
    metodo: MetodoPagoCreate,
    db: db_dependency
):

    nuevo = models.metodo_pago(
        tipo_metodo=metodo.tipo_metodo,
        numero_tarjeta=metodo.numero_tarjeta,
        institucion=metodo.institucion,
        moneda=metodo.moneda,
        pk_id_user=metodo.pk_id_user
    )
    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)
    return nuevo

@app.get(
    "/methods/{user_id}",
    response_model=List[MetodoPagoResponse]
)
async def get_payment_methods(
    user_id: int,
    db: db_dependency
):
    return (
        db.query(models.metodo_pago)
        .filter(models.metodo_pago.pk_id_user == user_id)
        .all()
    )

@app.get(
    "/methods/detail/{id}",
    response_model=MetodoPagoResponse
)
async def get_method(
    id: int,
    db: db_dependency
):
    return (
        db.query(models.metodo_pago)
        .filter(models.metodo_pago.id_metodo_pago == id)
        .first()
    )

#Endpoint para busqueda de información de los metodos de pago
@app.get(
    "/methods/detail/{id}",
    response_model=MetodoPagoResponse
)
async def get_method(
    id: int,
    db: db_dependency
):

    method = (
        db.query(models.metodo_pago)
        .filter(models.metodo_pago.id_metodo_pago == id)
        .first()
    )

    if not method:
        raise HTTPException(
            status_code=404,
            detail="Método no encontrado"
        )

    return method


@app.put(
    "/methods/{id}",
    response_model=MetodoPagoResponse
)
async def update_method(
    id: int,
    method: MetodoPagoUpdate,
    db: db_dependency
):

    db_method = (
        db.query(models.metodo_pago)
        .filter(models.metodo_pago.id_metodo_pago == id)
        .first()
    )

    if not db_method:
        raise HTTPException(
            status_code=404,
            detail="Método no encontrado"
        )

    db_method.tipo_metodo = method.tipo_metodo
    db_method.numero_tarjeta = method.numero_tarjeta
    db_method.institucion = method.institucion
    db_method.moneda = method.moneda
    db_method.estatus = method.estatus

    db.commit()
    db.refresh(db_method)

    return db_method


#Eliminar metodo de pago
@app.delete("/methods/{id}")
async def delete_method(
    id: int,
    db: db_dependency
):

    db_method = (
        db.query(models.metodo_pago)
        .filter(models.metodo_pago.id_metodo_pago == id)
        .first()
    )

    if not db_method:
        raise HTTPException(
            status_code=404,
            detail="Método de pago no encontrado"
        )

    db.delete(db_method)
    db.commit()

    return {
        "message": "Método eliminado correctamente"
    }

#Endpoint para obtener la información del usuario
@app.get(
    "/users/{id}",
    response_model=UserResponse
)
async def get_user(
    id: int,
    db: db_dependency
):

    user = (
        db.query(models.User)
        .filter(models.User.id_user == id)
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="Usuario no encontrado"
        )

    return user

#Endpoint para modificar información de usuarios.
@app.put(
    "/users/{id}",
    response_model=UserResponse
)
async def update_user(
    id: int,
    user: UserUpdate,
    db: db_dependency
):

    db_user = (
        db.query(models.User)
        .filter(models.User.id_user == id)
        .first()
    )

    if not db_user:
        raise HTTPException(
            status_code=404,
            detail="Usuario no encontrado"
        )

    db_user.nombre = user.nombre
    db_user.apellido = user.apellido

    db.commit()
    db.refresh(db_user)

    return db_user

origins = [
    "http://localhost:5173"
]

#permisos
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
