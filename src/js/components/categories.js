import React from 'react';
import PureComponent from 'react-pure-render/component';
import classNames from 'classnames'
import store from '../store';
import { categorySelect } from '../ducks/category';

export default class Categories extends PureComponent {

	categorySelect( category ) {
		return store.dispatch( categorySelect( category ));
	}

	render() {
		return (
			<div className="category-wrapper">
				<button className={ classNames('category', { selected: this.props.category.get('general') }) }
						onClick={ this.categorySelect.bind(this, `general`)}>
					General
				</button>
				<button className={ classNames('category', { selected: this.props.category.get('campus') }) }
						onClick={ this.categorySelect.bind(this, `campus`)}>
					Campus
				</button>
				<button className={ classNames('category', { selected: this.props.category.get('cohort') }) }
						onClick={ this.categorySelect.bind(this, `cohort`)}>
					Cohort
				</button>
			</div>
		);
	}
}