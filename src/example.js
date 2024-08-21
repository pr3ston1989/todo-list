import { Todo } from "./todo.js";
import { Project } from "./project.js";
import { format } from "date-fns";
import { addToStorage } from "./storage.js"
import { createProjectsMenu } from "./renderer.js";

export function populateWithExampleData() {
    const secondsInDay = 24 * 60 * 60 * 1000;

    const today = format(new Date(), 'yyyy-MM-dd');
    const tomorrow = format(new Date(new Date().getTime() + secondsInDay), 'yyyy-MM-dd');
    const afterTomorrow = format(new Date(new Date().getTime() + secondsInDay), 'yyyy-MM-dd');
    const weekLater = format(new Date(new Date().getTime() + 7 * secondsInDay), 'yyyy-MM-dd');
    const monthLater = format(new Date(new Date().getTime() + 30 * secondsInDay), 'yyyy-MM-dd');
    
    let storedProjects = JSON.parse(localStorage.getItem('projects'))
    
    if (storedProjects.length === 1) {
        const schoolProject = new Project('School');
        addToStorage(schoolProject, 'projects');
        const workProject = new Project('Work');
        addToStorage(workProject, 'projects');
        const houseProject = new Project('Chores');
        addToStorage(houseProject, 'projects');
        const hobbyProject = new Project('Hobby');
        addToStorage(hobbyProject, 'projects');
        const projectsMenu = document.querySelector('.project-item-container');
        projectsMenu.firstElementChild.remove();
        storedProjects.push(schoolProject);
        storedProjects.push(workProject);
        storedProjects.push(houseProject);
        storedProjects.push(hobbyProject);
        createProjectsMenu(storedProjects);
    }

    const feedCat = new Todo("Feed the cat", today, 'Chores', "Give Bruno and Loki wet food in the evening.", 'high');
    const mathExam = new Todo("Learn for exam", weekLater, 'School', "", 'high');
    const groceries = new Todo("Do the grocery shopping", tomorrow, 'Default', "Need to buy bread, milk, eggs.", 'normal');
    const interview = new Todo("Job interview", afterTomorrow, 'Work', "", 'high');
    const book = new Todo("Finish reading book", monthLater, 'Hobby', "", 'low', true);
    
}
