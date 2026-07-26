import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Login from "./Login.jsx";

function EditProfile() {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const [formData, setFormData] = useState({
        nombre: "",
        apellido: ""
    });


    const handleChange = (e) => {

        const {name, value} = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

    };


    useEffect(() => {

        const fetchUser = async () => {

            try {

                const response = await api.get(
                    `/users/${user.id_user}`
                );

                setFormData(response.data);

            } catch (error) {

                console.error(error);

                alert("No fue posible obtener la información.");

            }

        };


        fetchUser();


    }, []);


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await api.put(
                `/users/${user.id_user}`,
                formData
            );


            localStorage.setItem(
                "user",
                JSON.stringify(response.data)
            );


            alert("Información actualizada correctamente.");

            navigate("/menu");


        } catch (error) {

            console.error(error);

            console.log(error.response);

            alert(error.response?.data?.detail || "Error");

        }

    };


    return (

        <div style={styles.page}>

            <div style={styles.card}>

                <h1 style={styles.title}>
                    Editar Perfil
                </h1>


                <form onSubmit={handleSubmit}>


                    <div style={styles.field}>

                        <label>
                            Nombre
                        </label>

                        <input
                            style={styles.input}
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    <div style={styles.field}>

                        <label>
                            Apellido
                        </label>

                        <input
                            style={styles.input}
                            type="text"
                            name="apellido"
                            value={formData.apellido}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    <div style={styles.buttons}>


                        <button
                            type="submit"
                            style={styles.saveButton}
                        >

                            Guardar Cambios

                        </button>


                        <button
                            type="button"
                            onClick={() => navigate("/menu")}
                            style={styles.cancelButton}>
                            Cancelar
                        </button>


                    </div>


                </form>


            </div>


        </div>

    );
}
const styles = {


    page: {

        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#171a1e"

    },


    card: {

        width: "400px",
        padding: "40px",
        borderRadius: "15px",
        backgroundColor: "skyblue",
        boxShadow: "0px 5px 20px rgba(0,0,0,0.15)"

    },


    title: {

        textAlign: "center",
        marginBottom: "30px",
        color: "#2563eb"

    },


    field: {

        display: "flex",
        flexDirection: "column",
        marginBottom: "20px"

    },


    input: {

        marginTop: "8px",
        padding: "12px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        fontSize: "15px"

    },


    buttons: {

        display: "flex",
        justifyContent: "center",
        gap: "15px",
        marginTop: "30px"

    },


    saveButton: {

        padding: "12px 20px",
        borderRadius: "8px",
        border: "none",
        backgroundColor: "#2563eb",
        color: "white",
        fontSize: "15px",
        cursor: "pointer"

    },


    cancelButton: {

        padding: "12px 20px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        backgroundColor: "red",
        fontSize: "15px",
        cursor: "pointer"

    }


};

export default EditProfile;