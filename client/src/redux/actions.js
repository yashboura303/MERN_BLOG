import { LOGIN, LOGOUT, SUCCESS, ERROR, CLEAR_MESSAGE } from "./actionTypes.js";

export const loginAction = content => ({
    type: LOGIN,
    payload: content,
});

export const logoutAction = () => ({
    type: LOGOUT,
});

export const clearAlertAction = () => ({
    type: CLEAR_MESSAGE,
});

export const successAlertAction = content => ({
    type: SUCCESS,
    payload: content,
});

export const errorAlertAction = content => ({
    type: ERROR,
    payload: content,
});
