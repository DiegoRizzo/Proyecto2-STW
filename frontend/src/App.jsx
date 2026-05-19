import { useState, useEffect } from 'react';

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

  return (
    <div>
      <h1>Lista de Niveles</h1>
    </div>
  )
}

export default App;