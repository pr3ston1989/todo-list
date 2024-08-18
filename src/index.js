import { Todo } from "./todo.js";
import { Project, allProjects } from "./project.js";
import { Note, allNotesList } from "./note.js";
import { openTodoForm, ElementRenderer, TODO_RENDERER } from "./renderer.js";
import { TodoFormHandler } from "./todo-form-handler.js";
import "./styles.css";

function addGlobalEventListener(type, selector, callback, parent = document) {
    parent.addEventListener(type, e => {
        if (e.target.matches(selector)) {
            callback(e);
        }
    })
}

const schoolProject = new Project("School");

const todoForm = new TodoFormHandler('add-todo');

const projectSelectOptions = new ElementRenderer(document.getElementById("projects"));
projectSelectOptions.createProjectsList(allProjects.getAllProjects());
projectSelectOptions.createProjectsMenu(allProjects.getAllProjects());

console.log(allProjects);
console.log(allProjects);

openTodoForm("#open-todo-form");

document.addEventListener('click', (e) => {
    if (e.target.id === 'notes') {
        console.log(allTodosList);
        const sticky = new Note("TOP - To Do List", "Utworzyć projekt To Do List, stosując się do zasad SOLID.");
        const stickyNotesList = new ElementRenderer(document.querySelector(".main"));
        stickyNotesList.clearContainer();
        stickyNotesList.createNote(sticky);
    }
    
    if (e.target.id === 'today-todos') {
        showTodosForToday(allTodosList);
    }

    if (e.target.id === 'all-todos') {
        showAllTodos(allTodosList);
    }

    console.log(e.target.id)
})



export const allTodosList = [];

(function() {
    const allStorageTodos = JSON.parse(localStorage.getItem('todos'));
    localStorage.clear();
    if (allStorageTodos) {
        allStorageTodos.sort((a, b) => {
            if (a.complete && !b.complete) {
                return 1;
            } else if (!a.complete && b.complete) {
                return -1;
            } else {
                return 0;
            }
        })
        allStorageTodos.forEach(todo => {
            const todoObj = new Todo(
                todo.title,
                todo.dueDate,
                todo.project,
                todo.description,
                todo.priority,
                todo.complete
            )
        })
    }
})();



function showAllTodos(allTodos) {
    console.log(allTodosList);
    TODO_RENDERER.clearContainer();
    allTodos.sort((a, b) => {
        if (a.complete && !b.complete) {
            return 1;
        } else if (!a.complete && b.complete) {
            return -1;
        } else {
            return 0;
        }
    })

    allTodos.forEach(todo => {
        todo.displayTodo();
    });
}


function showTodosForToday(allTodos) {
    console.log(allTodosList);
    const today = new Date().getDay();
    TODO_RENDERER.clearContainer();
    allTodos.forEach(todo => {
        const todoDate = new Date(todo.dueDate).getDay();
        if (todoDate === today) {
            todo.displayTodo();
        }
    })
}
