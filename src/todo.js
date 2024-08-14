export class ToDo {
    constructor(title, dueDate, project, description = "", priority = 1) {
        this.title = title;
        this.dueDate = dueDate;
        this.description = description;
        this.priority = priority;
        this.project = project;
        this.complete = false;
    }
}