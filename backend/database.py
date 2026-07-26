from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
import os
from sqlalchemy import text

URL_DATABASE = "mysql+pymysql://u4rhtebqff6zucz0:5L5BsWJZ5EyXD9JJPN4u@bvtgnsczqprfxhwhtmqe-mysql.services.clever-cloud.com:3306/bvtgnsczqprfxhwhtmqe"

engine = create_engine(URL_DATABASE)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

try:
    with engine.connect() as connection:

        result = connection.execute(
            text("SELECT * FROM users")
        )

        for row in result:
            print(row)

except Exception as e:
    print(e)

Base = declarative_base()
