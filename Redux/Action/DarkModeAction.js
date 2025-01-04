
export const TOGGLE_THEME = 'TOGGLE_THEME';
export const SET_DARK_MODE = 'SET_DARK_MODE';
export const SET_LIGHT_MODE = 'SET_LIGHT_MODE';


export const toggleTheme = () => ({
    type: TOGGLE_THEME,
});

export const setDarkMode = () => ({
    type: SET_DARK_MODE,
});

export const setLightMode = () => ({
    type: SET_LIGHT_MODE,
});