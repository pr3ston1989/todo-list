import { projects } from "./index.js";
import { format } from "date-fns";
import { createDate } from "./main-app.js";
import { getFromStorage, removeFromStorage } from "./storage.js";
import removeIcon from "./svg/trash.svg"
import editIcon from "./svg/edit.svg"
import checkIcon from "./svg/check.svg"

export function setDefaultDate(inputSelector) {
    const todayDate = format(new Date(), "yyyy-LL-dd");
    const dateField = document.getElementById(inputSelector);
    dateField.value = todayDate;
}

function changeVisibility(element) {
    element.hidden = !element.hidden;
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

export function displayNote(note) {
    const container =  document.querySelector(".note-list");
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

    const noteText = document.createElement('p');
    noteText.innerHTML = note.text.replace(/\n/g, '<br>');

    const noteEdit = document.createElement('span');
    noteEdit.textContent = '🖉';
    noteEdit.classList.add('edit-note');
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
    container.appendChild(stickyNote);
}

export function createProjectsList(projects, element) {
    element.innerHTML = '';

    if (projects) {
        projects.forEach(project => {
            const option = document.createElement("option");
            option.value = project.id;
            option.textContent = project.id;
            element.appendChild(option);
        });
    }
}

export function createProjectsMenu(projects) {
    if (projects) {
        projects.forEach(project => {
            addProjectToMenu(project);
        })
    }
}

export function addProjectToMenu(project) {
    const projectsMenu = document.getElementById("add-new-project");
    
    const container = document.createElement('div');
    container.classList.add('project-item-container');
    
    const projectListItem = document.createElement('li');
    
    const projectAnchor = document.createElement('a');
    projectAnchor.textContent = project.id.toUpperCase();
    projectAnchor.href = "#";
    projectAnchor.id = project.id;

    const del = document.createElement('span');
    del.innerHTML = removeIcon;
    del.addEventListener('click', () => {
        removeFromStorage(project, 'projects');
        createProjectsList(getFromStorage('projects'),
            document.getElementById('projects')
        );
        container.remove();
        del.remove();
    })

    projectListItem.appendChild(projectAnchor);
    container.appendChild(projectListItem);

    if (project.id !== 'Default' && project.id !== '+ Add New') {
        container.appendChild(del);
    }

    projectsMenu.insertAdjacentElement('beforebegin', container);
}

export function displayTodo(todo) {
    const container =  document.querySelector(".todo-list");
    const outerDiv = document.createElement("div");
    outerDiv.classList.add(`todo-${todo.priority}`);
    outerDiv.id = todo.id;

    const divBasicInfoOuter = document.createElement("div");
    divBasicInfoOuter.classList.add("basic-info-outer");

    const completionState = document.createElement("input");
    completionState.type = "checkbox";

    const editBtn = document.createElement('span');
    editBtn.innerHTML = editIcon;

    const removeBtn = document.createElement('span');
    removeBtn.innerHTML = removeIcon;
    removeBtn.addEventListener("click", () => {
        removeTodo(todo);
        removeFromStorage(todo);
    })

    const divBasicInfoInner = document.createElement("div");
    divBasicInfoInner.classList.add("basic-info-inner");

    const todoTitle = document.createElement("h4");
    todoTitle.textContent = todo.title;

    if (todo.complete === false) {
        completionState.checked = false;
    } else {
        completionState.checked = true;
        todoTitle.classList.toggle("strikethrough-text");
        divBasicInfoOuter.classList.toggle("checked");
    }
    completionState.addEventListener('change', () => {
        todo.changeStatus();
        todoTitle.classList.toggle("strikethrough-text");
        divBasicInfoOuter.classList.toggle("checked");
    })

    const todoDueDate = document.createElement("h4");
    let date = createDate(todo.dueDate);
    let formattedDate = format(date, "EEEE, do MMMM yyyy")
    todoDueDate.textContent = `Due date: ${formattedDate}`;

    const divMoreInfo = document.createElement("div");
    divMoreInfo.classList.add("more-info");
    divMoreInfo.hidden = true;

    function divClick() {
        changeVisibility(divMoreInfo);
    }

    divBasicInfoInner.addEventListener("click", divClick)

    const todoDesc = document.createElement("p");
    todoDesc.textContent = todo.description;

    const todoProject = document.createElement('h4');
    todoProject.textContent = `Project: ${todo.project.id}`;       

    editBtn.addEventListener('click', () => {
        divMoreInfo.hidden = false;
        editBtn.hidden = true;
        divBasicInfoInner.removeEventListener("click", divClick)

        const titleInput = document.createElement('input');
        titleInput.value = todo.title;
        divBasicInfoInner.replaceChild(titleInput, todoTitle);

        const descriptionInput = document.createElement('textarea');
        descriptionInput.value = todo.description;
        divMoreInfo.replaceChild(descriptionInput, todoDesc);

        const prioritySelect = document.createElement('select');
        const priorities = ['high', 'normal', 'low'];
        priorities.forEach(priority => {
            const priorityOption = document.createElement('option');
            priorityOption.value = priority;
            priorityOption.textContent = priority.toUpperCase();        
            prioritySelect.appendChild(priorityOption);
        })
        divMoreInfo.appendChild(prioritySelect);

        const projectSelect = document.createElement('select');
        projects.forEach(project => {
            const projectOption = document.createElement('option');
            projectOption.value = project.id;
            projectOption.textContent = project.id.toUpperCase();
            projectSelect.appendChild(projectOption);
        })
        divMoreInfo.appendChild(projectSelect);

        const dateSelect = document.createElement('input');
        dateSelect.type = 'date';
        dateSelect.value = todo.dueDate;
        divMoreInfo.appendChild(dateSelect);


        const apply = document.createElement('span');
        apply.innerHTML = checkIcon;
        apply.addEventListener('click', () => {
            editBtn.hidden = false;
            divBasicInfoInner.addEventListener("click", divClick)
            todo.changeTitle(titleInput.value);
            todoTitle.textContent = todo.title;

            todo.changeDescription(descriptionInput.value);
            todoDesc.innerHTML = todo.description.replace(/\n/g, '<br>');

            todo.changePriority(
                prioritySelect.options[prioritySelect.selectedIndex].value
            )
            outerDiv.className = '';
            outerDiv.classList.add(`todo-${todo.priority}`);

            todo.changeProject(
                projectSelect.options[projectSelect.selectedIndex].value
            )
            todoProject.textContent = `Project: ${todo.project}`;

            todo.changeDate(dateSelect.value);
            const date = createDate(dateSelect.value);
            const formattedDate = format(date, "EEEE, do MMMM yyyy");
            todoDueDate.textContent = `Due date: ${formattedDate}`;

            divBasicInfoInner.replaceChild(todoTitle, titleInput);
            divMoreInfo.replaceChild(todoDesc, descriptionInput);

            prioritySelect.remove();
            projectSelect.remove();
            dateSelect.remove();
            apply.remove();
        })


        divMoreInfo.appendChild(apply);
    })

    divBasicInfoOuter.appendChild(completionState);

    divBasicInfoInner.appendChild(todoTitle);
    divBasicInfoInner.appendChild(todoDueDate);

    divBasicInfoOuter.appendChild(divBasicInfoInner);
    divBasicInfoOuter.appendChild(editBtn);
    divBasicInfoOuter.appendChild(removeBtn);
    divMoreInfo.appendChild(todoDesc);
    divMoreInfo.appendChild(todoProject);
    outerDiv.appendChild(divBasicInfoOuter);
    outerDiv.appendChild(divMoreInfo);

    container.appendChild(outerDiv);
}

export function removeTodo(todo) {
    const todoDiv = document.getElementById(todo.id);
    todoDiv.remove();
}

export function clearContainer(container) {
    container.innerHTML = "";
}