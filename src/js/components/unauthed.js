import React from 'react';
import PureComponent from 'react-pure-render/component';
import Firebase from 'firebase';
import { CircularProgress, RaisedButton } from 'material-ui';
import { setUser } from '../ducks/user';
import store from '../store';


export default class Unauthed extends PureComponent {
	constructor( props ) {
		super( props );

		this.state = {
			  newUser: false
			, errors: false
			, loading: false
		};

		this.firebaseRef = new Firebase( this.props.firebaseUrl );

	}

	handleChange( field, event ) {
		this.setState({ [field]: event.target.value });
	}

	register() {
		this.firebaseRef.createUser({
			  email: this.state.email
			, password: this.state.password
		}, ( err, authdata ) => {
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
		this.setLoading();

		this.firebaseRef.authWithPassword({
			  email: this.state.email
			, password: this.state.password
		}, ( err, authData ) => {
			this.setLoading();

			if ( err ) {
				return console.error(`Error logging in. ${ err }`)
			}
			this.setState({
				  email: ``
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
		this.setLoading();

		this.firebaseRef.authWithOAuthPopup(`github`, ( err, authData ) => {
			this.setLoading();
			if ( err ) {
				return console.error(`Error logging in. ${ err }`);
			}
			store.dispatch(setUser({
				  loggedIn: true
				, id: authData.uid
				, cohortId: 46
			}));
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

	setLoading() {
		this.setState({ loading: !this.state.loading });
	}

	render() {
		return (
			<div className="unauthed-wrapper">
				<h3>Login or register to view information specific to your cohort!</h3>

				{ this.state.errors ? <p className="errors">{ this.state.errors }</p> : null }
				{ this.state.loading
					?
						<CircularProgress />
					:
						<form className="auth-form">

							<input type="email"
								   required
								   placeholder="user@example.net"
								   className="auth-input"
								   value={ this.state.email }
								   onChange={ this.handleChange.bind( this, `email` ) }/>

							<input type="password"
								   required
								   placeholder="Password"
								   className="auth-input"
								   value={ this.state.password }
								   onChange={ this.handleChange.bind( this, `password`)}/>

							{ this.state.newUser ?
								<RaisedButton label="Login"
											  secondary={ true }
											  onClick={ this.validateForm.bind( this, 'login' ) }
											  className="auth-submit"
											  />
								 :
								<RaisedButton label="Register"
											  secondary={ true }
											  onClick={ this.validateForm.bind( this, 'register' ) }
											  className="auth-submit"
											  />
							}

							<RaisedButton label="Login with GitHub"
										  secondary={ true }
										  onClick={ this.loginWithGithub.bind( this ) }
										  className="auth-submit"
										  />

							<p className="login-register"
							   onClick={ this.loginRegisterToggle.bind( this ) }>
								{ this.state.newUser ? `Need an account?` : `Have an account?` }
							</p>
						</form>
				}
			</div>
		);
	}
}