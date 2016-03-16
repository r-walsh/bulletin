import React from 'react';
import PureComponent from 'react-pure-render/component';
import { Toggle } from 'material-ui';
import store from '../store';
import { toggleCategory } from '../ducks/category';

export default class Categories extends PureComponent {

	categorySelect( category ) {
		return store.dispatch( toggleCategory( category ));
	}

	render() {
		return (
			<div className="category-wrapper">
				<Toggle label="General"
						onClick={ this.categorySelect.bind(this, `general`) }
						defaultToggled={ this.props.category.get(`general`) }
						/>
				<Toggle label="Campus"
						onClick={ this.categorySelect.bind(this, `campus`) }
						defaultToggled={ this.props.category.get(`campus`) }
						/>
				<Toggle label="Cohort"
						onClick={ this.categorySelect.bind(this, `cohort`) }
						defaultToggled={ this.props.category.get(`cohort`) }
						/>
			</div>
		);
	}
}