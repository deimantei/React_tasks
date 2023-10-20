import React, {useContext} from 'react';
import { TodosContext } from './contexts/todoscontext';
import useInputState from './hooks/useInputState';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';


function TodoForm() {
    const [value,handleChange, reset] = useInputState('');
    const {addTodo} = useContext(TodosContext);
    return(
        <Paper style={{margin:'1rem 0', padding:'0 1rem' }}>
            <form onSubmit={e=> {
                e.preventDefault();
                addTodo(value);
                reset();
            }}>
            <TextField value={value} 
            onChange={handleChange} 
            margin='normal' 
            label='Add new Todo'
            fullWidth/>
            </form>
        </Paper>
    )
}

export default TodoForm;