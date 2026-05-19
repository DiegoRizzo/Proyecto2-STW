import { useState } from 'react';

function FormularioItem({ agregarItem }) {

    const [data, setData] = useState({
        id: '',
        nombre: '',
        categoriaId: '',
        estado: '',
        puntuacion: null,
        fechaRegistro: '',
        fechaActividad: '',
        notas: '',
        atributos: [],
        skillset: '',
        difficultyTier: '',
        length: '',
        publisher: '',
        activo: true
    });

    function crearItem(e) {
        e.preventDefault();
        const nuevoItem = {
            id: crypto.randomUUID(),
            nombre: data.nombre,
            categoriaId: data.categoriaId,
            estado: data.estado,
            puntuacion: data.puntuacion,
            fechaRegistro: new Date().toISOString(),
            fechaActividad: new Date().toISOString(),
            notas: data.notas,
            activo: data.activo,
            atributos: {
                skillset: data.skillset,
                difficultyTier: data.difficultyTier,
                length: data.length,
                publisher: data.publisher
            }
        }
        agregarItem(nuevoItem);

        setData({
            id: '',
            nombre: '',
            categoriaId: '',
            estado: '',
            puntuacion: null,
            fechaRegistro: '',
            fechaActividad: '',
            notas: '',
            atributos: [],
            skillset: '',
            difficultyTier: '',
            length: '',
            publisher: '',
            activo: true
        });
    }

    return (
        <div>
            <h2>Agregar Nuevo Nivel</h2>
            <form onSubmit={crearItem}>
            </form>
        </div>
    )

}

export default FormularioItem;