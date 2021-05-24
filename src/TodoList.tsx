import React, { Component } from 'react';
import Todo, { TodoItem, ToggleTodo } from './Todo';

type TodoListProp = {
	todos: Array<TodoItem>,
	toggleTodo: ToggleTodo
};


export class TodoList extends Component<TodoListProp> {
	render(): React.ReactNode {
		// Retrieve props by decomposing the struct
		const { todos, toggleTodo } = this.props;

		// For each todo item, append a Todo component, passing it all its state and
		// a callback to handle checkbox click
		return (
			todos.map((todo, /* index */) => {
				return <Todo key={todo.id} todo={todo} toggleTodo={toggleTodo} />
			})
		);
	}
}

export default TodoList;
