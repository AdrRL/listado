import todoStore from '../store/todo.store';
import html from './app.html?raw'; //?raw es para que no de error
import { renderTodos } from './use-cases';


const ElementIds = {
    TodoList: '.todo-list', //Eliminamis posibles cambios del futuro dañinos para el programa
    NewTodoInput: '#new-todo-input',
}

/**
 * Creará lo que vamos a establecer por pantalla
 * @param {String} elementId
 */
export const App = (elementId) => {
    
    const displayTodos = () => {
        const todos = todoStore.getTodos(todoStore.getCurrentFiltrer());
        renderTodos(ElementIds.TodoList, todos);
    }

    //Función anónima auto-invocada 
    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos();
    }) (); 

    //Referencias HTML
    const newDescripcionInput = document.querySelector(ElementIds.NewTodoInput);
    const todoListUL = document.querySelector(ElementIds.TodoList);

    //Listeners
    newDescripcionInput.addEventListener('keyup', (evento) => {
        //console.log(evento.target.value )
        if (evento.keyCode !== 13) return;  //Solo acaba si pulso enter
        if (evento.target.value.trim().length === 0 ) return;     //trim elimina los espacios

        todoStore.addTodo(evento.target.value);
        displayTodos();
        evento.target.value = '';
    }); 

    todoListUL.addEventListener('click', (evento) => {
        //console.log(evento.target);

        const element = evento.target.closest('[data-id]') //Busque el padre más cercano con este elemento para poder identificar
        todoStore.toggleTodo(element.getAttribute('data-id'));
        displayTodos();
    });
}