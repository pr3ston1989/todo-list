import { Project } from "./project.js";
import { Note } from "./note.js";
import { FormHandler } from "./todo-form-handler.js";
import { format, isToday, isThisISOWeek, isThisMonth } from "date-fns";
import { populateWithExampleData } from "./example.js";
import "./styles.css";
import app, { addGlobalEventListener } from "./main-app.js"
import { ALL_TODOS } from "./todo.js"  
import { createProjectsList, createProjectsMenu, addProjectToMenu } from "./renderer.js";

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
            new Project(project.id);
        })
    } else {
        new Project('Default');
    }
    return allProjects;
}



export const projects = getProjects();

createProjectsList(
    projects,
    document.getElementById('projects')
);
createProjectsMenu(projects);

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
        showTodosForToday(ALL_TODOS.list);
        toggleButtons();
    }

    if (e.target.id === 'all-todos') {
        showAllTodos(ALL_TODOS.list);
    }

    if (e.target.id === 'week-todos') {
        showTodosForWeek(ALL_TODOS.list);
    }

    if (e.target.id === 'month-todos') {
        showTodosForMonth(ALL_TODOS.list);
    }

    projects.forEach(project => {
        if (e.target.id === project.id) {
            showTodosForProject(ALL_TODOS.list, project.id);
        }
    })

    if (e.target.id === 'example-data') {
        populateWithExampleData();
    }
})







function showAllTodos(allTodos) {
    TODO_RENDERER.clearContainer();
    allTodos.forEach(todo => {
        TODO_RENDERER.displayTodo(todo);
    })
};


function showTodosForToday(allTodos) {
    TODO_RENDERER.clearContainer();
    allTodos.forEach(todo => {
        if (isToday(new Date(todo.dueDate))) {
            TODO_RENDERER.displayTodo(todo)
        }
    })
}

function showTodosForWeek(allTodos) {
    TODO_RENDERER.clearContainer();
    allTodos.forEach(todo => {
        if (isThisISOWeek(new Date(todo.dueDate))) {
            TODO_RENDERER.displayTodo(todo)
        }
    })
}

function showTodosForMonth(allTodos) {
    TODO_RENDERER.clearContainer();
    allTodos.forEach(todo => {
        if (isThisMonth(new Date(todo.dueDate))) {
            TODO_RENDERER.displayTodo(todo)
        }
    })
}

function showTodosForProject(allTodos, projectName) {
    TODO_RENDERER.clearContainer();
    allTodos.forEach(todo => {
        if (todo.project === projectName) {
            TODO_RENDERER.displayTodo(todo)
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
        addProjectToMenu(new Project(projectName.value));
        projectName.value = '';
        projectName.hidden = true;
        projectButton.hidden = true;
    })
})

