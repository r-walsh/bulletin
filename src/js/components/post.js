import React from 'react';
import PureComponent from 'react-pure-render/component';
import { Card, CardHeader, CardText, CardActions, FlatButton } from 'material-ui';

export default class Post extends PureComponent {
	render() {
		return (
			<Card>
				<CardHeader title={ this.props.title }
							subtitle={ this.props.author }
							actAsExpander={ true }
							showExpandableButton={ true }
							/>
				<CardText expandable={ true }>
					{ this.props.content }
				</CardText>
				<CardActions expandable={true}>
					<FlatButton label="Action1"/>
					<FlatButton label="Action2"/>
				</CardActions>
			</Card>
		);
	}
}