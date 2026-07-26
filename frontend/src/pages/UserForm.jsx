import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api.js";

function UserForm() {
    const [formData, setFormData] = useState({
        email: "",
        password_hash: "",
        nombre: "",
        apellido: "",
    });

//Lista declarada de usuarios
const [users, setUsers] = useState([]);

  // Actualizar el estado cuando se escribe en los inputs
  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData(prev => ({
        ...prev,
        [name]: value,
    }));
};
const navigate = useNavigate();
const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        await api.post("/users", formData);

        alert("Usuario registrado con exito");

        setFormData({
            email: "",
            password: "",
            nombre: "",
            apellido: "",
        });
        fetchUsers();
        navigate("/login");

    } catch(error) {
        console.error(error);
    }
};

  // Obtener la lista actual de usuarios
  const fetchUsers = async () => {
    try{
        const response = await api.get("/users");
        setUsers(response.data);
    }
    catch(error){
        console.error(error);
    }
}
useEffect(()=>{
    fetchUsers();
},[]);

  return (
    <div style={{ maxWidth: "500px", margin: "20px auto" }}>
      <h1>Registro</h1>
      <h3>Ingrese la siguiente información</h3>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>apellido:</label>
          <input
            type="text"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            required
          />
        </div>
        <div>
            <button type="submit">Registrar</button>
        </div>
        <div>
            <button onClick={() => navigate("/login")}>Volver</button>
        </div>

      </form>
      <hr />
        <h2>Usuarios</h2>
          <table>
              <thead>
                  <tr>
                      <th>Email</th>
                      <th>Nombre</th>
                      <th>Apellido</th>
                  </tr>
              </thead>
                  <tbody>
                    {users.map((user)=>(
                        <tr key={user.id_user}>

                            <td>{user.email}</td>

                            <td>{user.nombre}</td>

                            <td>{user.apellido}</td>
                        </tr>
                    ))}
                </tbody>
          </table>
    </div>
  );
}

export default UserForm;