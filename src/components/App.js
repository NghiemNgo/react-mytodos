import React, { Component } from 'react';
import InputTodos from '../containers/InputTodos';
import TodoList from '../containers/TodoList';
import config from '../config';
import TabTodo from '../containers/TabTodo';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { getState, setState } from '../actions/localStorage';
import cloneDeep from 'lodash/cloneDeep';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = cloneDeep(getState());
    this.saveState = this.saveState.bind(this);
  }

  saveState = () => {
    setState(this.state);
  }

  addTodo = (task, timer) => {
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
    this.saveState();
    console.log(this.state);
  };

  updateTodo = (id, processing) => {
    this.setState((state) => {
      state.todos.map(t => {
        if (t.id === id) {
          t.processing = processing;
        }
      });
      return state;
    });
    this.saveState();
    console.log(id, processing, this.state.todos);
  };

  filterdTodo = (processing) => {
    this.setState((state) => {
      state.filterTodo = processing;
      return state;
    });
    this.saveState();
  };

  getTodos = () => {
    if (this.state.filterTodo === config.SHOW_ALL) {
      return this.state.todos.filter( t => (t.processing !== config.TASK_DELETE));
    } else {
      return this.state.todos.filter( t => (t.processing === this.state.filterTodo));
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
          <InputTodos addTodo={this.addTodo} />
          <TabTodo handlefillterTodo={this.filterdTodo} typeFilter={this.state.filterTodo} />
          <TodoList todos={this.getTodos()} handleClickTodo={this.updateTodo}/>
          <Route path="/todos" />
          <Route path="/todos/new" />
          <Route path="/todos/doing" />
          <Route path="/todos/complete" />
        </div>
      </Router>
    );
  }
}

export default App;
