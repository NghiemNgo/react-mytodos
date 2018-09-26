import config from '../config';

export const addTodo = (task, timer) => {
  console.log(this.state);
  let newTodo = {
    id: this.state.todoId,
    task: task,
    timer: timer,
    processing: config.TASK_NEW
  };
  this.setState((state) => {
    return {todos: [...state.todos, newTodo]}
  });
  this.state.todoId ++;
  console.log(this.state);
};

export const updateTodo = (id, processing) => {
  this.setState((state) => {
    state.todos.map(t => {
      if (t.id === id) {
        t.processing = processing;
      }
    });
    return state;
  });
  console.log(id, processing, this.state.todos);
};

export const setFilterTodo = (processing) => {
  this.setState((state) => {
    state.filterTodo = processing;
    return state;
  });
};

export const getTodos = (state) => {
  if (state.filterTodo === config.SHOW_ALL) {
    return state.todos.filter( t => (t.processing !== config.TASK_DELETE));
  } else {
    return state.todos.filter( t => (t.processing === state.filterTodo));
  }
}