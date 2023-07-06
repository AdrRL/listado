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
        new Todo('D'),
        new Todo('E'),
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
    if (!description) throw new Error('La descripción debe tener algún valor');

    state.todos.push(new Todo(description));
}

const toggleTodo = (todoId) => {
    state.todos = state.todos.map(todo => { //Permite recorrerlo
        if (todo.id === todoId){
            todo.done = !todo.done;
        }
        return todo;
    });
}

const deleteTodo = (todoId) => {
    state.todos = state.todos.filter(todo => todo.Id != todo.id);
}

const deleteCompleted = (todoId) => {
    state.todos = state.todos.filter(todo => todo.done);
}

const setFiltrer = (newFiltrer = Filters.All) => {
    state.filter = newFiltrer;  //Se podría filtrar que debe estar en la enumeración Object.keys(Filters).includes(newFilter)
}

const getCurrentFiltrer = () => {
    return state.filter;
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