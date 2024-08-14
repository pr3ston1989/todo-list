import { ToDo } from "./todo.js";

export class TodoFormHandler {
    constructor(formId) {
        this.form = document.getElementById(formId);
        this.form.addEventListener('submit', (event) => this.handleSubmit(event));
    }

    handleSubmit(event) {
        event.preventDefault();
        
        const formData = new FormData(this.form);
        const title = formData.get('title');
        const date = formData.get('due-date');

        const todo = new ToDo(title, date);
        console.log(todo);
    }
}