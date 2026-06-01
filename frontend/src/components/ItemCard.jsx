import { CATEGORIAS } from '../utils/categorias';

function ItemCard({ item, archivarItem }) {

    const categoriaNivel = CATEGORIAS.find(categoria => categoria.id === item.categoriaId);

    return (
        <div style={{backgroundColor: categoriaNivel ? categoriaNivel.color : '#fff', border: '2px solid black', padding: '10px', margin: '10px', borderRadius: '5px'}}>
            <h3>{item.nombre}</h3>
            <p>Categoria: {item.categoriaId}</p>
            <p>Estado: {item.estado}</p>
            <p>Puntuacion: {item.puntuacion}</p>
            <p>Notas: {item.notas || 'N/A'}</p>

            <div>
                <button type="button" onClick={() => archivarItem(item.id)}>Archivar</button>
            </div>
        </div>
    )
}

export default ItemCard;