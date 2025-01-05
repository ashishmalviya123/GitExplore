import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';

import DarkModeReducer from '../Reducer/DarkModeReducer';
import SearchReducer from '../Reducer/SearchReducer';
import FavoriteReducer from '../Reducer/FavoriteReducer';

const rootReducer = combineReducers({
    DarkModeReducer: DarkModeReducer,
    SearchReducer: SearchReducer,
    FavoriteReducer: FavoriteReducer,
});

const configureStore = () => {
    return createStore(rootReducer, applyMiddleware(thunk));
}

export default configureStore;