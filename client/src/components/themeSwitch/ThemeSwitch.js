import './themeSwitch.css'
import { useThemeContext } from '../../context/ThemeContext.js'
import { BsSunFill, BsMoonFill } from 'react-icons/bs';

const ThemeSwitch = () => {
    let { currentTheme, changeTheme } = useThemeContext();
    const setLight = () => {
        changeTheme('light');
    }
    const setDark = () => {
        changeTheme('dark');
    }
    return (
        <div className='theme-switch'>
            {currentTheme === 'dark'
                ? <BsSunFill className='switch-item' onClick={setLight} />
                : <BsMoonFill className='switch-item' onClick={setDark} />}
        </div>
    )
}

export default ThemeSwitch
