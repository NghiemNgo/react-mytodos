import React, { Component } from 'react';
import PropTypes from 'prop-types';
import config from '../config';
import cloneDeep from 'lodash/cloneDeep';

class TodoList extends Component {

	constructor(props) {
	    super(props);
	    this.updateItem = this.updateItem.bind(this);
	}

	updateItem = (id, processing) => {
		this.props.handleClickTodo(id, processing)
	}

	render() {
		return (
			<ul>
			    {this.props.todos.map(todo => (
			      <div key={todo.id}>
			      	<p>{'Task Name:'}{todo.task}</p>
			        <p>{'Time: '}{todo.timer}</p>
			        <p>{todo.processing}</p>
			        <button disabled={(todo.processing === config.TASK_NEW)} onClick={ (e) => this.updateItem(todo.id, config.TASK_NEW)}>Mark as new</button>
			        <button disabled={(todo.processing === config.TASK_DOING)} onClick={ (e) => this.updateItem(todo.id, config.TASK_DOING)}>Mark as doing</button>
			        <button disabled={(todo.processing === config.TASK_DONE)} onClick={ (e) => this.updateItem(todo.id, config.TASK_DONE)}>Mark as done</button>
			        <button disabled={(todo.processing === config.TASK_DELETE)} onClick={ (e) => this.updateItem(todo.id, config.TASK_DELETE)}>Delete</button>
			      </div>
			    ))}
			</ul>
		);
	}
}

TodoList.propTypes = {
	handleClickTodo: PropTypes.func.isRequired
}

export default TodoList;