import React, { Component } from 'react';

// This type represents all the state a todo item needs in order to be displayed
export type TodoItem = {
	id: string,
	name: string,
	completed: boolean
};

// Type of toggleTodo() called in checkbox's onChange callback
export type ToggleTodo = (id: string) => void;

// This type aggregates all the props this component is going to use
type TodoProp = {
	todo: TodoItem,
	toggleTodo: ToggleTodo
};

// Presentational component for a todo entry
export class Todo extends Component<TodoProp> {
	render(): React.ReactNode {
		// Retrieve props by decomposing the struct
		const { todo, toggleTodo } = this.props;

		return (
			<div>
				<label>
					<input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id)} />
					{todo.name}
				</label>
			</div>
		);
	}
}

export default Todo;