import { ElementRenderer } from "./renderer.js";
import { createUniqueId } from "./main-app.js";
import { addToStorage, removeFromStorage, updateInStorage } from "./storage.js";

const TODO_LIST = document.querySelector(".todo-list");
const TODO_RENDERER = new ElementRenderer(TODO_LIST);


export class Note {

    constructor(title, text) {
        this.id = this.createUniqueId();
        this.title = title;
        this.text = text;
        addToStorage(this, 'notes');
        this.displayNote();
    }

    getNotesList() {
        console.log(notesList);
        return notesList;
    }

    displayNote() {
        TODO_RENDERER.createNote(this);
    }

    changeTitle(title) {
        this.title = title;
        updateInStorage(this, 'notes');
    }

    changeText(text) {
        this.text = text;
        updateInStorage(this, 'notes');
    }
    removeNote() {
        removeFromStorage(this, 'notes');
    }
}

Object.assign(Note.prototype, {createUniqueId});