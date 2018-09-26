import React, {Component} from 'react';
import PropTypes from 'prop-types';
import config from '../config';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class TabTodo extends Component {

	fillterTodo = (processing) => {
		this.props.handlefillterTodo(processing);
	}

	render () {
		return (
				<div id='TabTodo'>
					<Link to="/todos">
						<button disabled={(this.props.typeFilter === config.SHOW_ALL)} onClick={ (e) => this.fillterTodo(config.SHOW_ALL)}>All</button>
					</Link>
					<Link to="/todos/new">
						<button disabled={(this.props.typeFilter === config.TASK_NEW)} onClick={ (e) => this.fillterTodo(config.TASK_NEW)}>NEW</button>
					</Link>
					<Link to="/todos/doing">
			        	<button disabled={(this.props.typeFilter === config.TASK_DOING)} onClick={ (e) => this.fillterTodo(config.TASK_DOING)}>DOING</button>
			        </Link>
			        <Link to="/todos/complete">
			        	<button disabled={(this.props.typeFilter === config.TASK_DONE)} onClick={ (e) => this.fillterTodo(config.TASK_DONE)}>COMPLETE</button>
			        </Link>
				</div>
		)
	}
}

TabTodo.propTypes = {
	handlefillterTodo: PropTypes.func.isRequired
}


export default TabTodo;