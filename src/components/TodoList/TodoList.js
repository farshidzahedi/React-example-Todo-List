import React, { Component } from "react";
import Header from "./Header";
import Todo from "./Todo";

export default class TodoList extends Component {
  constructor(props) {
    super(props);

    this.addTodo = this.addTodo.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.todoEdit = this.todoEdit.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.statusHandler = this.statusHandler.bind(this);

    this.state = {
      todos: [],
      todoTitle: "",
      status: "all",
    };
  }

  addTodo(event) {
    this.setState({ todoTitle: event.target.value });
  }

  submitForm(event) {
    event.preventDefault();
    let newTodo = {
      id: this.state.todos.length + 1,
      title: this.state.todoTitle,
      completed: false,
    };
    this.setState((prevState) => {
      return {
        todos: [...prevState.todos, newTodo],
        todoTitle: "",
      };
    });
  }

  todoEdit(todoid) {
    let completedItem = [...this.state.todos];
    completedItem.forEach((todo) => {
      if (todo.id === todoid) {
        todo.completed = !todo.completed;
      }
    });
    this.setState({
      todos: completedItem,
    });
  }

  deleteTodo(todoid) {
    let removeItem = this.state.todos.filter((todo) => {
      return todoid !== todo.id;
    });
    this.setState({
      todos: removeItem
    });
  }

  statusHandler(event){
    this.setState({
        status:event.target.value
    })
  }

  render() {
    return (
      <>
        <Header />
        <form onSubmit={this.submitForm}>
          <input
            type="text"
            className="todo-input"
            maxLength="40"
            value={this.state.todoTitle}
            onChange={this.addTodo}
          />
          <button className="todo-button" type="submit">
            <i className="fas fa-plus-square"></i>
            
          </button>
          <div className="select">
            <select name="todos" className="filter-todo" onChange={this.statusHandler}>
              <option value="all">همه</option>
              <option value="completed">انجام شده</option>
              <option value="uncompleted">انجام نشده</option>
            </select>
          </div>
        </form>

        <div className="todo-container">
          <ul className="todo-list">

            {this.state.status==="completed" && this.state.todos.filter(todo => todo.completed).map(todo =>(
            <Todo key={todo.id} {...todo} todoEdit={this.todoEdit}deleteTodo={this.deleteTodo}/>
            ))}

            {this.state.status==="uncompleted" && this.state.todos.filter(todo => !todo.completed).map(todo =>(
            <Todo key={todo.id} {...todo} todoEdit={this.todoEdit}deleteTodo={this.deleteTodo}/>
            ))}

            { this.state.status==="all" && this.state.todos.map((todo) => (
                  <Todo key={todo.id} {...todo} todoEdit={this.todoEdit}deleteTodo={this.deleteTodo}/>
             ))}

          </ul>
        </div>
      </>
    );
  }
}
