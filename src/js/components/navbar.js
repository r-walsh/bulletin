import React from 'react';
import Firebase from 'firebase';
import PureComponent from 'react-pure-render/component';
import store from '../store';
import { logout as logoutAction } from '../ducks/user';


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

					<h4 className="title">bullet.in</h4>

					<ul className="nav-list">
						{ this.props.user.get(`loggedIn`) ?
							<li className="nav-item">
								<a href="/#/" onClick={ this.logout }>Logout</a>
							</li> : null
						}
					</ul>

				</div>
			</nav>
		);
	}
}