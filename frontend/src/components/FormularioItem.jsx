import { useState } from 'react';

function FormularioItem({ agregarItem }) {

    const [data, setData] = useState({
        nombre: '',
        categoriaId: '',
        estado: '',
        puntuacion: '',
        notas: ''
    });

    const llenarDatos = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        });
    };

    const submitForm = (e) => {
        e.preventDefault();
        agregarItem(data);
        setData({
            nombre: '',
            categoriaId: '',
            estado: '',
            puntuacion: '',
            notas: ''
        });
    };

    return (
        <div>
            <h2>Agregar Nuevo Nivel</h2>
            <form onSubmit={submitForm}>

                <div>
                    <label>Nombre del nivel: </label>
                    <input type="text" name="nombre" value={data.nombre} placeholder="Escribe aquí el nombre" onChange={llenarDatos} required/>
                </div>

                <div>
                    <label>Categoría del nivel: </label>
                    <select name="categoriaId" value={data.categoriaId} onChange={llenarDatos} required>
                        <option value="">(Seleccionar)</option>
                        <option value="Memory">Memory</option>
                        <option value="Nerve Control">Nerve Control</option>
                        <option value="Overall">Overall</option>
                        <option value="Timings">Timings</option>
                        <option value="Duals">Duals</option>
                    </select>
                </div>

                <div>
                    <label>Estado: </label>
                    <select name="estado" value={data.estado} onChange={llenarDatos} required>
                        <option value="">(Seleccionar)</option>
                        <option value="En Espera">En Espera</option>
                        <option value="En Progreso">En Progreso</option>
                        <option value="Completado">Completado</option>
                    </select>
                </div>

                <div>
                    <label>Puntuación: </label>
                    <input type="number" name="puntuacion" value={data.puntuacion} min="0" max="10" placeholder="0-10" onChange={llenarDatos} required/>
                </div>

                <div>
                    <label>Notas: </label>
                    <input type="text" name="notas" value={data.notas} placeholder="(Opcional)" onChange={llenarDatos} required/>
                </div>

                <button type="submit">
                    Agregar Nivel
                </button>
                
            </form>
        </div>
    );
}

export default FormularioItem;