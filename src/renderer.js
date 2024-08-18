import { allProjects } from "./project.js";
import { format, compareAsc } from "date-fns";
import { removeFromLocalStorage } from "./storage.js";


export function setDefaultDate(inputSelector) {
    const todayDate = format(new Date(), "yyyy-LL-dd");
    const dateField = document.getElementById(inputSelector);
    dateField.value = todayDate;
}


export function openTodoForm(buttonSelector) {
    document.querySelector(buttonSelector)
    .addEventListener('click', (e) => {
        e.preventDefault();
        setDefaultDate("due-date");
        document.querySelector(".popup").classList.add("active");
    })

    document.querySelector(".popup .close-btn").addEventListener("click", () => {
    document.querySelector(".popup").classList.remove("active");
    })
}

export class ElementRenderer {
    constructor(container) {
        this.container = container;
    }

    createNote(note) {
        const stickyNote = document.createElement("li");
        const url = document.createElement("a");
        url.href = "#";
        const title = document.createElement("h2");
        title.textContent = note.title;
        const text = document.createElement("p");
        text.textContent = note.text;

        url.appendChild(title);
        url.appendChild(text);
        stickyNote.appendChild(url);
        this.container.appendChild(stickyNote);
    }

    createProjectsMenu(projects) {
        const projectsMenu = document.getElementById("projects-list");
        projects.forEach(project => {
            const projectListItem = document.createElement('li');
            const projectAnchor = document.createElement('a');
            projectAnchor.textContent = project.name.toUpperCase();
            projectAnchor.href = "#";
            projectAnchor.id = project.name;

            projectListItem.appendChild(projectAnchor);
            projectsMenu.appendChild(projectListItem);
        })
    }

    createProjectsList(projects) {
        projects.forEach(project => {
            const option = document.createElement("option");
            option.value = project.name;
            option.textContent = project.name;
            this.container.appendChild(option);
        });
    }

    createTodo(todo) {
        const outerDiv = document.createElement("div");
        outerDiv.classList.add(`todo-${todo.priority}`);
        outerDiv.id = todo.id;

        const divBasicInfoOuter = document.createElement("div");
        divBasicInfoOuter.classList.add("basic-info-outer");

        const completeCheckbox = document.createElement("input");
        completeCheckbox.type = "checkbox";

        const divBasicInfoInner = document.createElement("div");
        divBasicInfoInner.classList.add("basic-info-inner");

        const todoTitle = document.createElement("h4");
        todoTitle.textContent = todo.title;
        todoTitle.contentEditable = true;
        todoTitle.addEventListener('input', () => {
            todo.changeTitle(todoTitle.textContent);
        })

        if (todo.complete === false) {
            completeCheckbox.checked = false;
        } else {
            completeCheckbox.checked = true;
            todoTitle.classList.toggle("strikethrough-text");
            divBasicInfoOuter.classList.toggle("checked");
        }
        completeCheckbox.addEventListener('change', () => {
            todo.changeStatus();
            todoTitle.classList.toggle("strikethrough-text");
            divBasicInfoOuter.classList.toggle("checked");
        })

        const todoDueDate = document.createElement("h4");
        const splittedDate = todo.dueDate.split("-");
        const formattedDate = format(new Date(splittedDate[0], splittedDate[1], splittedDate[2]), "EEEE, do MMMM yyyy")
        todoDueDate.textContent = `Due date: ${formattedDate}`;

        const divMoreInfo = document.createElement("div");
        divMoreInfo.classList.add("more-info");
        divMoreInfo.hidden = true;

        divBasicInfoInner.addEventListener("click", (e) => {
            e.preventDefault();
            divMoreInfo.hidden = divMoreInfo.hidden === false ? true : false;
        })

        const todoDesc = document.createElement("p");
        todoDesc.contentEditable = true;
        todoDesc.textContent = todo.description;
        todoDesc.addEventListener('input', () => {
            todo.changeDescription(todoDesc.textContent);
        })

        const calendar = document.createElement('input');
        calendar.type = 'date';
        calendar.value = todo.dueDate;
        calendar.addEventListener('change', () => {
            todo.changeDate(calendar.value);
        })

        const projectSelect = document.createElement('select');
        allProjects.getAllProjects().forEach((project) => {
            const option = document.createElement('option');
            option.value = project.name;
            option.textContent = project.name;

            option.addEventListener('click', () => {
                todo.changeProject(option.value);
            })
            
            projectSelect.appendChild(option);
        })

        const prioritySelect = document.createElement('select');
        const priorities = ['high', 'normal', 'low'];
        priorities.forEach(priority => {
            const priorityOption = document.createElement('option');
            priorityOption.value = priority;
            priorityOption.textContent = priority.toUpperCase();
            priorityOption.addEventListener('click', () => {
                todo.changePriority(priorityOption.value);
                console.log(todo)
            })
            prioritySelect.appendChild(priorityOption);
        })

        const delButton = document.createElement("button");
        delButton.textContent = "Remove Todo";
        delButton.addEventListener("click", (e) => {
            e.preventDefault();
            this.removeTodo(todo);
            allProjects.deleteTodoFromProject(todo);
            removeFromLocalStorage(todo);
        })
        
        divBasicInfoOuter.appendChild(completeCheckbox);

        divBasicInfoInner.appendChild(todoTitle);
        divBasicInfoInner.appendChild(todoDueDate);

        divBasicInfoOuter.appendChild(divBasicInfoInner);
        divMoreInfo.appendChild(todoDesc);
        divMoreInfo.appendChild(calendar);
        divMoreInfo.appendChild(projectSelect);
        divMoreInfo.appendChild(prioritySelect);
        divMoreInfo.appendChild(delButton);
        outerDiv.appendChild(divBasicInfoOuter);
        outerDiv.appendChild(divMoreInfo);

        this.container.appendChild(outerDiv);
    }

    removeTodo(todo) {
        const todoDiv = document.getElementById(todo.id);
        this.container.removeChild(todoDiv);
    }

    clearContainer() {
        this.container.innerHTML = "";
    }
}


export const TODO_LIST = document.querySelector(".todo-list");
export const TODO_RENDERER = new ElementRenderer(TODO_LIST);