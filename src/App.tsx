import React, { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TodoList from './TodoList';

const LOCAL_STORAGE_KEY = 'todoApp.todos';

interface ITodoItem {
	id: string,
	name: string,
	completed: boolean
}

function App(): JSX.Element {
	// Create a state where 'todos' is an array of elements following the ITodoItem interface
	// the setTodos function will be used to mutate this state within handler functions
	const [todos, setTodos] = useState<ITodoItem[]>([]);

	// Declare a ref so we can keep track of the text inside input
	const todoNameRef = useRef<HTMLInputElement>(null);

	// Fetch todo list from local storage
	// using [] empty array as dependencies so this hook only executes once
	useEffect(() => {
		const storedTodos = localStorage.getItem(LOCAL_STORAGE_KEY);
		if(storedTodos) setTodos(JSON.parse(storedTodos));
	}, []);

	// Each time the todos array changes, we write it to local storage so the list does not
	// clear on page refresh. [todos] is the array of dependencies
	useEffect(() => {
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
	}, [todos]);

	function handleAddTodo(/* e */) {
		if(todoNameRef && todoNameRef.current) {
			const name = todoNameRef.current.value;
			if(name === '') return;
			
			// Add todo item
			setTodos(prev => {
				return [...prev, {id: uuidv4(), name: name, completed: false}];
			});

			// Clear input
			todoNameRef.current.value = '';
		}
	}

	function toggleTodo(id: string) {
		// Always copy an object, alter the copy and then set state using that copy
		const newTodos = [...todos];
		const todo = newTodos.find(todo => todo.id === id);
		if(todo) {
			todo.completed = ! todo.completed;
			setTodos(newTodos);
		}
	}

	function handleClearTodos() {
		// Clear completed tasks
		const newTodos = todos.filter(todo => !todo.completed);
		setTodos(newTodos);
	}

	return (
		<>
			<TodoList todos={todos} toggleTodo={toggleTodo}/>
			<input ref={todoNameRef} type="text" />
			<button onClick={handleAddTodo}>Add</button>
			<button onClick={handleClearTodos}>Clear completed</button>
			<div>{todos.filter(todo => !todo.completed).length} things left to do</div>
		</>
	);
}

export default App;
