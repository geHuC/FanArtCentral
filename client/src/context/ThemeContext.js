import { createContext, useContext, useEffect, useState } from "react"

const getCurrentTheme = () => {
    let theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    let local = localStorage.getItem('theme');
    if (local) {
        theme = local;
    }
    return theme;
}

const setTheme = (theme) => {
    const root = document.querySelector(':root');
    root.setAttribute('color-scheme', `${theme}`);
    localStorage.setItem('theme', theme)
}

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
    const [currentTheme, setCurrentTheme] = useState('');
    useEffect(() => {
        setTheme(getCurrentTheme())
        setCurrentTheme(getCurrentTheme());
    }, [])
    const changeTheme = (theme) => {
        setTheme(theme);
        setCurrentTheme(theme);
    }
    return <ThemeContext.Provider value={{ currentTheme, changeTheme, getCurrentTheme }} >
        {children}
    </ThemeContext.Provider>
}
export const useThemeContext = () => {
    const themeState = useContext(ThemeContext)
    return themeState
};
export default ThemeProvider
