import { useContext } from 'react';
import { StorageContext } from '../context/StorageProvider';
import ItemCard from './ItemCard';

function ListaItems() {
    const { items } = useContext(StorageContext);

    if (items.length === 0) {
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
            
            {items.map(item => (
                <ItemCard key={item.id} item={item} />
            ))}
        </div>
    );
}

export default ListaItems;