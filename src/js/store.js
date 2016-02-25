import { createStore } from 'redux';
import user from './ducks/user';

const store = createStore( user );
export default store;