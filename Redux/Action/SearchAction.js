import axios from 'axios';

const SEARCH_REPOSITORIES = 'SEARCH_REPOSITORIES';
const FETCH_REPOSITORIES_SUCCESS = 'FETCH_REPOSITORIES_SUCCESS';
const FETCH_REPOSITORIES_FAILURE = 'FETCH_REPOSITORIES_FAILURE';

export const SearchAction = (query) => {
    return async (dispatch) => {
        dispatch({ type: SEARCH_REPOSITORIES });  // Set loading state
        try {
            const response = await axios.get(`https://api.github.com/search/repositories?q=${query}`);
            dispatch({ type: FETCH_REPOSITORIES_SUCCESS, payload: response.data });
        } catch (error) {
            dispatch({ type: FETCH_REPOSITORIES_FAILURE, error: error.message });
        }
    };
};