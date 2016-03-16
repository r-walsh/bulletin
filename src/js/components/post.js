import React from 'react';
import PureComponent from 'react-pure-render/component';
import moment from 'moment';
import Firebase from 'firebase';
import { Card, CardHeader, CardText, CardActions, FlatButton } from 'material-ui';

export default class Post extends PureComponent {

	deletePost() {
		if ( this.props.user.get(`id`) === this.props.author ) {
			new Firebase(`${ this.props.firebaseUrl }posts/${ this.props.id }`)
				.remove();
		}
	}

	buildDate() {
		let date;
		this.props.dateTime ? date = new Date(this.props.dateTime) : date = false;

		if ( !date ) {
			return null;
		}
		if ( !this.props.onlyDate ) {
			return `Starts on ${ moment(date).format('dddd, MMMM Do, h:mm a')}`;
		}
		return `Starts on ${ moment(date).format('dddd, MMMM Do')}`
	}

	render() {
		return (
			<Card>
				<CardHeader title={ this.props.title }
							subtitle={ this.buildDate() }
							actAsExpander={ true }
							showExpandableButton={ true }
							/>
				<CardText expandable={ true }>
					{ this.props.content }
				</CardText>
				{ this.props.user.get(`id`) === this.props.author
					?
						<CardActions expandable={ true }>
							<FlatButton label="Delete"
										primary={ true }
										onClick={ this.deletePost.bind(this) } />
						</CardActions>
					: 	null
				}
			</Card>
		);
	}
}