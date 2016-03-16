import { Map } from 'immutable';

const TOGGLE_CATEGORY = `category/TOGGLE_CATEGORY`;
const ACTIVATE_CATEGORY = `category/ACTIVATE_CATEGORY`;

const initialState = Map({
	  general: true
	, cohort: false
	, campus: false
});

export default function reducer( state = initialState, action ) {
	switch ( action.type ) {
		case TOGGLE_CATEGORY:
			return state.set(action.category, !state.get(action.category));
		case ACTIVATE_CATEGORY:
			return state.set(action.category, true);
	}
	return state;
}

export function toggleCategory( category ) {
	return { type: TOGGLE_CATEGORY, category };
}

export function activateCategory( category ) {
	return { type: ACTIVATE_CATEGORY, category };
}