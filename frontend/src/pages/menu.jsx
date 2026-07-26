import { useNavigate } from "react-router-dom";


function Menu() {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));


    const logout = () => {

        const confirmLogout = window.confirm(
            "¿Está seguro de cerrar sesión?"
        );

        if(confirmLogout) {

            localStorage.removeItem("user");

            navigate("/login");

        }

    };


    return (

        <div style={styles.page}>


            <div style={styles.card}>


                <h1 style={styles.title}>
                    MyWallet
                </h1>


                <p style={styles.welcome}>
                    Bienvenido,
                    <strong>
                        {" "}{user ? user.nombre : ""}
                    </strong>
                </p>


                <div style={styles.menu}>


                    <button
                        style={styles.button}
                        onClick={() => navigate("/methods")}>

                        Métodos de Pago

                    </button>


                    <button
                        style={styles.button}
                        onClick={() => navigate(`/edit_profile/${user.id_user}`)}>

                        Mi Perfil

                    </button>


                    <button
                        style={styles.logout}
                        onClick={logout}>

                        Cerrar sesión

                    </button>


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
        backgroundColor: "#24282b"

    },


    card: {

        width: "400px",
        padding: "40px",
        borderRadius: "15px",
        backgroundColor: "skyblue",
        boxShadow: "0px 5px 20px rgba(0,0,0,0.15)",
        textAlign: "center"

    },


    title: {

        marginBottom: "5px",
        color: "#2563eb",
        fontSize: "32px"

    },


    subtitle: {

        fontWeight: "normal",
        fontSize: "20px",
        marginBottom: "30px",
        color: "#555"

    },


    welcome: {

        fontSize: "18px",
        marginBottom: "30px"

    },


    menu: {

        display: "flex",
        flexDirection: "column",
        gap: "15px"

    },


    button: {

        padding: "14px",
        borderRadius: "8px",
        border: "none",
        backgroundColor: "#2563eb",
        color: "white",
        fontSize: "16px",
        cursor: "pointer"

    },


    logout: {

        padding: "14px",
        borderRadius: "8px",
        border: "none",
        backgroundColor: "#d9534f",
        color: "white",
        fontSize: "16px",
        cursor: "pointer"

    }


};


export default Menu;