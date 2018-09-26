import config from '../config';
import cloneDeep from 'lodash/cloneDeep';
export const getState = () => {
	let todos = JSON.parse(localStorage.getItem('todos'));
	if (!todos) {
		todos = [];
	}
	let todoId = JSON.parse(localStorage.getItem('todoId'));
	if (!todoId) {
		todoId = 0;
	}
	let filterTodo = JSON.parse(localStorage.getItem('filterTodo'));
	console.log(filterTodo);
	if (!filterTodo) {
		filterTodo = config.SHOW_ALL;
	}
	let state = {
		todoId: todoId,
		todos: todos,
		filterTodo: filterTodo
	};

	console.log(state);

	return state;
	
}

export const setState = (state) => {
	localStorage.setItem('todos', JSON.stringify(cloneDeep(state.todos)));
	localStorage.setItem('todoId', JSON.stringify(state.todoId));
	localStorage.setItem('filterTodo', JSON.stringify(state.filterTodo));
}

