import { Map, fromJS } from 'immutable';
const SET_USER = `/user/SET_USER`;
const LOGOUT = `user/LOGOUT`;

const initialState = Map({
	  loggedIn: false
	, id: null
	, cohortId: null
});

export default function reducer( state = initialState, action ) {
	switch ( action.type ) {
		case SET_USER:
			return state.merge( action.user );
		case LOGOUT:
			return initialState;
	}
	return state;
}

export function setUser( user ) {
	return { type: SET_USER, user: fromJS( user ) };
}

export function logout() {
	return { type: LOGOUT };
}