import { Todo } from "./todo.js";
import { Project, allProjects } from "./project.js";
import { Note, allNotesList } from "./note.js";
import { openForm, ElementRenderer, TODO_RENDERER } from "./renderer.js";
import { FormHandler } from "./todo-form-handler.js";
import { format, isToday, isThisISOWeek, isThisMonth } from "date-fns";
import { populateWithExampleData } from "./example.js";
import "./styles.css";

export function addGlobalEventListener(type, selector, callback, parent = document) {
    parent.addEventListener(type, e => {
        if (e.target.matches(selector)) {
            callback(e);
        }
    })
}   

openForm('#open-todo-form', '.popup-1');
openForm("#open-note-form", ".popup-2");

function toggleButtons() {
    const noteBtn = document.getElementById('open-note-form');
    const todoBtn = document.getElementById('open-todo-form');

    noteBtn.style.display = (noteBtn.style.display === 'block') ? 'none' : 'block';
    todoBtn.style.display = (noteBtn.style.display === 'block') ? 'none' : 'block';
}

document.querySelector('.todo-list').addEventListener('click', (e) => {
    if (e.target.matches('span')) {
        e.target.parentElement.remove();
    }
})

const noteContainer = document.querySelector('.todo-list');

addGlobalEventListener('enter', 'p', (e) => {
    e.target.textContent + '<br>';
}, noteContainer)
addGlobalEventListener('enter', 'h4', (e) => {
    e.target.textContent + '<br>';
}, noteContainer)


const schoolProject = new Project("School");

const todoForm = new FormHandler('add-todo');
const noteForm = new FormHandler('add-note');

const projectSelectOptions = new ElementRenderer(document.getElementById("projects"));
projectSelectOptions.createProjectsList(allProjects.getAllProjects());
projectSelectOptions.createProjectsMenu(allProjects.getAllProjects());

console.log(allProjects);
console.log(allProjects);

const sticky = new Note("TOP - To Do List", "Utworzyć projekt To Do List, stosując się do zasad SOLID.");
const sticky2 = new Note("TOP - To Do List", "Utworzyć projekt To Do List, stosując się do zasad SOLID.");
const sticky3 = new Note("TOP - To Do List", "Utworzyć projekt To Do List, stosując się do zasad SOLID.");


function showAllNotes(allNotes) {
    TODO_RENDERER.clearContainer();
    allNotes.getNotees().forEach(note => {
        TODO_RENDERER.createNote(note);
    })
}

document.addEventListener('click', (e) => {
    if (e.target.id === 'notes') {
        toggleButtons();
        showAllNotes(allNotesList);
    }
    
    if (e.target.id === 'today-todos') {
        showTodosForToday(allTodosList);
        toggleButtons();
    }

    if (e.target.id === 'all-todos') {
        showAllTodos(allTodosList);
    }

    if (e.target.id === 'week-todos') {
        showTodosForWeek(allTodosList);
    }

    if (e.target.id === 'month-todos') {
        showToodosForMonth(allTodosList);
    }

    allProjects.getAllProjects().forEach(project => {
        if (e.target.id === project.name) {
            showTodosForProject(allTodosList, project.name);
        }
    })

    if (e.target.id === 'example-data') {
        populateWithExampleData();
    }
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
    TODO_RENDERER.clearContainer();
    allTodos.forEach(todo => {
        if (isToday(new Date(todo.dueDate))) {
            todo.displayTodo();
        }
    })
}

function showTodosForWeek(allTodos) {
    TODO_RENDERER.clearContainer();
    allTodos.forEach(todo => {
        if (isThisISOWeek(new Date(todo.dueDate))) {
            todo.displayTodo();
        }
    })
}

function showToodosForMonth(allTodos) {
    TODO_RENDERER.clearContainer();
    allTodos.forEach(todo => {
        if (isThisMonth(new Date(todo.dueDate))) {
            todo.displayTodo();
        }
    })
}

function showTodosForProject(allTodos, projectName) {
    TODO_RENDERER.clearContainer();
    allTodos.forEach(todo => {
        if (todo.project === projectName) {
            todo.displayTodo();
        }
    })
}