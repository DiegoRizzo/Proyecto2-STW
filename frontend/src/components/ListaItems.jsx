import ItemCard from './ItemCard';

function ListaItems({ items, archivarItem }) {
    const nivelesActivos = items.filter(item => item.activo === true);

    if (nivelesActivos.length === 0) {
        return (
            <div>
                <h2>Mi Lista de Niveles</h2>
                <p>La lista de niveles está vacía.</p>
            </div>
        );
    }

    return (
        <div>
            <h2>Mi Lista de Niveles</h2>
            
            {nivelesActivos.map(item => (
                <ItemCard key={item.id} item={item} archivarItem={archivarItem} />
            ))}
        </div>
    );
}

export default ListaItems;