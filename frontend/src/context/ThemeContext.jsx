import { createContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

function ThemeProvider({ children }) {

    const [tema, setTema] = useState(() => {
        return localStorage.getItem('tema') || 'claro'
    });

    useEffect(() => {
        document.body.setAttribute('data-theme', tema);
        localStorage.setItem('tema', tema);
    }, [tema]);

    const toggleTheme = () => {
        setTema(prev => prev === 'claro' ? 'oscuro' : 'claro');
    };

    return (
        <ThemeContext.Provider value={{ tema, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export default ThemeContext;