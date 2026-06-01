import { createContext, useState, useCallback } from 'react';

export const StorageContext = createContext();

function StorageProvider({ children }) {

  const [modo, setModoState] = useState(() =>
    localStorage.getItem('modo') || 'local'
  );

  const [items, setItems] = useState(() => {
    try {
      const guardado = localStorage.getItem('items');
      return guardado ? JSON.parse(guardado) : [];
    } catch {
      return [];
    }
  });

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

        const data = await res.json();
        setItems(data);
        return data;
        
      } else {
        const data = localStorage.getItem('items');
        const parsed = data ? JSON.parse(data) : [];
        setItems(parsed);
        return parsed;
      }

    } catch (err) {
      setError(err.message); return [];

    } finally { setCargando(false); }
    
  }, [modo]);

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
        const result = await res.json();

        setItems((prev) => {
          const index = prev.findIndex((i) => i.id === result.id);
          if (index !== -1) {
            return prev.map((i) => i.id === result.id ? result : i);
          }
          return [result, ...prev];
        });

        return result;

      } else {
        const current = items || [];

        let itemToSave = { ...item };
        if (!itemToSave.id) {
          itemToSave.id = crypto.randomUUID();
        }

        const existingIndex = current.findIndex((i) => i.id === itemToSave.id);

        let updated;
        if (existingIndex !== -1) {
          updated = current.map((i) => i.id === itemToSave.id ? { ...i, ...itemToSave, fechaActividad: new Date().toISOString() } : i);
        } else {
          updated = [{ ...itemToSave, fechaRegistro: itemToSave.fechaRegistro || new Date().toISOString(), fechaActividad: new Date().toISOString() }, ...current];
        }

        setItems(updated);
        localStorage.setItem('items', JSON.stringify(updated));
        return itemToSave;
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
        setItems(items.filter((i) => i.id !== id));

      } else {
        const filteredItems = items.filter((i) => i.id !== id);
        setItems(filteredItems);
        localStorage.setItem('items', JSON.stringify(filteredItems));
      }

    } catch (err) {
      setError(err.message);
      return null;

    } finally {
      setCargando(false);
    }
  };

  return (
    <StorageContext.Provider value={{
      items, setItems, modo, setModo, cargando, error,
      obtenerItems, guardarItem, eliminarItem,
    }}>
      {children}
    </StorageContext.Provider>
  );
}

export default StorageProvider;