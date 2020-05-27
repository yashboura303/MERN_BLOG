import { LOGIN, LOGOUT } from "./actionTypes.js";

export const loginAction = (content) => ({
	type: LOGIN,
	payload:
		content,
});

export const logoutAction = () => ({
	type: LOGOUT,
});
