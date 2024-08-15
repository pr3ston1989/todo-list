import { ElementRenderer } from "./renderer.js";

const TODO_LIST = document.querySelector(".todo-list");
const TODO_RENDERER = new ElementRenderer(TODO_LIST);

export class ToDo {
    constructor(title, dueDate, project, description = "", priority = "normal") {
        this.id = this.createUniqueId();
        this.title = title;
        this.dueDate = dueDate;
        this.description = description;
        this.priority = priority;
        this.project = project;
        this.complete = false;
        TODO_RENDERER.createTodo(this);
    }

    createUniqueId() {
        return parseInt(Math.ceil(Math.random() * Date.now()));
    }
}