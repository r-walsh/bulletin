import React from 'react';
import PureComponent from 'react-pure-render/component';

export default class Post extends PureComponent {
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