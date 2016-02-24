import React from 'react';

export default class Navbar extends React.Component {
	constructor( props ) {
		super( props );

		this.state = {};
	}

	render() {
		return (
			<nav className="nav">
				<div className="image-container">
					<img className="logo" src="./assets/DevMtnLogo.png" alt="DevMountain"/>

					<ul className="nav-list">
						<li className="nav-item"><a href="/#/campus">Campus</a></li>
						{ this.state.user ?
							<li className="nav-item"><a href="/#/cohort">Cohort</a></li> :
							null }
						<li className="nav-item"><a href="/#/">Home</a></li>
					</ul>

				</div>
			</nav>
		);
	}
}