import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api.js";

function Login() {

    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {

        const { name, value } = e.target;

        setLoginData(prev => ({
            ...prev,
            [name]: value
        }));

    };


    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await api.post("/login", loginData);

            alert("Bienvenido " + response.data.user.nombre);

            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            navigate("/menu");

        }
        catch (error) {

            alert("Correo o contraseña incorrectos");

            console.error(error);

        }

    };


    return (

        <div style={styles.page}>

            <div style={styles.card}>

                <div>
                    <h1 style={styles.title}>
                        MyWallet
                    </h1>
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={styles.field}>

                        <label>
                            Correo electrónico
                        </label>

                        <input
                            style={styles.input}
                            type="email"
                            name="email"
                            value={loginData.email}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    <div style={styles.field}>

                        <label>
                            Contraseña
                        </label>

                        <input
                            style={styles.input}
                            type="password"
                            name="password"
                            value={loginData.password}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    <button
                        style={styles.button}
                        type="submit">

                        Iniciar sesión

                    </button>


                </form>


                <div style={styles.register}>

                    <span>
                        ¿No tienes cuenta?
                    </span>


                    <Link
                        style={styles.link}
                        to="/register">

                        Regístrate

                    </Link>

                </div>


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
        backgroundColor: "#181616"

    },


    card: {

        width: "350px",
        padding: "35px",
        borderRadius: "15px",
        backgroundColor: "skyblue",
        boxShadow: "0px 5px 20px rgba(0,0,0,0.15)"

    },


    title: {
        paddingBottom: "35px",
        textAlign: "center",
        marginBottom: "5px",
        color: "#333"

    },


    subtitle: {

        textAlign: "center",
        border: "20px",
        marginBottom: "10px",
        fontWeight: "normal",
        color: "#333"

    },


    field: {
        color: "black",
        display: "flex",
        flexDirection: "column",
        marginBottom: "20px"

    },


    input: {

        padding: "12px",
        marginTop: "8px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        fontSize: "15px"

    },


    button: {

        width: "100%",
        padding: "12px",
        borderRadius: "8px",
        border: "none",
        backgroundColor: "#2563eb",
        color: "white",
        fontSize: "16px",
        cursor: "pointer"

    },


    register: {

        marginTop: "20px",
        textAlign: "center"

    },


    link: {

        marginLeft: "5px",
        color: "#2563eb",
        textDecoration: "none"

    }

};


export default Login;