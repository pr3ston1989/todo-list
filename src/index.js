import { Todo } from "./todo.js";
import { Project, allProjects } from "./project.js";
import { Note, allNotesList } from "./note.js";
import { openTodoForm, ElementRenderer } from "./renderer.js";
import { TodoFormHandler } from "./todo-form-handler.js";
import "./styles.css";

const schoolProject = new Project("School");

const todoForm = new TodoFormHandler('add-todo');

const projectSelectOptions = new ElementRenderer(document.getElementById("projects"));
projectSelectOptions.createProjectsList(allProjects.getAllProjects());

const link = document.querySelector('a');
const moreInfo = document.querySelector('.more-info');

link.addEventListener('click', (e) => {
    e.preventDefault();
    moreInfo.hidden = moreInfo.hidden === false ? true : false;
})

console.log(allProjects);
console.log(allProjects);

openTodoForm("#open-todo-form");

document.getElementById('notes').addEventListener('click', () => {

    const sticky = new Note("TOP - To Do List", "Utworzyć projekt To Do List, stosując się do zasad SOLID.");
    const stickyNotesList = new ElementRenderer(document.querySelector(".main"));
    stickyNotesList.clearContainer();
    stickyNotesList.createNote(sticky);
})


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
        new Todo(
            todo.title,
            todo.dueDate,
            todo.project,
            todo.description,
            todo.priority,
            todo.complete
        )
    });
}
