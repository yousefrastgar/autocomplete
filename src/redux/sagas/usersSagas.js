import {call, put, takeLatest} from 'redux-saga/effects'
import {getAllUsers} from "../../services/api";

export const FETCH_USERS_REQUESTED = 'FETCH_USERS_REQUESTED';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

export const fetchUsersRequested = () => ({
    type: FETCH_USERS_REQUESTED
});

export const fetchUsersSuccess = (users) => ({
    type: FETCH_USERS_SUCCESS,
    payload: {users}
});

export const fetchUsersFailure = (error) => ({
    type: FETCH_USERS_FAILURE,
    payload: {error}
});

function* fetchUsers() {
    try {
        const users = yield call(getAllUsers);
        yield put(fetchUsersSuccess(users));
    } catch (error) {
        yield put(fetchUsersFailure(error));
    }
}

function* usersSaga() {
    yield takeLatest(FETCH_USERS_REQUESTED, fetchUsers);
}

export default usersSaga;
