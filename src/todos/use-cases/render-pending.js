import todoStore, { Filters } from "../../store/todo.store";


let element;

export const renderPending = (elementId) => {
    if (!element) element = document.querySelector(elementId);
    if (!element) throw new Error(`El elemento ${element} no existe`);

    element.innerHTML = todoStore.getTodos(Filters.pending).length;
}