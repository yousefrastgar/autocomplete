import {FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE} from '../sagas/usersSagas';

const initialState = {
    users: [],
    loading: true,
    error: null
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload.users
            };

        case FETCH_USERS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };

        default:
            return state;
    }
}

export default usersReducer;
