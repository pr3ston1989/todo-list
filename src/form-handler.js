import { Todo } from "./todo.js";
import { Note } from "./note.js";

export class FormHandler {
    constructor(formId) {
        this.form = document.getElementById(formId);
        this.submitButton = this.form.querySelector("button");
        this.submitButton.addEventListener('click', (e) => {
            e.preventDefault();
            if (formId === 'add-todo') {
                this.handleTodoSubmit();
            }
            if (formId === 'add-note') {
                this.handleNoteSubmit();
            }
        });
    }

    handleTodoSubmit() {  
        const formData = new FormData(this.form);
        const title = formData.get('title');
        const date = formData.get('due-date');
        const project = formData.get('projects')
        const description = formData.get('description');
        const priority = formData.get('priority');
        const todo = new Todo(title, date, project, description, priority);
        this.form.reset();
        document.querySelector(".popup-1").classList.remove("active");
    }

    handleNoteSubmit() {
        const formData = new FormData(this.form);
        const title = formData.get('title');
        const text = formData.get('text');
        const note = new Note(title, text);
        this.form.reset();
        document.querySelector(".popup-2").classList.remove("active");
    }
}