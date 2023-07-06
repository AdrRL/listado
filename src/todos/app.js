import todoStore, {Filters} from '../store/todo.store';
import html from './app.html?raw'; //?raw es para que no de error
import { renderPending, renderTodos } from './use-cases';


const ElementIds = {
    TodoList: '.todo-list', //Eliminamis posibles cambios del futuro dañinos para el programa
    NewTodoInput: '#new-todo-input',
    ClearCompleted: '.clear-completed',
    TodoFilters: '.filtro',
    PendingCountLabel: '#pending-count',
}

/**
 * Creará lo que vamos a establecer por pantalla
 * @param {String} elementId
 */
export const App = (elementId) => {
    
    const displayTodos = () => {
        const todos = todoStore.getTodos(todoStore.getCurrentFiltrer());
        renderTodos(ElementIds.TodoList, todos);
        updatePendingCount();
    }

    const updatePendingCount = () => {
        renderPending(ElementIds.PendingCountLabel);
    };

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
    const borradoCompletado = document.querySelector(ElementIds.ClearCompleted);
    const filtersUL = document.querySelectorAll(ElementIds.TodoFilters);

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

    todoListUL.addEventListener('click', (evento) => {
        const esDestroy = evento.target.className ==='destroy';
        const element = evento.target.closest('[data-id]')
        if (!element || !esDestroy) return;

        todoStore.deleteTodo(element.getAttribute('data-id'));
        displayTodos();
    });

    borradoCompletado.addEventListener('click', () => {
        todoStore.deleteCompleted();
        displayTodos();
    });

    filtersUL.forEach(elemento => {
        elemento.addEventListener('click', (elemento) => {
            filtersUL.forEach(el => el.classList.remove('selected'));
            elemento.target.classList.add('selected');

            switch(elemento.target.text){
                case 'Todos':
                    todoStore.setFiltrer(Filters.All);
                    break;
                case 'Completados':
                    todoStore.setFiltrer(Filters.completed);
                    break;
                case 'Pendientes':
                    todoStore.setFiltrer(Filters.pending);
                    break;
            }
            displayTodos();
        })
    })
}