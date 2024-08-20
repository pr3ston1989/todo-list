import { openForm } from "./renderer.js";
import { getFromStorage } from "./storage.js";
import { Todo } from "./todo.js";

export function createUniqueId() {
    return parseInt(Math.ceil(Math.random() * Date.now()));
}

export function addGlobalEventListener(type, selector, callback, parent = document) {
    parent.addEventListener(type, e => {
        if (e.target.matches(selector)) {
            callback(e);
        }
    })
}

export function createDate(calendarDate) {
    const splittedDate = calendarDate.split('-');
    return new Date(splittedDate[0], splittedDate[1], splittedDate[2]);
}

function createStoredTodos(storedTodos) {
    if (storedTodos) {
        storedTodos.forEach(todo => {
            new Todo(
                todo.title,
                todo.dueDate,
                todo.project,
                todo.description,
                todo.priority,
                todo.complete
            )
        })
    }    
}

export default (() => {
    //activate 
    openForm('#open-todo-form', '.popup-1');
    openForm("#open-note-form", ".popup-2");

    // generate todos from storage for homepage
    const storedTodos = getFromStorage();
    createStoredTodos(storedTodos);

})();