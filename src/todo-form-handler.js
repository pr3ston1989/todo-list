import { Todo } from "./todo.js";

export class TodoFormHandler {
    constructor(formId) {
        this.form = document.getElementById(formId);
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
    }

    handleSubmit() {  
        const formData = new FormData(this.form);
        const title = formData.get('title');
        const date = formData.get('due-date');
        const description = formData.get('description');
        const priority = formData.get('priority');

        const todo = new Todo(title, date, '', description, priority);
        console.log(todo);
    }
}