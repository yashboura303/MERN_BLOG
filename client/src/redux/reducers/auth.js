const initialState = {
    isLoggedIn: false,
    user: null,
};

function authReducer(state = initialState, action) {
    switch (action.type) {
        case "LOGIN":
            const user = action.payload;
            return {
                ...state,
                isLoggedIn: true,
                user: user,
            };
        case "LOGOUT":
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        default:
            return state;
    }
}

export default authReducer;
