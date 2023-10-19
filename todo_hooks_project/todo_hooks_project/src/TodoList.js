import React from 'react';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Todo from './Todo';

function TodoList({todos, removeTodo, toggleTodo, editTodo}) {
    if (todos.length) 
    return(
        <Paper>
            <List>

            </List>
            {todos.map((todo, i) => (
                <>
                <Todo 
                    {...todo}
                    key = {todo.id}
                    removeTodo={removeTodo}
                    toggleTodo={toggleTodo}
                    editTodo={editTodo}
                    id={todo.id}/>
                    {i < todos.length - 1 && <Divider />}
                </>
            ))}
        </Paper>
    );
    return null;
}

export default TodoList;