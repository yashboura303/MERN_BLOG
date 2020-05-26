const initialState = {
	isloggedIn:false,
	user: null
};

export default function(state=initialState, action){
	switch (action.type) {
		case "SIGN_IN":
			const {user} = action.payload;
			return {
				...state,
				isloggedIn:true,
				user
			};
		case "LOGOUT":
			return {
				...state,
				isloggedIn:false,
				user:null
			};
		default:
			return state;
	}
}