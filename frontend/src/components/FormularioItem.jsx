import { useState } from 'react';

function FormularioItem({ agregarItem }) {

    const [data, setData] = useState({
        nombre: '',
        categoriaId: '',
        estado: '',
        puntuacion: '',
        notas: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        });
    }

    const submitForm = (e) => {
        e.preventDefault();
        agregarItem(data);
        setData({
            nombre: '',
            categoriaId: '',
            estado: '',
            puntuacion: '',
            notas: ''
        })
    }

    return (
        <div>
            <h2>Agregar Nuevo Nivel</h2>
            <form onSubmit={submitForm}>
                <div>
                    <label>Nombre:</label>
                    <input
                        type='text'
                        name='nombre'
                        value={data.nombre}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type='submit'>Agregar Nivel</button>
            </form>
        </div>
    );

}

export default FormularioItem;