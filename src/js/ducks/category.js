import { Map } from 'immutable';

const ADD_CATEGORY = `category/ADD_CATEGORY`;
const REMOVE_CATEGORY = `category/REMOVE_CATEGORY`;

const initialState = Map({
	  home: true
	, cohort: false
	, campus: false
});

export default function reducer( state = initialState, action ) {
	switch ( action.type ) {
		case ADD_CATEGORY:
			return state.set(action.newCategory, true);
		case REMOVE_CATEGORY:
			return state.set(action.removeCategory, false);
	}
	return state;
}

export function addCategory( newCategory ) {
	return { type: ADD_CATEGORY, newCategory };
}

export function removeCategory( removeCategory ) {
	return { type: REMOVE_CATEGORY, removeCategory };
}