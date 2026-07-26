import { useState, useEffect } from "react";
import axios from "axios";

function UserForm() {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [users, setUsers] = useState([]);

  // Obtener la lista actual de usuarios
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/user_list");
      setUsers(response.data.user_list);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Actualizar el estado cuando se escribe en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8000/user_list", formData);

      // Limpiar formulario
      setFormData({
        email: "",
        username: "",
        password: "",
      });

      // Recargar lista
      fetchUsers();
    } catch (error) {
      console.error("Error al agregar usuario:", error);
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "20px auto" }}>
      <h2>Agregar usuario</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Usuario</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Guardar</button>
      </form>

      <hr />

      <h3>Lista de usuarios</h3>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            <strong>{user.username}</strong> - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserForm;
