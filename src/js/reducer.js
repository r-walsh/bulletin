import { combineReducers } from 'redux';
import user from './ducks/user';
import category from './ducks/category';

export default combineReducers({
	  user
	, category
});