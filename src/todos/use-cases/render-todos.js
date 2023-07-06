import {Todo} from '../models/todo.model';
import { createTodoHTML } from './';

let element;

export const renderTodos = (elementId, todos = []) => { //Puedes mandar también el elemento
    //console.log(elementId, todos);

    if (!element) element = document.querySelector(elementId);

    if (!element) throw new Error(`Elemento ${elementId} no encontrado`);

    element.innerHTML = '';

    todos.forEach( todo => {
        element.append(createTodoHTML(todo));
    })
}