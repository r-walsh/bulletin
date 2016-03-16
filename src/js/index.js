import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from './store';
import injectTapEventPlugin from 'react-tap-event-plugin';

import '../styles/index.scss';

import Home from './components/Home';
import Unauthed from './components/unauthed';

injectTapEventPlugin();

document.addEventListener(`DOMContentLoaded`, () => {
	let reactNode = document.getElementById(`app`);

	if ( reactNode ) {
		ReactDOM.render(
			<Provider store={ store }>
				<Router history={ browserHistory }>
					<Route path="/" component={ Unauthed } />
					<Route path="/home" component={ Home } />
				</Router>
			</Provider>,
			reactNode
		);
	}
});