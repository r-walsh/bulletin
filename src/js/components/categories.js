import React from 'react';
import PureComponent from 'react-pure-render/component';
import classNames from 'classnames'
import { Toggle } from 'material-ui';
import store from '../store';
import { categorySelect } from '../ducks/category';

export default class Categories extends PureComponent {

	categorySelect( category ) {
		return store.dispatch( categorySelect( category ));
	}

	render() {
		return (
			<div className="category-wrapper">
				<Toggle label="General"
						onClick={ this.categorySelect.bind(this, `general`) }
						defaultToggled={ true }
						/>
				<Toggle label="Campus"
						onClick={ this.categorySelect.bind(this, `campus`) }
						/>
				<Toggle label="Cohort"
						onClick={ this.categorySelect.bind(this, `cohort`) }
						/>
			</div>
		);
	}
}