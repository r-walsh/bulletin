import React from 'react';
import PureComponent from 'react-pure-render/component';
import { connect } from 'react-redux';
import Firebase from 'firebase';
import _ from 'underscore';
import store from '../store';
import Navbar from './navbar';
import Post from './post';
import Unauthed from './unauthed';
import Categories from './categories';
import NewPost from './newPost';


export class Home extends PureComponent {
	constructor( props ) {
		super( props );

		this.firebaseUrl = `https://devmtn-bulletin.firebaseio.com/`;

		this.postsRef = new Firebase(this.firebaseUrl + `posts`);

		this.state = { posts: [] } ;

		this.postsRef.on(`value`, posts => {
			let postArray = [];
			posts.forEach( post => {
				let key = post.key();
				let currPost = post.val();
				currPost.id = key;

				postArray.push(currPost);
			});
			this.setState({ posts: postArray });
		});
	}

	render() {
		let posts = this.state.posts
						.filter( post => this.props.category.get( post.category ) )
						.map( post => <div key={ post.id } className="post-wrapper"><Post key={ post.id } { ...post } user={ this.props.user } firebaseUrl={ this.firebaseUrl } /></div> );

		return (
			<div>
				<Navbar user={ this.props.user } />

					{ this.props.user.get(`loggedIn`)
						?
							<div>
								<Categories category={ this.props.category } />
								<div className="new-post-wrapper">
									<NewPost firebaseUrl={ this.firebaseUrl } user={ this.props.user } />
								</div>
								{ posts }
							</div>
						:
							<div className="wrapper-main">
								<Unauthed firebaseUrl={ this.firebaseUrl } />
							</div>
					}

			</div>
		);
	}
}

export default connect( state => ({
	  user: state.user
	, category: state.category
}))( Home );