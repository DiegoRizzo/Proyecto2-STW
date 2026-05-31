import { useState, useEffect, useContext } from 'react';
import FormularioItem from './components/FormularioItem';
import ListaItems from './components/ListaItems';
import { StorageContext } from './context/StorageProvider';
import { ThemeContext } from './context/ThemeProvider';

function App() {

  const { modo, setModo } = useContext(StorageContext);
  const { tema, toggleTheme } = useContext(ThemeContext);

  const [items, setItems] = useState(() => {
    try {
      const guardado = localStorage.getItem('items');
      return guardado ? JSON.parse(guardado) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  const agregarNivel = (item) => {

    const nuevoNivel = {
      id: crypto.randomUUID(),
      nombre: item.nombre,
      categoriaId: item.categoriaId,
      estado: item.estado,
      puntuacion: item.puntuacion,
      fechaRegistro: new Date().toISOString(),
      fechaActividad: new Date().toISOString(),
      notas: item.notas,
      atributos: {},
      activo: true
    };
    
    setItems(itemsPrevios => [nuevoNivel, ...itemsPrevios]);
  }

  const archivarNivel = (id) => {
    setItems(itemsPrevios => itemsPrevios.map(item => {
      if (item.id === id) {
        return { ...item, activo: false };
      }
      return item;
    }));
  };

  return (
    <div>
      <h1>Lista de Niveles</h1>
      <div>
        <button onClick={toggleTheme}>Cambiar Tema</button>
        <select value={modo} onChange={(e) => setModo(e.target.value)}>
          <option value="local">Modo: Local</option>
          <option value="api">Modo: API</option>
        </select>
      </div>
      <div>
        <FormularioItem agregarItem={agregarNivel} />
      </div>
      <div>
        <ListaItems items={items} archivarItem={archivarNivel} />
      </div>
    </div>
  )
}

export default App;