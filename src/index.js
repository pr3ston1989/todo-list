import { Todo } from "./todo.js";
import { Project, allProjects } from "./project.js";
import { Note } from "./note.js";
import { ElementRenderer } from "./renderer.js";
import { TodoFormHandler } from "./todo-form-handler.js";
import "./styles.css";

// const sticky = new Note("TOP - To Do List", "Utworzyć projekt To Do List, stosując się do zasad SOLID.");
// const stickyNotesList = new ElementRenderer(document.querySelector("ul"));
// stickyNotesList.createNote(sticky);

const schoolProject = new Project("School");

const todoForm = new TodoFormHandler('add-todo');

todoForm.handleSubmit();

const projectSelectOptions = new ElementRenderer(document.getElementById("projects"));
projectSelectOptions.createProjectsList(allProjects.getAllProjects());

const link = document.querySelector('a');
const moreInfo = document.querySelector('.more-info');

link.addEventListener('click', (e) => {
    e.preventDefault();
    moreInfo.hidden = moreInfo.hidden === false ? true : false;
})

const karmienie = new Todo("karmic koty", "20.08.2024", "School", "dwa razy dziennie karmic koty", "high");
const karmienie2 = new Todo("karmic koty 2", "22.08.2024", "School", "dwa razy dziennie karmic koty", "low");
schoolProject.addTodo(karmienie);
schoolProject.addTodo(karmienie2);

console.log(allProjects);

allProjects.deleteTodoFromProject(karmienie);

console.log(allProjects);

document.querySelector("#open-todo-form")
.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector(".popup").classList.add("active");
})

document.querySelector(".popup .close-btn")
.addEventListener("click", () => {
    document.querySelector(".popup").classList.remove("active");
})