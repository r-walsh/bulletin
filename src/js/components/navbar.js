import React from 'react';
import Firebase from 'firebase';
import PureComponent from 'react-pure-render/component';
import { logout as logoutAction } from '../ducks/user';
import store from '../store';

export default class Navbar extends PureComponent {
	constructor( props ) {
		super( props );

		this.state = {};
	}

	logout() {
		let firebaseRef = new Firebase(`https://devmtn-bulletin.firebaseio.com`);
		firebaseRef.unauth().then( () => {
			store.dispatch(logoutAction());
		});
	}

	render() {
		return (
			<nav className="nav">
				<div className="image-container">
					<img className="logo" src="./assets/DevMtnLogo.png" alt="DevMountain"/>

					<ul className="nav-list">
						{ this.props.user.get(`loggedIn`) ?
							<li className="nav-item">
								<a href="/#/" onClick={ this.logout }>Logout</a>
							</li> : null
						}
						<li className="nav-item"><a href="/#/campus">Campus</a></li>
						{ this.props.user.get(`loggedIn`) ?
							<li className="nav-item"><a href="/#/cohort">Cohort</a></li> :
							null }
						<li className="nav-item"><a href="/#/">Home</a></li>
					</ul>

				</div>
			</nav>
		);
	}
}