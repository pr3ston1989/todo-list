import { ToDo } from "./todo.js";
import { Project } from "./project.js";
import { Note } from "./note.js";
import { ElementRenderer } from "./renderer.js";
import { TodoFormHandler } from "./todo-form-handler.js";
import "./styles.css";

const defaultProject = new Project("Default");

const todoItem = new ToDo("Apka", "20.08.2024", defaultProject.name, "Stworzenie aplikacji webowej z listą to-do.", 3)
console.log(todoItem.project)
defaultProject.addTodo(todoItem);

const sticky = new Note("TOP - To Do List", "Utworzyć projekt To Do List, stosując się do zasad SOLID.");

const stickyNotesList = new ElementRenderer(document.querySelector("ul"));
stickyNotesList.createNote(sticky);

const todoForm = new TodoFormHandler('add-todo');

todoForm.handleSubmit();