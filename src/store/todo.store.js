import { Todo } from '../todos/models/todo.model';


const Filters = {
    All: 'all',
    completed: 'Completed',
    pending: 'Pending',
}

const state = {
    todos: [
        new Todo("A"),
        new Todo("B"),
        new Todo("C"),
    ],
    filter: Filters.All,    //Parecido al concepto de enumeración
}

const initStore = () => {
    console.log(state);
    console.log('Init store');
}

const loadStore = () => {
    throw new Error('No implementado');
}

const getTodos = (filter = Filters.All) => {
    switch(filter){
        case Filters.All:
            return [...state.todos];    //Le mando vector
        case Filters.completed:
            return state.todos.filter(todo => todo.done);   // todo.done === true // true === true 
        case Filters.completed:
            return state.todos.filter(todo => !todo.done);
        default:
            throw new Error(`La opción mandada ${filter} no es válida`);
        
    }
}

const addTodo = ( description ) => {
    throw new Error('No implementado');
}

const toggleTodo = (todoId) => {
    throw new Error('No implementado');
}

const deleteTodo = (todoId) => {
    throw new Error('No implementado');
}

const deleteCompleted = (todoId) => {
    throw new Error('No implementado');
}

const setFiltrer = (newFiltrer = Filters.All) => {
    throw new Error('No implementado');
}

const getCurrentFiltrer = () => {
    throw new Error('No implementado');
}

export default {    //Se pueden poner varios
    addTodo,
    deleteCompleted,
    deleteTodo,
    getCurrentFiltrer,
    getTodos,
    initStore,
    loadStore,
    setFiltrer,
    toggleTodo,
}