import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function EditMethod() {

    const navigate = useNavigate();
    const { id } = useParams();


    const [formData, setFormData] = useState({
        tipo_metodo: "",
        numero_tarjeta: "",
        institucion: "",
        moneda: "",
        estatus: ""
    });

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

    };

    useEffect(() => {

        const fetchMethod = async () => {

            try {

                const response = await api.get(`/methods/detail/${id}`);

                setFormData(response.data);

            }
            catch (error) {

                console.error(error);

                alert("No fue posible obtener la información.");

            }

        };

        fetchMethod();

    }, [id]);

    const handleSubmit = async (e) => {

    e.preventDefault();

    try {

        await api.put(`/methods/${id}`, formData);

        alert("Método de pago actualizado correctamente.");

        navigate("/methods");

    }
    catch (error) {

        console.error(error);

        console.log(error.response);

        alert(error.response?.data?.detail || "Error");

    }

};

        return (

        <div style={styles.container}>

            <h1>Editar Método de Pago</h1>

            <form onSubmit={handleSubmit}>

                <div>

                    <label>Tipo de Método</label>

                    <select
                        name="tipo_metodo"
                        value={formData.tipo_metodo}
                        onChange={handleChange}
                    >

                        <option value="">Seleccione...</option>
                        <option value="Visa">Visa</option>
                        <option value="MasterCard">MasterCard</option>
                        <option value="American Express">American Express</option>

                    </select>

                </div>

                <br />

                <div>

                    <label>Número de Tarjeta</label>

                    <input
                        type="text"
                        name="numero_tarjeta"
                        maxLength={16}
                        value={formData.numero_tarjeta}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                numero_tarjeta: e.target.value.replace(/\D/g, "")
                            })
                        }
                        required
                    />

                </div>

                <br />

                <div>

                    <label>Institución</label>

                    <input
                        type="text"
                        name="institucion"
                        value={formData.institucion}
                        onChange={handleChange}
                        required
                    />

                </div>

                <br />

                <div>

                    <label>Moneda</label>

                    <select
                        name="moneda"
                        value={formData.moneda}
                        onChange={handleChange}>
                        <option value="MXN">MXN</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="YEN">YEN</option>
                        <option value="SOL">SOL</option>
                    </select>

                </div>

                <br />

                <div>

                    <label>Estatus</label>

                    <select
                        name="estatus"
                        value={formData.estatus}
                        onChange={handleChange}
                    >

                        <option value="activa">Activa</option>
                        <option value="inactiva">Inactiva</option>

                    </select>

                </div>

                <br />

                <button type="submit">

                    Guardar Cambios

                </button>

                <button
                    type="button"
                    onClick={() => navigate("/methods")}
                    style={{ marginLeft: "10px" }}
                >

                    Cancelar

                </button>

            </form>

        </div>

    );
}

const styles = {

    container: {
        width: "500px",
        margin: "40px auto"
    }

};

export default EditMethod;