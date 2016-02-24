import React from 'react';
import Navbar from './navbar';
import Post from './post';
import Unauthed from './unauthed'

export default class Home extends React.Component {
	constructor( props ) {
		super( props );

		this.state = {};
	}

	getPosts() {
		return [
			  {
				  title: `First Post!`
				, id: 1
				, sticky: true
				, author: `Ryan`
				, date: new Date(`January 1 2016`)
				, content: `This is the first note, isn't that neat?`
			  }
			, {
				  title: `Second Post...`
				, id: 2
				, sticky: false
				, author: `Ryan`
				, date: new Date(`January 2 2016`)
				, content: `This note isn't as exciting...`
			  }
		];
	}

	render() {
		let posts = this.getPosts().map( post => <Post key={ post.id } { ...post } />);
		return (
			<div>
				<Navbar />
				{ this.state.user ?
					posts :
					<Unauthed /> }
			</div>
		);
	}
};