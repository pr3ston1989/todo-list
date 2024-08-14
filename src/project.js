export class Project {
    constructor(name) {
        this.name = name;
        this.todos = [];
    }

    addTodo(todo) {
        this.todos.push(todo);
    }
}

export class AllProjects {
    allProjects = [];

    addProject(project) {
        this.allProjects.push(project);
    }

    getAllProjects() {
        return this.allProjects;
    }
}

export const allProjects = new AllProjects();

const defaultProject = new Project("Default");
allProjects.addProject(defaultProject);
