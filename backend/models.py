from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.dialects.mysql import ENUM

from database import Base
from pydantic import BaseModel

class User(Base):
    __tablename__ = "users"

    id_user = Column(Integer, primary_key=True, index=True, autoincrement=True)
    email = Column(String(255), unique=True)
    password_hash = Column(String(255))
    nombre = Column(String(100))
    apellido = Column(String(100))
    estatus = Column(String(20), default="inactivo")

class metodo_pago(Base):
    __tablename__ = "metodo_pago"

    id_metodo_pago= Column(Integer, primary_key=True, index=True, autoincrement=True)
    tipo_metodo = Column(String(45))
    numero_tarjeta= Column(String(45))
    institucion= Column(String(45))
    moneda = Column(String(45))
    estatus = Column(
        ENUM("activa", "inactiva"),
        nullable=False,
        default="inactiva")
    pk_id_user = Column(Integer, ForeignKey("users.id_user"), index=True)