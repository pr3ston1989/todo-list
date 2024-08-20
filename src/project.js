import { addToStorage } from "./storage.js";

export class Project {
    constructor(name) {
        this.id = name;
        addToStorage(this, 'projects');
    }
}