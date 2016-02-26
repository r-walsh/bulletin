import React from 'react';
import PureComponent from 'react-pure-render/component';
import Modal from 'react-modal';

export default class NewPost extends PureComponent {
	constructor( props ) {
		super( props );

		this.state = {
			writePost: false
		}
	}

	newPost() {
		this.setState({ writePost: true });
	}

	closeModal() {
		this.setState({ writePost: false });
	}

	render() {
		return (
			<div>
				{ this.state.writePost
					?
						<Modal isOpen={ this.state.writePost }>
							<button onClick={ this.closeModal.bind(this) }>X</button>

							<form>
								<input type="radio"/>
								<input type="radio"/>
								<input type="radio"/>
							</form>
						</Modal>
					:
						<button onClick={ this.newPost.bind(this) }>
							Write new post
						</button>
				}
			</div>
		);
	}
}