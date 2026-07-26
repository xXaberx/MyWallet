import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Add_Methods() {

    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    useEffect(() => {

        const storedUser = JSON.parse(
            localStorage.getItem("user")
        );

        setUser(storedUser);

    }, []);


    useEffect(() => {

        if (user) {

            setFormData(prev => ({
                ...prev,
                pk_id_user: user.id_user
            }));

        }

    }, [user]);
    console.log(user);

    const [formData, setFormData] = useState({

        tipo_metodo: "",
        numero_tarjeta: "",
        institucion: "",
        moneda: "MXN",
        pk_id_user: ""

    });

    const handleChange = (e) => {

        const {name, value} = e.target;

        if (name === "numero_tarjeta") {

            if (!/^\d*$/.test(value)) {
                return;
            }

        }
        setFormData(prev => ({

            ...prev,

            [name]: value

        }));

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        console.log("Datos enviados:");
        console.log(formData);

        try {

            const response = await api.post("/methods", formData);

            console.log(response.data);

            alert("Nuevo método de pago agregado con éxito");

            navigate("/methods");

        } catch (error) {

            console.log(error.response);

        }
    };
    return (

        <div style={styles.page}>


            <div style={styles.card}>


                <h1 style={styles.title}>
                    Agregar Método de Pago
                </h1>


                <form onSubmit={handleSubmit}>


                    <div style={styles.field}>

                        <label>
                            Tipo de método
                        </label>


                        <select
                            style={styles.input}
                            name="tipo_metodo"
                            value={formData.tipo_metodo}
                            onChange={handleChange}
                            required
                        >

                            <option value="">
                                Seleccione...
                            </option>

                            <option value="tarjeta">
                                Tarjeta
                            </option>

                            <option value="Cuenta bancaria">
                                Cuenta bancaria
                            </option>

                            <option value="CLABE">
                                CLABE
                            </option>

                        </select>


                    </div>


                    <div style={styles.field}>

                        <label>
                            Número de tarjeta
                        </label>


                        <input
                            style={styles.input}
                            maxLength={16}
                            type="text"
                            inputMode="numeric"
                            name="numero_tarjeta"
                            value={formData.numero_tarjeta}
                            onChange={handleChange}
                            required
                        />


                    </div>


                    <div style={styles.field}>

                        <label>
                            Institución
                        </label>


                        <input
                            style={styles.input}
                            type="text"
                            name="institucion"
                            value={formData.institucion}
                            onChange={handleChange}
                            required
                        />


                    </div>


                    <div style={styles.field}>

                        <label>
                            Moneda
                        </label>


                        <select
                            style={styles.input}
                            name="moneda"
                            value={formData.moneda}
                            onChange={handleChange}
                        >

                            <option value="MXN">
                                MXN
                            </option>

                            <option value="USD">
                                USD
                            </option>

                            <option value="EUR">
                                EUR
                            </option>

                            <option value="YEN">
                                YEN
                            </option>

                            <option value="SOL">
                                SOL
                            </option>


                        </select>


                    </div>


                    <div style={styles.buttons}>


                        <button
                            type="submit"
                            style={styles.saveButton}
                        >

                            Guardar

                        </button>


                        <button
                            type="button"
                            style={styles.cancelButton}
                            onClick={() => navigate("/methods")}
                        >

                            Cancelar

                        </button>


                    </div>


                </form>


            </div>


        </div>

    );
};
    const styles = {


        page: {

            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#24272b"

        },


        card: {

            width: "420px",
            padding: "40px",
            borderRadius: "15px",
            backgroundColor: "skyblue",
            boxShadow: "0px 5px 20px rgba(0,0,0,0.15)"

        },


        title: {

            textAlign: "center",
            color: "#2563eb",
            marginBottom: "30px",
            fontSize: "26px"

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
            fontSize: "15px",
            backgroundColor: "gray"

        },


        buttons: {

            display: "flex",
            justifyContent: "center",
            gap: "15px",
            marginTop: "30px"

        },


        saveButton: {

            padding: "12px 25px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#2563eb",
            color: "white",
            cursor: "pointer",
            fontSize: "15px"

        },


        cancelButton: {

            padding: "12px 25px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            backgroundColor: "red",
            cursor: "pointer",
            fontSize: "15px"

        }
    };

export default Add_Methods;