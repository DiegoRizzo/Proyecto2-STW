function ItemCard({ item, archivarItem }) {

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
                <button type="button" onClick={() => archivarItem(item.id)}>Archivar</button>
            </div>
        </div>
    )
}

export default ItemCard;