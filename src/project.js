import { addProjectToStorage } from "./storage.js";

export class Project {
    constructor(name) {
        this.name = name;
        addProjectToStorage(this);
    }
}