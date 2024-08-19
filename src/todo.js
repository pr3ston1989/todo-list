import { ElementRenderer } from "./renderer.js";
import { addToLocalStorage, updateInLocalStorage } from "./storage.js";
import { allTodosList } from "./index.js";

const TODO_LIST = document.querySelector(".todo-list");
const TODO_RENDERER = new ElementRenderer(TODO_LIST);

export class Todo {
    constructor(title, dueDate, project, description = "", priority = "normal", complete = false) {
        this.id = this.createUniqueId();
        this.title = title;
        this.dueDate = dueDate;
        this.description = description;
        this.priority = priority;
        this.project = project;
        this.complete = complete;
        this.displayTodo();
        addToLocalStorage(this);
        allTodosList.push(this);
    }

    changeStatus() {
        this.complete = this.complete == false ? true : false;
        updateInLocalStorage(this);
    }

    changeTitle(title) {
        this.title = title;
        updateInLocalStorage(this);
        console.log(this);    
    }

    changeDate(date) {
        this.dueDate = date;
        updateInLocalStorage(this);
        console.log(this);    
    }

    changeDescription(desc) {
        this.description = desc;
        updateInLocalStorage(this);
        console.log(this);    
    }

    changePriority(priority) {
        this.priority = priority;
        updateInLocalStorage(this);
        console.log(this);    
    }

    changeProject(project) {
        this.project = project;
        updateInLocalStorage(this);
        console.log(this);    
    }

    displayTodo() {
        TODO_RENDERER.createTodo(this);
    }
}

export function createUniqueId() {
    return parseInt(Math.ceil(Math.random() * Date.now()));
}

Object.assign(Todo.prototype, {createUniqueId});