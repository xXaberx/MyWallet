import { useNavigate } from "react-router-dom";
import api from "../services/api.js";
import { useState, useEffect } from "react";

function Methods() {

    const navigate = useNavigate();

    const [methods, setMethods] = useState([]);

    const user = JSON.parse(localStorage.getItem("user"));

    const [loading, setLoading] = useState(true);

    //Ocultar numero de tarjeta
    function ocultarTarjeta(numero_tarjeta) {

        if (!numero_tarjeta) return "";

        return "**** **** **** " + numero_tarjeta.slice(-4);

    }

    //Eliminación de registro
    const deleteMethod = async (id) => {

        const confirmDelete = window.confirm(
            "¿Está seguro de eliminar este método de pago?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await api.delete(`/methods/${id}`);

            alert("Método de pago eliminado correctamente.");

            fetchMethods();

        } catch (error) {

            console.error(error);

            alert("No fue posible eliminar el método.");

        }

    };

    const fetchMethods = async () => {

        const response = await api.get(`/methods/${user.id_user}`);
        try {

            const response = await api.get(
                `/methods/${user.id_user}`
            );
            console.log(response.data);
            setMethods(response.data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }


    };

    useEffect(() => {

        fetchMethods();

    }, []);

    return (

        <div style={styles.page}>

            <div style={styles.container}>

                <div style={styles.header}>

                    <h1 style={styles.title}>
                        Métodos de Pago
                    </h1>


                    <div style={styles.topButtons}>

                        <button
                            style={styles.addButton}
                            onClick={() => navigate("/add_method")}>

                            + Agregar Método

                        </button>


                        <button
                            style={styles.backButton}
                            onClick={() => navigate("/menu")}>

                            Regresar

                        </button>

                    </div>


                </div>


                <hr/>


                {
                    methods.length === 0 ? (

                        <p style={styles.empty}>
                            No tienes métodos de pago registrados.
                        </p>

                    ) : (

                        methods.map((method) => (

                            <div
                                key={method.id_metodo_pago}
                                style={styles.card}>


                                <h2 style={styles.cardTitle}>
                                    {method.tipo_metodo}
                                </h2>


                                <p>
                                    <strong>
                                        Tarjeta:
                                    </strong>{" "}
                                    {ocultarTarjeta(method.numero_tarjeta)}
                                </p>


                                <p>
                                    <strong>
                                        Institución:
                                    </strong>{" "}
                                    {method.institucion}
                                </p>


                                <p>
                                    <strong>
                                        Moneda:
                                    </strong>{" "}
                                    {method.moneda}
                                </p>


                                <p>
                                    <strong>
                                        Estatus:
                                    </strong>{" "}
                                    {method.estatus}
                                </p>


                                <div style={styles.buttonContainer}>


                                    <button
                                        style={styles.editButton}
                                        onClick={() =>
                                            navigate(`/edit_method/${method.id_metodo_pago}`)
                                        }>

                                        Editar

                                    </button>


                                    <button
                                        style={styles.deleteButton}
                                        onClick={() => deleteMethod(method.id_metodo_pago)}>

                                        Eliminar

                                    </button>


                                </div>


                            </div>

                        ))

                    )}


            </div>


        </div>

    );
}
const styles = {


    page: {

        minHeight: "100vh",
        backgroundColor: "#25272b",
        paddingTop: "40px"

    },


    container: {

        width: "70%",
        margin: "auto"

    },


    header: {

        backgroundColor: "skyblue",
        padding: "25px",
        borderRadius: "15px",
        boxShadow: "0px 5px 20px rgba(0,0,0,0.15)"

    },


    title: {

        textAlign: "center",
        color: "#2563eb",
        marginBottom: "25px"

    },


    topButtons: {

        display: "flex",
        justifyContent: "center",
        gap: "15px"

    },


    addButton: {

        padding: "12px 20px",
        borderRadius: "8px",
        border: "none",
        backgroundColor: "#2563eb",
        color: "white",
        cursor: "pointer",
        fontSize: "15px"

    },


    backButton: {

        padding: "12px 20px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        backgroundColor: "red",
        cursor: "pointer",
        fontSize: "15px"

    },


    card: {

        marginTop: "25px",
        backgroundColor: "darkblue",
        padding: "25px",
        borderRadius: "15px",
        boxShadow: "0px 4px 15px rgba(0,0,0,0.12)"

    },


    cardTitle: {

        color: "#2563eb",
        marginBottom: "15px"

    },


    buttonContainer: {

        display: "flex",
        gap: "15px",
        marginTop: "20px"

    },


    editButton: {

        padding: "10px 18px",
        borderRadius: "8px",
        border: "none",
        backgroundColor: "#2563eb",
        color: "white",
        cursor: "pointer"

    },


    deleteButton: {

        padding: "10px 18px",
        borderRadius: "8px",
        border: "none",
        backgroundColor: "#d9534f",
        color: "white",
        cursor: "pointer"

    },


    empty: {

        textAlign: "center",
        marginTop: "40px",
        fontSize: "18px"

    }

};

export default Methods;