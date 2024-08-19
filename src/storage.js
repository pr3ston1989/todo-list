import { allTodosList } from "./index.js";


export function addToLocalStorage(data) {
  let todos = JSON.parse(localStorage.getItem('todos')) || [];
  todos.push(data);
  localStorage.setItem('todos', JSON.stringify(todos));
}

export function removeFromLocalStorage(data) {
  let todos = JSON.parse(localStorage.getItem('todos')) || [];
  todos = todos.filter(todo => data.id !== todo.id);
  localStorage.setItem('todos', JSON.stringify(todos));
}

export function updateInLocalStorage(data) {
  removeFromLocalStorage(data);
  addToLocalStorage(data);
}

export function addNoteToStorage(data) {
  let notes = JSON.parse(localStorage.getItem('notes')) || [];
  notes.push(data);
  localStorage.setItem('notes', JSON.stringify(notes));
}

export function removeNoteFromStorage(data) {
  let notes = JSON.parse(localStorage.getItem('notes')) || [];
  notes = notes.filter(note => data.id !== note.id);
  localStorage.setItem('notes', JSON.stringify(notes));
}

export function updateNoteInStorage(data) {
  removeNoteFromStorage(data);
  addNoteToStorage(data);
}


export function addProjectToStorage(data) {
  let projects = JSON.parse(localStorage.getItem('projects')) || [];
  projects.push(data);
  localStorage.setItem('projects', JSON.stringify(projects));
}


export function removeProjectFromStorage(data) {
  let projects = JSON.parse(localStorage.getItem('projects')) || [];
  projects = projects.filter(project => project.name !== data.name);
  allTodosList.forEach(todo => {
    if (project.name === todo.project) {
      todo.changeProject('Default');
    }
  })
  localStorage.setItem('projects', JSON.stringify(projects));
}