import { useState, useEffect } from 'react';
import FormularioItem from './components/FormularioItem';
import ListaItems from './components/ListaItems';

function App() {

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
        <FormularioItem agregarItem={agregarNivel} />
      </div>
      <div>
        <ListaItems items={items} archivarItem={archivarNivel} />
      </div>
    </div>
  )
}

export default App;