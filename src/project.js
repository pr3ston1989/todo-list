export class Project {
    constructor(name) {
        this.id = name;
    }
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