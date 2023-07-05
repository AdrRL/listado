import html from './app.html?raw'; //?raw es para que no de error

/**
 * Creará lo que vamos a establecer por pantalla
 * @param {String} elementId
 */
export const App = (elementId) => {
    
    //Función anónima auto-invocada 
    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
    }) (); 
}