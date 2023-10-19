import React from 'react';
import useInputState from './hooks/useInputState';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';


function TodoForm({addTodo}) {
    const [value,handleChange, reset] = useInputState('');
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