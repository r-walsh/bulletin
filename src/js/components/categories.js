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
					General { this.props.category.get(`general`) ? <i className="check fa fa-check-circle-o"></i> : null }
				</button>
				<button className={ classNames('category', { selected: this.props.category.get('campus') }) }
						onClick={ this.categorySelect.bind(this, `campus`)}>
					Campus { this.props.category.get(`campus`) ? <i className="check fa fa-check-circle-o"></i> : null }
				</button>
				<button className={ classNames('category', { selected: this.props.category.get('cohort') }) }
						onClick={ this.categorySelect.bind(this, `cohort`)}>
					Cohort { this.props.category.get(`cohort`) ? <i className="check fa fa-check-circle-o"></i> :null }
				</button>
			</div>
		);
	}
}