import { Todo } from '../todos/models/todo.model';


export const Filters = {
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
    //console.log(state);
    loadStore();
    console.log('Init store');
}

const loadStore = () => {
    if (!localStorage.getItem('state')) return;

    //console.log(JSON.parse(localStorage.getItem('state')));
    const {todos = [], filter = Filters.All} = JSON.parse(localStorage.getItem('state'));
    state.todos = todos;
    state.filter = filter;
}

const saveStateToLocalStorage = () => {
    localStorage.setItem('secreto', 'Quien encuentre esto primero le hago bizum de 1€');
    localStorage.setItem('state', JSON.stringify(state));
};

const getTodos = (filter = Filters.All) => {
    switch(filter){
        case Filters.All:
            return [...state.todos];    //Le mando vector
        case Filters.completed:
            return state.todos.filter(todo => todo.done);   // todo.done === true // true === true 
        case Filters.pending:
            return state.todos.filter(todo => !todo.done);
        default:
            throw new Error(`La opción mandada ${filter} no es válida`);
        
    }
}

const addTodo = ( description ) => {
    if (!description) throw new Error('La descripción debe tener algún valor');

    state.todos.push(new Todo(description));

    saveStateToLocalStorage();
}

const toggleTodo = (todoId) => {
    state.todos = state.todos.map(todo => { //Permite recorrerlo
        if (todo.id === todoId){
            todo.done = !todo.done;
        }
        return todo;
    });

    saveStateToLocalStorage();
}

const deleteTodo = (todoId) => {
    state.todos = state.todos.filter(todo => todoId != todo.id);

    saveStateToLocalStorage();
}

const deleteCompleted = () => {
    state.todos = state.todos.filter(todo => !todo.done);

    saveStateToLocalStorage();
}

const setFiltrer = (newFiltrer = Filters.All) => {
    state.filter = newFiltrer;  //Se podría filtrar que debe estar en la enumeración Object.keys(Filters).includes(newFilter)

    saveStateToLocalStorage();
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