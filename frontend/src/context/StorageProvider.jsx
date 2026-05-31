export function StorageProvider({ children }) {

  const [modo, setModoState] = useState(() =>
    localStorage.getItem('modo') || 'local'
  );

  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

  const setModo = (nuevoModo) => {
    setModoState(nuevoModo);
    localStorage.setItem('modo', nuevoModo);
  };

  const obtenerItems = useCallback(async () => {
    setCargando(true); setError(null);

    try {
      if (modo === 'api') {
        const res = await fetch(`${API_URL}/api/items`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return await res.json();
      } else {
        const data = localStorage.getItem('items');
        return data ? JSON.parse(data) : [];
      }
    } catch (err) {
      setError(err.message); return [];
    } finally { setCargando(false); }
    
  }, [modo]);

  // guardarItem y eliminarItem siguen el mismo patrón if(modo === 'api')
  const guardarItem = async (item) => {
    setCargando(true); setError(null);

    try {
      if (modo === 'api') {
        const res = await fetch(`${API_URL}/api/items/${item.id || ''}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item)
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return await res.json();
        
      } else {
        const items = localStorage.getItem('items');
        const parsedItems = items ? JSON.parse(items) : [];
        const existingIndex = parsedItems.findIndex((i) => i.id === item.id);
        if (existingIndex !== -1) {
          parsedItems[existingIndex] = item;
        } else {
          parsedItems.push(item);
        }
        localStorage.setItem('items', JSON.stringify(parsedItems));
        return item;
      }
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setCargando(false);
    }
  };

  const eliminarItem = async (id) => {
    setCargando(true); setError(null);

    try {
      if (modo === 'api') {
        const res = await fetch(`${API_URL}/api/items/${id}`, {
          method: 'DELETE'
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
      } else {
        const items = localStorage.getItem('items');
        const parsedItems = items ? JSON.parse(items) : [];
        const filteredItems = parsedItems.filter((i) => i.id !== id);
        localStorage.setItem('items', JSON.stringify(filteredItems));
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <StorageContext.Provider value={{
      modo, setModo, cargando, error,
      obtenerItems, guardarItem, eliminarItem,
    }}>
      {children}
    </StorageContext.Provider>
  );
}