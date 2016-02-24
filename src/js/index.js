import React from 'react';
import ReactDOM from 'react-dom';
import Router, { Route } from 'react-router';

import '../styles/index.scss';

import Home from './components/Home';

const routes = (
	<Router>
		<Route path="/" component={ Home } />
	</Router>
);

document.addEventListener(`DOMContentLoaded`, () => {
	let reactNode = document.getElementById(`app`);

	if ( reactNode ) {
		ReactDOM.render(
			routes,
			reactNode
		);
	}
});