import { useContext, useEffect } from 'react';
import FormularioItem from './components/FormularioItem';
import ListaItems from './components/ListaItems';
import { StorageContext } from './context/StorageProvider';
import { ThemeContext } from './context/ThemeProvider';

function App() {

  const { modo, setModo } = useContext(StorageContext);
  const { tema, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    const handler = (e) => {
      const inputFocus = e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA';
      if (e.key.toLowerCase() === 't' && !inputFocus) {
        e.preventDefault();
        toggleTheme();
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  });

  return (
    <div>

      <div className="controls">
        <button onClick={toggleTheme}>Cambiar Tema</button>
        <select value={modo} onChange={(e) => setModo(e.target.value)}>
          <option value="local">Modo: Local</option>
          <option value="api">Modo: API</option>
        </select>
      </div>
      
      <div>
        <h1>Lista de Niveles</h1>
      </div>

      <div>
        <FormularioItem />
      </div>

      <div>
        <ListaItems />
      </div>
    </div>
  )
}

export default App;