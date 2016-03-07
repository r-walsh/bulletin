import React from 'react';
import PureComponent from 'react-pure-render/component';
import Modal from 'react-modal';
import Firebase from 'firebase';
import { RaisedButton, FlatButton, RadioButton, RadioButtonGroup, TextField, DatePicker, TimePicker, Dialog } from 'material-ui';

const initialState = {
	  writePost: false
	, confirmClose: false
	, category: ''
	, title: ''
	, content: ''
	, date: null
	, time: null
	, errors: null
};

export default class NewPost extends PureComponent {
	constructor( props ) {
		super( props );

		this.state = initialState;
	}

	newPost() {
		this.setState({ writePost: true });
	}

	closeModal() {
		this.setState(initialState);
	}

	handleChange( field, event ) {
		this.setState({ [field]: event.target.value });
	}

	submit() {
		let dateTime = null;
		if ( this.state.date && this.state.time ) {
			dateTime = new Date(
				  this.state.date.getFullYear()
				, this.state.date.getMonth()
				, this.state.date.getDate()
				, this.state.time.getHours()
				, this.state.time.getMinutes()
			);
		} else if ( this.state.date ) {
			dateTime = this.state.date;
		} else if ( this.state.time ) {
			return this.setState({ errors: 'Must set a date to set a time'});
		}

		if ( !this.state.title || !this.state.content || !this.state.category ) {
			return this.setState({ errors: 'Title, content, and category are required.' });
		}

		this.props.firebaseRef
			.child('posts')
			.push({
				  category: this.state.category
				, title: this.state.title
				, content: this.state.content
				, dateTime
			});
	}

	render() {
		const actions = [
			  <FlatButton label="Cancel"
						onTouchTap={ () => this.setState({ confirmClose: false })} />
			, <FlatButton label="Close"
						  primary={ true }
						  onTouchTap={ this.closeModal.bind( this ) } />
		];

		return (
			<div>
				{ this.state.writePost
					?
						<Modal isOpen={ this.state.writePost }>
							<RaisedButton onClick={ () => this.setState({ confirmClose: true }) }
										  label="X"
										  primary={ true } />

							<Dialog title="Confirm"
									actions={ actions }
									modal={ true }
									open={ this.state.confirmClose }>
								If you close this window, all entered information will be lost.
							</Dialog>

							{ this.state.errors
								?
									<p className="errors">{ this.state.errors }</p>
								:
									null
							}

							<RadioButtonGroup name="category"
											  onChange={ ( event, category ) => this.setState({ category  }) } >
								<RadioButton value="general"
											 label="General" />
								<RadioButton value="campus"
											 label="Campus" />
								<RadioButton value="cohort"
											 label="Cohort" />
							</RadioButtonGroup>

							<TextField hintText="Title"
									   onChange={ this.handleChange.bind( this, 'title' ) } />
							<div className="clear"></div>
							<TextField multiLine={ true }
									   onChange={ this.handleChange.bind( this, 'content' ) }
									   rows={ 5 }
									   rowsMax={ 15 } />
							<DatePicker mode="landscape"
										onChange={ ( event, date ) =>  this.setState({ date } ) }
										hintText="Choose a date?" />
							<TimePicker hintText="Choose a time?"
										pedantic={ true }
										value={ this.state.time }
										onChange={ ( event, time ) => this.setState({ time }) } />
							<RaisedButton onClick={ this.submit.bind( this ) }
										  label="Submit"
										  secondary={ true } />
						</Modal>
					:
						<RaisedButton onClick={ this.newPost.bind(this) }
									  label="New Post"
									  secondary={ true } />
				}
			</div>
		);
	}
}