import { format } from "date-fns";
import { createDate } from "./helper-functions.js";
import { getFromStorage, removeFromStorage,
         addToStorage, getProjects } from "./storage.js";
import { Project } from "./project.js"
import { ALL_TODOS } from "./todo.js";
import editIcon from "../svg/edit.svg"
import delIcon from "../svg/trash.svg"
import checkIcon from "../svg/check.svg"
import projectIcon from "../svg/project.svg"


export function setDefaultDate(inputSelector) {
    const todayDate = format(new Date(), "yyyy-LL-dd");
    const dateField = document.getElementById(inputSelector);
    dateField.value = todayDate;
}

function changeVisibility(element) {
    element.style.display = element.style.display === 'none' ? 'grid' : 'none';
}


export function openForm(buttonSelector, formSelector) {
    
    function open(e) {
        e.preventDefault();
        createProjectsList(
            getProjects(),
            document.getElementById('projects')
        );
        setDefaultDate("due-date");
        document.querySelector(formSelector).classList.add("active");
    }

    const btn = document.querySelector(buttonSelector);
    btn.addEventListener('click', open)

    document.querySelector(`${formSelector} .close-btn`).addEventListener("click", () => {
    document.querySelector(formSelector).classList.remove("active");
    })
}

function noteRemoveButton(note, stickyNote) {
    const remove = document.createElement('span');
    remove.textContent = '✖';
    remove.classList.add('remove-note');
    remove.addEventListener('click', () => {
        note.removeNote();
        stickyNote.remove();
    })

    return remove;
}

function noteEditButton(stickyNote, noteTitle, noteText, note) {
    const edit = document.createElement('span');
    edit.textContent = '🖉';
    edit.classList.add('edit-note');
    edit.addEventListener('click', () => {
        edit.remove();
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
            stickyNote.appendChild(edit);
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
    return edit
}

export function displayNote(note) {
    const container =  document.querySelector(".note-list");

    const stickyNote = document.createElement("div");
    stickyNote.classList.add('note-container');

    const noteTitle = document.createElement("h4");
    noteTitle.innerText = note.title;

    const noteRemove = noteRemoveButton(note, stickyNote);

    const noteText = document.createElement('p');
    noteText.innerHTML = note.text.replace(/\n/g, '<br>');

    const noteEdit = noteEditButton(stickyNote, noteTitle, noteText, note);
    
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

function deleteProjectButton(project, container) {
    const del = document.createElement('span');
    del.innerHTML = delIcon;
    del.addEventListener('click', (e) => {
        e.preventDefault();
        removeFromStorage(project, 'projects');
        createProjectsList(getFromStorage('projects'),
            document.getElementById('projects')
        );
        ALL_TODOS.list.forEach(todo => {
            if (todo.project === project.id) {
                todo.changeProject('Default');
            }
        })
        container.remove();
        del.remove();
    })
    return del;
}

export function addProjectToMenu(project) {
    const projectsMenu = document.getElementById("add-new-project");
    
    const container = document.createElement('div');
    container.classList.add('project-item-container');
    
    const projectListItem = document.createElement('li');
    const projectSvgIcon = document.createElement('span');
    projectSvgIcon.innerHTML = projectIcon;
    projectListItem.appendChild(projectSvgIcon);
    
    const projectAnchor = document.createElement('a');
    projectAnchor.textContent = project.id.toUpperCase();
    projectAnchor.id = project.id;

    const del = deleteProjectButton(project, container);

    projectListItem.appendChild(projectAnchor);
    container.appendChild(projectListItem);
    if (project.id !== 'Default' && project.id !== '+ Add New') {
        container.appendChild(del);
    }
    projectsMenu.insertAdjacentElement('beforebegin', container);
}

function removeTodoButton(todo) {
    const remove = document.createElement('span');
    remove.innerHTML = delIcon;
    remove.addEventListener("click", () => {
        removeTodo(todo);
        ALL_TODOS.removeTodo(todo);
        removeFromStorage(todo);
    })
    return remove;
}

function todoCompletionState(todo, todoTitle, divBasicInfoOuter) {
    const completionState = document.createElement("input");
    completionState.type = "checkbox";
    completionState.checked = todo.complete;
    if (todo.complete === true) {
        todoTitle.classList.toggle("strikethrough-text");
        divBasicInfoOuter.classList.toggle("checked");
    }
    completionState.addEventListener('change', () => {
        todo.changeStatus();
        todoTitle.classList.toggle("strikethrough-text");
        divBasicInfoOuter.classList.toggle("checked");
    })
    return completionState;
}

export function displayTodo(todo) {
    const container =  document.querySelector(".todo-list");
    const outerDiv = document.createElement("div");
    outerDiv.classList.add(`todo-${todo.priority}`);
    outerDiv.id = todo.id;

    const divBasicInfoOuter = document.createElement("div");
    divBasicInfoOuter.classList.add("basic-info-outer");

    const editBtn = document.createElement('span');
    editBtn.innerHTML = editIcon;

    const removeBtn = removeTodoButton(todo);

    const divBasicInfoInner = document.createElement("div");
    divBasicInfoInner.classList.add("basic-info-inner");

    const todoTitle = document.createElement("h4");
    todoTitle.textContent = todo.title;

    const completionState = todoCompletionState(todo, todoTitle, divBasicInfoOuter);

    const todoDueDate = document.createElement("h4");
    const date = createDate(todo.dueDate);
    const formattedDate = format(date, "EEEE, do MMMM yyyy")
    todoDueDate.textContent = `Due date: ${formattedDate}`;

    const divMoreInfo = document.createElement("div");
    divMoreInfo.classList.add("more-info");
    divMoreInfo.style.display = 'none';

    function divClick() {
        changeVisibility(divMoreInfo);
    }

    divBasicInfoInner.addEventListener("click", divClick)

    const todoDesc = document.createElement("p");
    todoDesc.textContent = todo.description;

    const todoProject = document.createElement('h4');
    todoProject.textContent = `Project: ${todo.project}`;       

    editBtn.addEventListener('click', () => {
        divMoreInfo.style.display = 'grid';
        editBtn.hidden = true;
        divBasicInfoInner.removeEventListener("click", divClick)

        const titleInput = document.createElement('input');
        titleInput.value = todo.title;
        divBasicInfoInner.replaceChild(titleInput, todoTitle);

        const descriptionInput = document.createElement('textarea');
        descriptionInput.cols = "40";
        descriptionInput.rows = "3";
        descriptionInput.value = todo.description;
        divMoreInfo.replaceChild(descriptionInput, todoDesc);

        const priorityLabel = document.createElement('label');
        priorityLabel.textContent = 'Priority: '
        const prioritySelect = document.createElement('select');
        const priorities = ['high', 'normal', 'low'];
        priorities.forEach(priority => {
            const priorityOption = document.createElement('option');
            priorityOption.value = priority;
            priorityOption.textContent = priority.toUpperCase();
            if (priority === todo.priority) {
                priorityOption.selected = true;
            }        
            prioritySelect.appendChild(priorityOption);
        })
        priorityLabel.appendChild(prioritySelect);
        divMoreInfo.appendChild(priorityLabel);

        const projectLabel = document.createElement('label');
        projectLabel.textContent = "Project: ";
        const projectSelect = document.createElement('select');
        const storageItems = JSON.parse(localStorage.getItem('projects'));
        storageItems.forEach(project => {
            const projectOption = document.createElement('option');
            projectOption.value = project.id;
            projectOption.textContent = project.id.toUpperCase();
            if (project.id.toUpperCase() === todo.project.toUpperCase()) {
                projectOption.selected = true;
            }
            projectSelect.appendChild(projectOption);
        })

        projectLabel.appendChild(projectSelect);
        divMoreInfo.replaceChild(projectLabel, todoProject);

        const dateLabel = document.createElement('label');
        dateLabel.textContent = 'Due date: ';
        const dateSelect = document.createElement('input');
        dateSelect.type = 'date';
        dateSelect.value = todo.dueDate;
        dateLabel.appendChild(dateSelect);
        divMoreInfo.appendChild(dateLabel);


        const apply = document.createElement('span');
        apply.innerHTML = checkIcon;
        apply.classList.add('apply-button');
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
            const newDate = createDate(dateSelect.value);
            const formattedDate = format(newDate, "EEEE, do MMMM yyyy");
            todoDueDate.textContent = `Due date: ${formattedDate}`;

            divBasicInfoInner.replaceChild(todoTitle, titleInput);
            divMoreInfo.replaceChild(todoDesc, descriptionInput);
            divMoreInfo.replaceChild(todoProject, projectLabel);
            priorityLabel.remove();
            dateLabel.remove();
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

export function addNewProject() {
    const projectName = document.getElementById('new-project-name');
    const projectButton = document.getElementById('new-project-button');
    const addNewProjectButton = document.getElementById('add-new-project');
    addNewProjectButton.addEventListener('click', () => {
        projectName.hidden = false;
        projectButton.hidden = false;
        projectButton.addEventListener('click', (e) => {
            e.preventDefault();
            const storedProjects = JSON.parse(localStorage.getItem('projects'))        
            const duplicate = storedProjects.some(project => project.id === projectName.value)
            if (duplicate) {
                alert('project with that name already exists');
            } else {
                const newProject = new Project(projectName.value);
                addToStorage(newProject, 'projects')
                addProjectToMenu(newProject);
            }
            projectName.value = '';
            projectName.hidden = true;
            projectButton.hidden = true;
        })
    })
}