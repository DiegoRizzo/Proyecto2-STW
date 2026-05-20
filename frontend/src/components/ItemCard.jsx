function ItemCard({ item }) {

    const coloresProgreso = {
        espera: 'white',
        progreso: 'yellow',
        completado: 'green'
    };

    return (
        <div>
            <h3>{item.nombre}</h3>
        </div>
    )
}

export default ItemCard;