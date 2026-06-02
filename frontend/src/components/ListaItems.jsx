import { useContext, useRef, useEffect } from 'react';
import { StorageContext } from '../context/StorageProvider';
import ItemCard from './ItemCard';

function ListaItems() {
    const { items, eliminarItem } = useContext(StorageContext);
    const lastRef = useRef();

    useEffect(() => {
        if (lastRef.current) {
            lastRef.current.scrollIntoView({ behavior: 'smooth',  });
        }
    }, [items]);

    if (!items || items.length === 0) {
        return (
            <div>
                <h2>Mi Lista de Niveles</h2>
                <p>La lista de niveles está vacía.</p>
            </div>
        );
    }

    return (
        <div className="lista-items">
            <h2>Mi Lista de Niveles</h2>
            
            <div ref={lastRef}>
                {items.map(item => (
                <ItemCard key={item.id} item={item} archivarItem={eliminarItem} />
                ))}
            </div>
            
        </div>
    );
}

export default ListaItems;