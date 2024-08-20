import { displayNote } from "./renderer.js";
import { createUniqueId } from "./main-app.js";
import { addToStorage, removeFromStorage, updateInStorage } from "./storage.js";


export class Note {

    constructor(title, text) {
        this.id = this.createUniqueId();
        this.title = title;
        this.text = text;
        addToStorage(this, 'notes');
        displayNote(this);
    }

    getNotesList() {
        console.log(notesList);
        return notesList;
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