
const initialState = {
    repositories: [],
    loading: false,
    error: null,
};

const SearchReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SEARCH_REPOSITORIES':
            return {
                ...state,
                loading: true,
                error: null,
            };
        case 'FETCH_REPOSITORIES_SUCCESS':
            return {
                ...state,
                repositories: action.payload,
                loading: false,
            };
        case 'FETCH_REPOSITORIES_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        default:
            return state;
    }
};

export default SearchReducer;