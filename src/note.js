import { ElementRenderer } from "./renderer.js";
import { addToLocalStorage, updateInLocalStorage } from "./storage.js";
import { allTodosList } from "./index.js";
import { createUniqueId } from "./todo.js";
import { addNoteToStorage, removeNoteFromStorage, updateNoteInStorage } from "./storage.js";

const TODO_LIST = document.querySelector(".todo-list");
const TODO_RENDERER = new ElementRenderer(TODO_LIST);


export class Note {

    constructor(title, text) {
        this.id = this.createUniqueId();
        this.title = title;
        this.text = text;
        addNoteToStorage(this);
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
        updateNoteInStorage(this);
    }

    changeText(text) {
        this.text = text;
        updateNoteInStorage(this);
    }
    removeNote() {
        removeNoteFromStorage(this);
    }
}

Object.assign(Note.prototype, {createUniqueId});