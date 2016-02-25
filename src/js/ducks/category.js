import { Map } from 'immutable';

const CATEGORY_SELECT = `category/CATEGORY_SELECT`;
const REMOVE_CATEGORY = `category/REMOVE_CATEGORY`;

const initialState = Map({
	  general: true
	, cohort: false
	, campus: false
});

export default function reducer( state = initialState, action ) {
	switch ( action.type ) {
		case CATEGORY_SELECT:
			return state.set(action.category, !state.get(action.category));
	}
	return state;
}

export function categorySelect( category ) {
	return { type: CATEGORY_SELECT, category };
}