import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';

import '../styles/index.scss';

import Home from './components/Home';

document.addEventListener(`DOMContentLoaded`, () => {
	let reactNode = document.getElementById(`app`);

	if ( reactNode ) {
		ReactDOM.render(
			<Provider store={ store }>
				<Home />
			</Provider>,
			reactNode
		);
	}
});