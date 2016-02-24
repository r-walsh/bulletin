import React from 'react';

export default class Post extends React.Component {
	render() {
		return (
			<div>
				<h2>{ this.props.title }</h2>
				<h4>{ this.props.author }</h4>
				<p>{ this.props.content }</p>
			</div>
		);
	}
}