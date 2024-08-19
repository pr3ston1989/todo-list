import { Todo } from "./todo.js";
import { Project } from "./project.js";
import { Note, allNotesList } from "./note.js";
import { TODO_RENDERER, projectSelectOptions } from "./renderer.js";
import { FormHandler } from "./todo-form-handler.js";
import { format, isToday, isThisISOWeek, isThisMonth } from "date-fns";
import { populateWithExampleData } from "./example.js";
import "./styles.css";
import app, { addGlobalEventListener } from "./main-app.js"

  

function toggleButtons() {
    const noteBtn = document.getElementById('open-note-form');
    const todoBtn = document.getElementById('open-todo-form');

    noteBtn.style.display = (noteBtn.style.display === 'block') ? 'none' : 'block';
    todoBtn.style.display = (noteBtn.style.display === 'block') ? 'none' : 'block';
}

const noteContainer = document.querySelector('.todo-list');

addGlobalEventListener('enter', 'p', (e) => {
    e.target.textContent + '<br>';
}, noteContainer)
addGlobalEventListener('enter', 'h4', (e) => {
    e.target.textContent + '<br>';
}, noteContainer)

new FormHandler('add-todo');
new FormHandler('add-note');





function getProjects() {
    const allProjects = JSON.parse(localStorage.getItem('projects'));
    localStorage.removeItem('projects');
    if (allProjects) {
        allProjects.forEach(project => {
            new Project(project.name);
        })
    } else {
        projectSelectOptions.addProjectToMenu(new Project('Default'));
    }
    return allProjects;
}



export const projects = getProjects();

projectSelectOptions.createProjectsList(projects);
projectSelectOptions.createProjectsMenu(projects);

function showAllNotes() {
    const mainDiv = document.querySelector('.main');
    mainDiv.classList.remove('todo-list')
    mainDiv.classList.add('note-list')
    TODO_RENDERER.clearContainer();
    const storageNotes = JSON.parse(localStorage.getItem('notes')) || [];
    localStorage.removeItem('notes');
    if (storageNotes) {
        storageNotes.forEach(note => {
            new Note(note.title, note.text);
        })
    }

}

document.addEventListener('click', (e) => {
    if (e.target.id === 'notes') {
        toggleButtons();
        showAllNotes();
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
        showTodosForMonth(allTodosList);
    }

    projects.forEach(project => {
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
    localStorage.removeItem('todos');
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

function showTodosForMonth(allTodos) {
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


const projectName = document.getElementById('new-project-name');
const projectButton = document.getElementById('new-project-button');
const addNewProjectButton = document.getElementById('add-new-project');
addNewProjectButton.addEventListener('click', () => {
    projectName.hidden = false;
    projectButton.hidden = false;
    projectButton.addEventListener('click', (e) => {
        e.preventDefault();
        projectSelectOptions.addProjectToMenu(new Project(projectName.value));
        projectName.value = '';
        projectName.hidden = true;
        projectButton.hidden = true;
    })
})

