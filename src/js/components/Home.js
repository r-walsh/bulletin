import React from 'react';
import PureComponent from 'react-pure-render/component';
import { connect } from 'react-redux';
import Firebase from 'firebase';
import store from '../store';
import Navbar from './navbar';
import Post from './post';
import Unauthed from './unauthed';
import Categories from './categories';
import NewPost from './newPost';

export class Home extends PureComponent {
	constructor( props ) {
		super( props );
	}

	//componentWillMount() {
	//	const firebaseRef = new Firebase(`https://devmtn-bulletin.firebaseio.com/`);
	//	firebaseRef.child(`post/general`).on(`value`, ( generalPost ) => {
	//
	//	});
	//	if ( this.props.user.get(`loggedIn`) ) {
	//
	//	}
	//}

	getPosts() {
		return [
			  {
				  title: `First Post!`
				, id: 1
				, sticky: true
				, author: `Ryan`
				, date: new Date(`January 1 2016`)
				, content: `This is the first note, isn't that neat?`
				, category: `general`
			  }
			, {
				  title: `Second Post...`
				, id: 2
				, sticky: false
				, author: `Ryan`
				, date: new Date(`January 2 2016`)
				, content: `This note isn't as exciting...`
				, category: `campus`
			  }
		];
	}

	render() {
		let posts = this.getPosts().filter( post => this.props.category.get(post.category))
									.map( post => <Post key={ post.id } { ...post } />);
		return (
			<div>
				<Navbar user={ this.props.user } />
				<NewPost />
				{ this.props.user.get(`loggedIn`) ? <Categories category={ this.props.category } /> : null }
				{ this.props.user.get(`loggedIn`)
					?
						posts
					:	<Unauthed /> }
			</div>
		);
	}
}

export default connect( state => ({
	  user: state.user
	, category: state.category
}))( Home );