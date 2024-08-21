import { createUniqueId, createDate } from "./helper-functions.js";
import { addToStorage, updateInStorage } from "./storage.js";
import { displayTodo } from "./renderer.js";

export class Todo {
    constructor(title, dueDate, project, description = "", priority = "normal", complete = false) {
        this.id = createUniqueId();
        this.title = title;
        this.dueDate = dueDate;
        this.description = description;
        this.priority = priority;
        this.project = project;
        this.complete = complete;
        ALL_TODOS.appendTodo(this);
        displayTodo(this);
        addToStorage(this);
    }

    changeStatus() {
        this.complete = this.complete == false ? true : false;
        updateInStorage(this);
    }

    changeTitle(title) {
        this.title = title;
        updateInStorage(this);
        console.log(this);    
    }

    changeDate(date) {
        this.dueDate = date;
        updateInStorage(this);
        console.log(this);    
    }

    changeDescription(desc) {
        this.description = desc;
        updateInStorage(this);
        console.log(this);    
    }

    changePriority(priority) {
        this.priority = priority;
        updateInStorage(this);
        console.log(this);    
    }

    changeProject(project) {
        this.project = project;
        updateInStorage(this);
        console.log(this);    
    }
}

class TodoManager {
    constructor() {
        this.list = [];
    }

    appendTodo(todo) {
        this.list.push(todo);
        this.sortStoredTodos(this.list)
    }

    sortStoredTodos() {
        if (this.list) {
            this.list.sort((a, b) => {
                return createDate(a.dueDate) - createDate(b.dueDate);
            })
        }
    }
}

export const ALL_TODOS = new TodoManager();