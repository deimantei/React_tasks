import React, { useEffect } from 'react';
import { TodosProvider } from './contexts/todoscontext';
import TodoList from './TodoList';
import TodoForm from './TodoForm';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';


function TodoApp(){
        return (
        <Paper
        style={{
            padding: 0,
            margin: 0,
            height: '100vh',
            backgroundColor: 'blue'
        }}
        elevation={0}>
            <AppBar color='primary' position='static' style={{height: '64px'}}>
                <Toolbar>
                    <Typography color='inherit'>Todos with hooks</Typography>
                </Toolbar>
            </AppBar>
            <Grid container justifyContent="center" style={{marginTop: '1rem'}}>
                <Grid item xs={11} md={8} lg={4}>
            <TodosProvider>
            <TodoForm/>
            <TodoList/>
            </TodosProvider>
            </Grid>
            </Grid>
        </Paper>
    )
}

export default TodoApp;