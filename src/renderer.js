import { allProjects } from "./project.js";
import { format, compareAsc } from "date-fns";
import { removeFromLocalStorage } from "./storage.js";


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

    createProjectsList(projects) {
        projects.forEach(project => {
            const option = document.createElement("option");
            option.value = project.name;
            option.textContent = project.name;
            this.container.appendChild(option);
        });
        const addNewOption = document.createElement("option");
        addNewOption.value = "add-new";
        addNewOption.textContent = "Add new...";
        this.container.appendChild(addNewOption);
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
        todoDesc.textContent = todo.description;

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
        divMoreInfo.appendChild(delButton);
        outerDiv.appendChild(divBasicInfoOuter);
        outerDiv.appendChild(divMoreInfo);

        this.container.appendChild(outerDiv);
    }

    todayTodos() {

    }

    removeTodo(todo) {
        const todoDiv = document.getElementById(todo.id);
        this.container.removeChild(todoDiv);
    }

    clearContainer() {
        this.container.innerHTML = "";
    }
}