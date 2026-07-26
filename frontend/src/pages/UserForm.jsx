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

        const {name, value} = e.target;

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

        } catch (error) {
            console.error(error);
        }
    };

    // Obtener la lista actual de usuarios
    const fetchUsers = async () => {
        try {
            const response = await api.get("/users");
            setUsers(response.data);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div style={styles.background}>

            <div style={styles.container}>

                <h1 style={styles.title}>Crear Cuenta</h1>

                <p style={styles.subtitle}>
                    Complete la siguiente información
                </p>

                <form onSubmit={handleSubmit} style={styles.form}>

                    <div style={styles.inputGroup}>
                        <label>Correo electrónico</label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            style={styles.input}
                            required
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <label>Contraseña</label>

                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            style={styles.input}
                            required
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <label>Nombre</label>

                        <input
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            style={styles.input}
                            required
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <label>Apellido</label>

                        <input
                            type="text"
                            name="apellido"
                            value={formData.apellido}
                            onChange={handleChange}
                            style={styles.input}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        style={styles.registerButton}
                    >
                        Registrarse
                    </button>

                    <button
                        type="button"
                        style={styles.backButton}
                        onClick={() => navigate("/login")}
                    >
                        Volver al inicio de sesión
                    </button>

                </form>

            </div>

        </div>
    );
}

  const styles = {

    background: {
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1f2833"
    },

    container: {
        width: "420px",
        backgroundColor: "#5f5fbf",
        padding: "40px",
        borderRadius: "15px",
        boxShadow: "0px 8px 20px rgba(0,0,0,0.15)"
    },

    title: {
        textAlign: "center",
        marginBottom: "10px",
        color: "#2c3e50"
    },

    subtitle: {
        textAlign: "center",
        color: "black",
        marginBottom: "30px"
    },

    form: {
        display: "flex",
        flexDirection: "column",
        gap: "18px"
    },

    inputGroup: {
        color: "black",
        display: "flex",
        flexDirection: "column",
        gap: "6px"
    },

    input: {
        padding: "12px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        fontSize: "15px"
    },

    registerButton: {
        padding: "12px",
        backgroundColor: "#3498db",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        fontSize: "16px",
        cursor: "pointer",
        marginTop: "10px"
    },

    backButton: {
        padding: "12px",
        backgroundColor: "#95a5a6",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        fontSize: "16px",
        cursor: "pointer"
    }

};

export default UserForm;