import "./styles.css";
import { FormHandler } from "./form-handler.js";
import { populateWithExampleData } from "./example.js";
import { showAllNotes, showAllTodos,
         showCompletedTodos, showTodosForMonth,
         showTodosForProject, showTodosForToday,
         showTodosForWeek, setTodoClass, toggleButtons } from "./helper-functions.js"
import { getFromStorage, getProjects, createStoredTodos } from "./storage.js"
import { ALL_TODOS } from "./todo.js"  
import { createProjectsList, createProjectsMenu,
         openForm, addNewProject } from "./renderer.js";

new FormHandler('add-todo');
new FormHandler('add-note');

openForm('#open-todo-form', '.popup-1');
openForm("#open-note-form", ".popup-2")

addNewProject();

const storedTodos = getFromStorage();
createStoredTodos(storedTodos);

ALL_TODOS.sortStoredTodos();

const menu = document.querySelector('.sidebar');
const functionsMap = {
    'today-todos': showTodosForToday,
    'all-todos': showAllTodos,
    'week-todos': showTodosForWeek,
    'month-todos': showTodosForMonth,
    'completed-todos': showCompletedTodos,
}
menu.addEventListener('click', (e) => {
    
    if (e.target.id === 'notes') {
        document.getElementById(`open-todo-form`).style.display = 'none';
        document.getElementById(`open-note-form`).style.display = 'block';
        showAllNotes();
    } else {
        setTodoClass('note', 'todo')
        if (functionsMap[e.target.id]) {
            functionsMap[e.target.id](ALL_TODOS.list);
        }

        if (e.target.id === 'example-data') {
            populateWithExampleData();
        }

        JSON.parse(localStorage.getItem('projects')).forEach(project => {
            if (e.target.id === project.id) {
                showTodosForProject(ALL_TODOS.list, project.id);
            }
        })
        
    }
})

createProjectsMenu(getProjects());


