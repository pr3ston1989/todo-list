import { format } from "date-fns";
import { removeFromLocalStorage } from "./storage.js";
import { removeProjectFromStorage } from "./storage.js";
import trashBin from "./trash.svg"
import { projects } from "./index.js";


export function setDefaultDate(inputSelector) {
    const todayDate = format(new Date(), "yyyy-LL-dd");
    const dateField = document.getElementById(inputSelector);
    dateField.value = todayDate;
}


export function openForm(buttonSelector, formSelector) {
    function open(e) {
        e.preventDefault();
        setDefaultDate("due-date");
        document.querySelector(formSelector).classList.add("active");
    }

    const btn = document.querySelector(buttonSelector);
    btn.addEventListener('click', open)

    document.querySelector(`${formSelector} .close-btn`).addEventListener("click", () => {
    document.querySelector(formSelector).classList.remove("active");
    })
}

export class ElementRenderer {
    constructor(container) {
        this.container = container;
    }

    createNote(note) {
        const stickyNote = document.createElement("div");
        stickyNote.classList.add('note-container');
        const noteTitle = document.createElement("h4");
        noteTitle.innerText = note.title;

        const noteRemove = document.createElement('span');
        noteRemove.textContent = '✖';
        noteRemove.classList.add('remove-note');
        noteRemove.addEventListener('click', () => {
            note.removeNote();
            stickyNote.remove();
        })
        const noteEdit = document.createElement('span');
        noteEdit.textContent = '🖉';
        noteEdit.classList.add('edit-note');
        const noteText = document.createElement('p');
        noteText.innerHTML = note.text.replace(/\n/g, '<br>');
        noteEdit.addEventListener('click', () => {
            noteEdit.remove();
            const titleInput = document.createElement('input');
            titleInput.value = note.title;
            stickyNote.replaceChild(titleInput, noteTitle);

            const textInput = document.createElement('textarea');
            textInput.value = note.text;
            stickyNote.replaceChild(textInput, noteText);  

            const apply = document.createElement('button');
            apply.textContent = 'Apply';
            apply.addEventListener('click', (e) => {
                e.preventDefault();
                stickyNote.appendChild(noteEdit);
                note.changeTitle(titleInput.value);
                note.changeText(textInput.value);

                noteTitle.textContent = note.title;
                noteText.innerHTML = note.text.replace(/\n/g, '<br>');

                stickyNote.replaceChild(noteTitle, titleInput);
                stickyNote.replaceChild(noteText, textInput);

                apply.remove();
            })
            stickyNote.appendChild(apply);
        })
        stickyNote.appendChild(noteTitle);
        stickyNote.appendChild(noteEdit);
        stickyNote.appendChild(noteRemove);
        stickyNote.appendChild(noteText);
        this.container.appendChild(stickyNote);
    }

    createProjectsMenu(projects) {
        projects.forEach(project => {
            this.addProjectToMenu(project);
        })
    }

    addProjectToMenu(project) {
        const projectsMenu = document.getElementById("add-new-project");
        const container = document.createElement('div');
        container.classList.add('project-item-container');
        const projectListItem = document.createElement('li');
        const projectAnchor = document.createElement('a');
        projectAnchor.textContent = project.name.toUpperCase();
        projectAnchor.href = "#";
        projectAnchor.id = project.name;

        const del = document.createElement('span');
        del.innerHTML = trashBin;
        del.addEventListener('click', () => {
            removeFromLocalStorage(project);
            projectListItem.remove();
            del.remove();
        })
        projectListItem.appendChild(projectAnchor);
        container.appendChild(projectListItem);
        if (project.name !== 'Default') {
            container.appendChild(del);
        }
        projectsMenu.insertAdjacentElement('beforebegin', container);
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
        let splittedDate = todo.dueDate.split("-");
        let formattedDate = format(new Date(splittedDate[0], splittedDate[1], splittedDate[2]), "EEEE, do MMMM yyyy")
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
            console.log(calendar.value)
            splittedDate = calendar.value.split("-");
            formattedDate = format(new Date(splittedDate[0], splittedDate[1], splittedDate[2]), "EEEE, do MMMM yyyy");
            todoDueDate.textContent = `Due date: ${formattedDate}`;
        })

        const projectSelect = document.createElement('select');
        projects.forEach((project) => {
            const option = document.createElement('option');
            option.value = project.name;
            if (option.value === todo.project) {
                option.selected = true;
            }
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
                outerDiv.classList = '';
                outerDiv.classList.add(`todo-${todo.priority}`);
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