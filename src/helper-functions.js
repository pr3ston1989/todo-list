import { isThisMonth, isThisISOWeek, isToday } from "date-fns";
import { displayTodo } from "./renderer";
import { Note } from "./note.js"

export function createUniqueId() {
    return parseInt(Math.ceil(Math.random() * Date.now()));
}

export function addGlobalEventListener(type, selector, callback, parent = document) {
    parent.addEventListener(type, e => {
        if (e.target.matches(selector)) {
            callback(e);
        }
    })
}

export function createDate(calendarDate) {
    const splittedDate = calendarDate.split('-');
    return new Date(splittedDate[0], splittedDate[1], splittedDate[2]);
}

export function toggleButtons() {
    const noteBtn = document.getElementById('open-note-form');
    const todoBtn = document.getElementById('open-todo-form');

    noteBtn.style.display = (noteBtn.style.display === 'block') ? 'none' : 'block';
    todoBtn.style.display = (noteBtn.style.display === 'block') ? 'none' : 'block';
}

export function showAllNotes() {
    const mainDiv = document.querySelector('.main');
    console.log(mainDiv.classList)
    mainDiv.innerHTML = "";
    mainDiv.classList.remove('todo-list')
    mainDiv.classList.add('note-list')
    
    const storageNotes = JSON.parse(localStorage.getItem('notes')) || [];
    localStorage.removeItem('notes');
    if (storageNotes) {
        storageNotes.forEach(note => {
            const noteObj = new Note(note.title, note.text);
        })
    }

}

export function showAllTodos(allTodos) {
    document.querySelector(".main").innerHTML = "";
    allTodos.forEach(todo => {
        if (!todo.complete) {
            displayTodo(todo);
        }
    })
};

export function showTodosForToday(allTodos) {
    document.querySelector(".main").innerHTML = "";
    allTodos.forEach(todo => {
        if (isToday(new Date(todo.dueDate)) && !todo.complete) {
            displayTodo(todo)
        }
    })
};

export function showTodosForWeek(allTodos) {
    document.querySelector(".main").innerHTML = "";
    allTodos.forEach(todo => {
        if (isThisISOWeek(new Date(todo.dueDate)) && !todo.complete) {
            displayTodo(todo)
        }
    })
};

export function showTodosForMonth(allTodos) {
    document.querySelector(".main").innerHTML = "";
    allTodos.forEach(todo => {
        if (isThisMonth(new Date(todo.dueDate)) && !todo.complete) {
            displayTodo(todo)
        }
    })
};

export function showTodosForProject(allTodos, projectName) {
    document.querySelector(".main").innerHTML = "";
    allTodos.forEach(todo => {
        if (todo.project.toUpperCase() === projectName.toUpperCase() && !todo.complete) {
            displayTodo(todo)
        }
    })
};

export function showCompletedTodos(allTodos) {
    document.querySelector(".main").innerHTML = "";
    allTodos.forEach(todo => {
        if (todo.complete) {
            displayTodo(todo);
        }
    })
};

export function setTodoClass(note, todo) {
    document.querySelector('.main').classList.remove(`${note}-list`)
    document.querySelector('.main').classList.add(`${todo}-list`)
    document.getElementById(`open-${note}-form`).style.display = 'none';
    document.getElementById(`open-${todo}-form`).style.display = 'block';
}