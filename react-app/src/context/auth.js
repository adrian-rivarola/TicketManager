import React, { useReducer, createContext } from 'react';
import { useApolloClient } from "@apollo/react-hooks";
import jwtDecode from 'jwt-decode';

const initialState = {
	user: null
}

const token = localStorage.getItem('jwtToken');
if (token) {
	const decodedToken = jwtDecode(token);

	if (decodedToken.exp * 1000 < Date.now()) {
		localStorage.removeItem('jwtToken');
	} 
	else {
		initialState.user = decodedToken;
	}
}

const AuthContext = createContext({
	user: null,
	login: () => {},
	register: () => {}
});

const authReducer = (state, action) => {
	switch (action.type) {
		case 'LOGIN':
			return {
				...state, user: action.payload
			}
		case 'LOGOUT': 
			return {
				...state, user: null
			}
		default:
			return state;
	}
}


const AuthProvider = props => {
	const [state, dispatch] = useReducer(authReducer, initialState);
	const client = useApolloClient();

	const login = (userData) => {
		localStorage.setItem("jwtToken", userData.authToken);

		dispatch({
			type:'LOGIN', 
			payload: userData
		});
	}

	const logout = () => {
		localStorage.clear();
		client.clearStore();

		dispatch({
			type:'LOGOUT'
		});
	}

	return (
		<AuthContext.Provider 
			value={{ user: state.user, login, logout }}
		>
			{props.children}
		</AuthContext.Provider>
	);
}

export { AuthContext, AuthProvider }