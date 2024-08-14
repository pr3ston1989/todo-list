import { ToDo } from "./todo.js";
import { Project, AllProjects, allProjects } from "./project.js";
import { Note } from "./note.js";
import { ElementRenderer } from "./renderer.js";
import { TodoFormHandler } from "./todo-form-handler.js";
import "./styles.css";

// const sticky = new Note("TOP - To Do List", "Utworzyć projekt To Do List, stosując się do zasad SOLID.");
// const stickyNotesList = new ElementRenderer(document.querySelector("ul"));
// stickyNotesList.createNote(sticky);

const schoolProject = new Project("School");
allProjects.addProject(schoolProject);
console.log(allProjects.getAllProjects());

const todoForm = new TodoFormHandler('add-todo');

todoForm.handleSubmit();