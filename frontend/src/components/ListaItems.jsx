function ListaItems({ items }) {
    const nivelesActivos = items.filter(item => item.activo);

    return (
        <div>
            <h2>Mi Lista de Niveles</h2>
            {nivelesActivos.length === 0 ? (
                <p>La lista de niveles está vacía.</p>
            ) : (
                <div>
                    {nivelesActivos.map(item => (
                        <ItemCard key={item.id} item={item} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default ListaItems;