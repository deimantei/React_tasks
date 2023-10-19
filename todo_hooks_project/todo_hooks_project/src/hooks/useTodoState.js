import UseLocalStorageState from './useLocalStorageState';
import { v4 as uuidv4 } from 'uuid';
export default initialTodos => {
    const [todos, setTodos] = UseLocalStorageState('todos', initialTodos);
    
    return {
        todos,
        addTodo: newToodoText => {
            setTodos([...todos, {id:uuidv4(), task: newToodoText, completed:false}]);
    },
    removeTodo: todoId => {
        const updatedTodos = todos.filter(todo => todo.id !== todoId);
        setTodos(updatedTodos);
    },

    toggleTodo: todoId => {
        const updatedTodos = todos.map(todo =>
            todo.id === todoId ? {...todo, completed: !todo.completed} : todo);
            setTodos(updatedTodos);
    },

    editTodo: (todoId, newTask) => {
        const updatedTodos = todos.map(todo =>
            todo.id === todoId ? {...todo, task: newTask} : todo);
            setTodos(updatedTodos);
    }
};
};