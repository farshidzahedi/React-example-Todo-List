import React, { Component } from 'react'

export default class Todo extends Component {

    
    clickHandler(id){
        this.props.todoEdit(id)
    }

    removeHandler(id){
        this.props.deleteTodo(id)
    }

    render() {
        return (
            // 'completed' class for completed todos
            <div className={`todo ${this.props.completed ? "completed":""}`} style={{ display: 'flex' }}>
                <li className="todo-item">{this.props.title}</li>

                <button className="check-btn" onClick={this.clickHandler.bind(this,this.props.id)}>
                    <i className="fas fa-check" aria-hidden="true"></i>
                </button>

                <button className="trash-btn" onClick={this.removeHandler.bind(this,this.props.id)}>
                    <i className="fas fa-trash" aria-hidden="true"></i>
                </button>
            </div>
        )
    }
}