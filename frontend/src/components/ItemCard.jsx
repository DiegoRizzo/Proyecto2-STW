function ItemCard({ item }) {

    const coloresProgreso = {
        espera: 'white',
        progreso: 'yellow',
        completado: 'green'
    };

    return (
        <div>
            <h3>{item.nombre}</h3>
            <p>Categoria: {item.categoriaId}</p>
            <p>Estado: {item.estado}</p>
            <p>Puntuacion: {item.puntuacion}</p>
            <p>Notas: {item.notas}</p>

            <div>
                <button type="button">Editar</button>
                <button type="button">Archivar</button>
            </div>
        </div>
    )
}

export default ItemCard;