

import { Button, Input } from 'antd';
import React, { useState } from 'react';

interface Todo {
    id: number;
    text: string;
}

const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [inputVal, setInputVal] = useState<string>('');
    const [editId, setEditId] = useState<number | null>(null);

    const handleAddOrUpdateTodo = () => {
        if (inputVal.trim()) {
            if (editId) {
                // Update existing todo
                setTodos(todos.map(todo => 
                    todo.id === editId ? { ...todo, text: inputVal.trim() } : todo
                ));
                setEditId(null);
            } else {
                // Add new todo
                const newTodo: Todo = { id: Date.now(), text: inputVal.trim() };
                setTodos([...todos, newTodo]);
            }
            setInputVal('');
        }
    };

    const handleEditTodo = (id: number) => {
        const todoToEdit = todos.find(todo => todo.id === id);
        if (todoToEdit) {
            setInputVal(todoToEdit.text);
            setEditId(id);
        }
    };

    const handleDeleteTodo = (id: number) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    return (
        <div className='container'>
            <h1>Todo List</h1>
            <Input
                className='todoInput'
                type="text" 
                value={inputVal} 
                onChange={(e) => setInputVal(e.target.value)} 
                placeholder="Add a text" 
            />
            <Button
            className='todoButton'
             onClick={handleAddOrUpdateTodo}>
                {editId ? 'Update' : 'Add Todo'}
                   
            </Button>
            <ul>
                {todos.map(todo => (
                    <li className='LIsttodo'
                    key={todo.id}>
                        {todo.text} 
                        <button className='todoBtn' onClick={() => handleEditTodo(todo.id)}><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 16 16">
                             <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                           <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                            </svg></button>
                        <button className='todoBtn' onClick={() => handleDeleteTodo(todo.id)}><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"  viewBox="0 0 16 16">
                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                         </svg></button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;


