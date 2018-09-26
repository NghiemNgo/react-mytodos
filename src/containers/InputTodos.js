import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InputTodos extends Component {

	constructor(props) {
	    super(props);
	    let task;
		let timer;
	}

	handleInput = event => {
        event.preventDefault()
        if (!this.task.value.trim()) {
          return;
        }
        if (!this.timer.value.trim()) {
          return;
        }
        this.props.addTodo(this.task.value, this.timer.value);
        this.task.value = '';
        this.timer.value = '';
    }

	render() {
		return(
			<div>
			    <form onSubmit={ this.handleInput }>
			        <input ref={node => this.task = node} />
			        <input ref={node => this.timer = node} />
			        <button type="submit">
			          Add Todo
			        </button>
			    </form>
			</div>
		);
	};
}

InputTodos.propTypes = {
	addTodo: PropTypes.func.isRequired
}

export default InputTodos;