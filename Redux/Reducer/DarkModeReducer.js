import { TOGGLE_THEME } from "../Action/DarkModeAction";

const initialState = {
    isDarkMode: '',
};

const DarkModeReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_THEME:
            return {
                ...state,
                isDarkMode: !state.isDarkMode,
            };
        default:
            return state;
    }
};

export default DarkModeReducer;