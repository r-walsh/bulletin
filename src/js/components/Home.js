import React from 'react';
import PureComponent from 'react-pure-render/component';
import { connect } from 'react-redux';
import Firebase from 'firebase';
import ReactFireMixin from 'reactfire';
import _ from 'underscore';
import store from '../store';
import Navbar from './navbar';
import Post from './post';
import Unauthed from './unauthed';
import Categories from './categories';
import NewPost from './newPost';

const firebaseUrl = `https://devmtn-bulletin.firebaseio.com/`;

export class Home extends PureComponent {
	constructor( props ) {
		super( props );

		this.postsRef = new Firebase(firebaseUrl + `posts`);

		this.state = { posts: {} };

		this.postsRef.on(`child_added`, post => {
			if ( this.state.posts[post.key()]) {
				return;
			}

			let postVal = post.val();
			postVal.key = post.key();
			this.setState(_.extend( this.state.posts, { [postVal.key]: postVal } ));

		});

	}

	render() {
		let posts = _.values( this.state.posts )
						.filter( post => this.props.category.get( post.category ) )
						.map( post => <div key={ post.key } className="post-wrapper"><Post key={ post.key } { ...post } /></div> );

		return (
			<div>
				<Navbar user={ this.props.user } />
				{ this.props.user.get(`loggedIn`) ? <Categories category={ this.props.category } /> : null }
				<div className="wrapper-main">
					{ this.props.user.get(`loggedIn`)
						?
							<div>
								<NewPost firebaseUrl={ firebaseUrl } />
								{ posts }
							</div>
						:	<Unauthed firebaseUrl={ firebaseUrl } /> }
				</div>
			</div>
		);
	}
}

export default connect( state => ({
	  user: state.user
	, category: state.category
}))( Home );