import { ADD_FAVORITE, REMOVE_FAVORITE } from "../Action/FavoriteAction";

const initialState = {
    favorites: [],
};

const FavoriteReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_FAVORITE:
            return {
                ...state,
                favorites: [...state.favorites, action.payload],
            };
        case REMOVE_FAVORITE:
            return {
                ...state,
                favorites: state.favorites.filter(item => item.id !== action.payload),
            };
        default:
            return state;
    }
};

export default FavoriteReducer;