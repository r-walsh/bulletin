import React from 'react';
import PureComponent from 'react-pure-render/component';
import moment from 'moment';
import Firebase from 'firebase';
import { Card, CardHeader, CardText, CardActions, FlatButton } from 'material-ui';

export default class Post extends PureComponent {

	deletePost() {
		//dispatch a deletepost action, handle delete post in a higher component
		console.log(this.props.user);
		if ( this.props.user.get(`id`) === this.props.user ) {
			console.log(this.props)
			new Firebase(this.props.firebaseUrl + `/posts/${ this.props.key }`)
				.remove();
		}
	}

	render() {
		let date;
		//noinspection JSUnusedAssignment
		this.props.dateTime ? date = new Date(this.props.dateTime): date = false;
		return (
			<Card>
				<CardHeader title={ this.props.title }
							subtitle={ `${ date ? moment(date).format("dddd, MMMM Do, h:mm a") : '' }` }
							actAsExpander={ true }
							showExpandableButton={ true }
							/>
				<CardText expandable={ true }>
					{ this.props.content }
				</CardText>
				{ this.props.user.get(`id`) === this.props.author
					?
						<CardActions expandable={true}>
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