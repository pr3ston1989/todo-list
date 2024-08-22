import { Project } from "./project.js";
import { Todo } from "./todo.js"
import { createDate } from "./helper-functions.js";

export function addToStorage(data, item = 'todos') {
  let storedData = JSON.parse(localStorage.getItem(item)) || [];
  storedData.push(data);
  localStorage.setItem(item, JSON.stringify(storedData));
}

export function removeFromStorage(data, item = 'todos') {
  let storedData = JSON.parse(localStorage.getItem(item)) || [];
  storedData = storedData.filter(obj => data.id !== obj.id);
  localStorage.setItem(item, JSON.stringify(storedData));
}

export function updateInStorage(data, item = 'todos') {
  removeFromStorage(data, item);
  addToStorage(data, item);
}

export function getFromStorage(item = 'todos') {
  const storageItems = JSON.parse(localStorage.getItem(item));
  if (item === 'todos') {
    localStorage.removeItem(item);
  }
  return storageItems;
} 

export function getProjects() {
  let allProjects = JSON.parse(localStorage.getItem('projects'));
  if (allProjects) {
      localStorage.removeItem('projects');
      allProjects.forEach(project => {
          addToStorage(new Project(project.id), 'projects')
      })
  } else {
      addToStorage(new Project('Default'), 'projects');
      allProjects = JSON.parse(localStorage.getItem('projects'));
  }
  return allProjects;
}

export function createStoredTodos(storedTodos) {
  if (storedTodos) {
    storedTodos.sort((a, b) => {
      return createDate(a.dueDate) - createDate(b.dueDate);
    })
      storedTodos.forEach(todo => {
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
}