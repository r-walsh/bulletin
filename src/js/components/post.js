import React from 'react';
import PureComponent from 'react-pure-render/component';
import moment from 'moment';
import { Card, CardHeader, CardText, CardActions, FlatButton } from 'material-ui';

export default class Post extends PureComponent {
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
										primary={ true }/>
						</CardActions>
					: 	null
				}
			</Card>
		);
	}
}