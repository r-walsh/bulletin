import React from 'react';
import Firebase from 'firebase';
import { setUser } from '../ducks/user';
import store from '../store';

const firebaseRef = new Firebase(`https://devmtn-bulletin.firebaseio.com/`);

export default class Unauthed extends React.Component {
	constructor( props ) {
		super( props );

		this.state = {
			  newUser: false
			, errors: false
		};

	}

	handleChange( field, event ) {
		this.setState({ [field]: event.target.value });
	}

	register() {
		firebaseRef.createUser({
			  email: this.state.email
			, password: this.state.password
		}, ( err, authData ) => {
			if ( err ) {
				return console.error(`Error logging in. ${ err }`);
			}

			firebaseRef.child(`users`).push({
				  email: this.state.email
				, cohortId: 46
			});

			this.login();
		});
	}

	login() {
		firebaseRef.authWithPassword({
			  email: this.state.email
			, password: this.state.password
		}, ( err, authData ) => {
			if ( err ) {
				return console.error(`Error logging in. ${ err }`)
			}
			this.setState({
				  user: authData
				, email: ``
				, password: ``
			});
			store.dispatch(setUser({
				  loggedIn: true
				, id: authData.uid
				, cohortId: 46
			}));
		});
	}

	loginWithGithub() {
		firebaseRef.authWithOAuthPopup(`github`, ( err, authData ) => {
			if ( err ) {
				return console.error(`Error logging in. ${ err }`);
			}
			console.log(authData);
			this.setState({ user: authData });
		});
	}


	loginRegisterToggle() {
		this.setState({ newUser: !this.state.newUser });
	}

	validateForm( submitType ) {
		if ( !this.state.email || !this.state.password ) {
			return this.setState({ errors: `All fields required!` });
		} else {
			this.setState({ errors: `` });
		}
		this[submitType]();
	}

	render() {
		return (
			<div className="unauthed-wrapper">
				<h3>Login to view information specific to your cohort!</h3>

				{ this.state.errors ? <p className="errors">{ this.state.errors }</p> : null }

				<form className="auth-form">

					<input type="email"
						   required
						   placeholder="user@example.net"
						   className="auth-input"
						   value={ this.state.email }
						   onChange={ this.handleChange.bind( this, `email` ) } />

					<input type="password"
						   required
						   placeholder="Password"
						   className="auth-input"
						   value={ this.state.password }
						   onChange={ this.handleChange.bind( this, `password`)} />

					{ this.state.newUser ?
						<button type="submit"
								className="auth-submit"
								onClick={ this.validateForm.bind( this, `login` ) }>
							Login
						</button> :
						<button type="submit"
								className="auth-submit"
								onClick={ this.validateForm.bind( this, `register` ) }>
							Register
						</button>
					}
					<button onClick={ this.loginWithGithub.bind( this ) }
							className="auth-submit">
						Login with GitHub
					</button>

					<p  className="login-register"
						onClick={ this.loginRegisterToggle.bind( this ) }>
						{ this.state.newUser ? `Need an account?` : `Have an account?` }
					</p>
				</form>
			</div>
		);
	}
}