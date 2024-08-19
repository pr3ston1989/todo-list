import { openForm } from "./renderer.js";

export function addGlobalEventListener(type, selector, callback, parent = document) {
    parent.addEventListener(type, e => {
        if (e.target.matches(selector)) {
            callback(e);
        }
    })
} 

export default (() => {
    openForm('#open-todo-form', '.popup-1');
    openForm("#open-note-form", ".popup-2");
})();