import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import GitRepositoryReducer from '../Reducer/GitRepositoryReducer';
import FavoriteReducer from '../Reducer/FavoriteReducer';
import DarkModeReducer from '../Reducer/DarkModeReducer';

const rootReducer = combineReducers({
    GitRepositoryReducer: GitRepositoryReducer,
    FavoriteReducer: FavoriteReducer,
    DarkModeReducer:DarkModeReducer,
});

const configureStore = () => {
    return createStore(rootReducer, applyMiddleware(thunk));
}

export default configureStore;