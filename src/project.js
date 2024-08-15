export class Project {
    constructor(name) {
        this.name = name;
        this.todos = [];
        allProjects.addProject(this);
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

    deleteTodoFromProject(todo) {
        allProjects.getAllProjects().forEach(project => {
            project.todos = project.todos.filter(projectTodo => projectTodo.id !== todo.id);            
        });
    }
}

export const allProjects = new AllProjects();