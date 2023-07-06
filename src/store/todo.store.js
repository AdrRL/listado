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

export default {    //Se pueden poner varios
    initStore,
}