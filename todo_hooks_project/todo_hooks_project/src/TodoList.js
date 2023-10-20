import React, {useContext} from 'react';
import { TodosContext } from './contexts/todoscontext';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Todo from './Todo';

function TodoList() {
    const {todos} = useContext(TodosContext);
    if (todos.length) 
    return(
        <Paper>
            <List>

            </List>
            {todos.map((todo, i) => (
                <>
                <Todo 
                    {...todo}
                    key = {todo.id}/>
                    {i < todos.length - 1 && <Divider />}
                </>
            ))}
        </Paper>
    );
    return null;
}

export default TodoList;