const initialState = {
    type: "",
    message: "",
};

function alertReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case "ERROR":
            const Errormessage = payload;
            return {
                ...state,
                type: "danger",
                message: Errormessage,
            };
        case "SUCCESS":
            const Successmessage = payload;
            return {
                ...state,
                type: "success",
                message: Successmessage,
            };
        case "CLEAR_MESSAGE":
            return {
                ...state,
                message: "",
            };
        default:
            return state;
    }
}

export default alertReducer;
