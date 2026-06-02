import { CATEGORIAS } from '../utils/categorias';

function ItemCard({ item, archivarItem }) {

    const categoriaNivel = CATEGORIAS.find(categoria => categoria.id === item.categoriaId);

    return (
        <div style={{backgroundColor: categoriaNivel ? categoriaNivel.color : '#fff'}} className="item-card">
            <h3>{item.nombre}</h3>
            <p>Categoria: {item.categoriaId}</p>
            <p>Estado: {item.estado}</p>
            <p>Puntuacion: {item.puntuacion}</p>
            <p>Notas: {item.notas || 'N/A'}</p>

            <div>
                <button type="button" onClick={() => archivarItem(item.id)} className='btn'>Archivar</button>
            </div>
        </div>
    )
}

export default ItemCard;