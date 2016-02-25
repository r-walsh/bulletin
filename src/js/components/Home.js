import React from 'react';
import { connect } from 'react-redux';
import store from '../store';
import Navbar from './navbar';
import Post from './post';
import Unauthed from './unauthed'

export class Home extends React.Component {
	constructor( props ) {
		super( props );

		this.state = store.getState();
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
				<Navbar user={ this.props.user } />
				{ this.props.user ?
					posts :
					<Unauthed /> }
			</div>
		);
	}
}

export default connect( state => ({
	user: state.user
}))( Home );