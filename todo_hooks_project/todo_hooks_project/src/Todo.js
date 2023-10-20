import React, {useContext} from 'react';
import { TodosContext } from './contexts/todoscontext';
import useToggle from './hooks/useToggle';
import EditTodoForm from './EditTodoForm';
import Checkbox from '@mui/material/Checkbox';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { ListItemSecondaryAction } from '@mui/material';


function Todo({ id, task, completed}) {
    const {removeTodo, toggleTodo} = useContext(TodosContext);
    const [isEditing, toggle] = useToggle();
    return(
        <ListItem style={{height: '64px'}}>
            {isEditing ? 
            <EditTodoForm 
            id={id}
            task={task}
            toggleEditForm={toggle}
            />:
                    <>
                    <Checkbox tabIndex={-1} checked={completed} onClick={() => toggleTodo(id)}/>
                    <ListItemText style={{textDecoration: completed ? 'line-through' : 'none'}}>
                        {task}
                    </ListItemText>
                    <ListItemSecondaryAction>
                        <IconButton aria-label='delete' onClick={() => removeTodo(id)}>
                            <DeleteIcon></DeleteIcon>
                        </IconButton>
                        <IconButton aria-label='edit' onClick={toggle}>
                            <EditIcon></EditIcon>
                        </IconButton>
                    </ListItemSecondaryAction>
                    </>
                    }
                </ListItem>
    );
}

export default Todo;