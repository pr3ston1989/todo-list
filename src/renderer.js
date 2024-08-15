import { allProjects } from "./project.js";

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
        
        const anchor = document.createElement("a");
        anchor.href = "#";
        
        const divBasicInfo = document.createElement("div");
        divBasicInfo.classList.add("basic-info");

        const todoTitle = document.createElement("div");
        todoTitle.textContent = todo.title;

        const todoDueDate = document.createElement("div");
        todoDueDate.textContent = todo.DueDate;

        const divMoreInfo = document.createElement("div");
        divMoreInfo.classList.add("more-info");
        divMoreInfo.hidden = true;

        anchor.addEventListener("click", (e) => {
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
        })

        divBasicInfo.appendChild(todoTitle);
        divBasicInfo.appendChild(todoDueDate);
        anchor.appendChild(divBasicInfo);
        outerDiv.appendChild(anchor);
        divMoreInfo.appendChild(todoDesc);
        divMoreInfo.appendChild(delButton);
        outerDiv.appendChild(divMoreInfo);

        this.container.appendChild(outerDiv);
    }

    removeTodo(todo) {
        const todoDiv = document.getElementById(todo.id);
        this.container.removeChild(todoDiv);
    }
}