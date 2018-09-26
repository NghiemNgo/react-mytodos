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
    this.getFilterCode = this.getFilterCode.bind(this);
  }

  getFilterCode(filter) {
    switch (filter) {
      case 'new':
        return config.TASK_NEW;
      case 'doing':
        return config.TASK_DOING;
      case 'complete':
        return config.TASK_DONE;
      default:
        return config.SHOW_ALL
    }
  }

  componentWillMount() {
    if (this.props.location) {
      let pathName = this.props.location.pathname;
      if (pathName.split('/todos/').length > 1) {
        let filter = pathName.split('/todos/')[1]
        this.setState({ filterTodo: this.getFilterCode(filter) })
      }
    }
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
      return { todos: [...state.todos, newTodo] }
    });
    this.state.todoId++;
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
      return this.state.todos.filter(t => (t.processing !== config.TASK_DELETE));
    } else {
      return this.state.todos.filter(t => (t.processing === this.state.filterTodo));
    }
  }

  render() {
    return (
      <div className="App">
        <InputTodos addTodo={this.addTodo} />
        <TabTodo handlefillterTodo={this.filterdTodo} typeFilter={this.state.filterTodo} />
        <TodoList todos={this.getTodos()} handleClickTodo={this.updateTodo} />
      </div>
    );
  }
}

export default App;
