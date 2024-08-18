import { ElementRenderer } from "./renderer.js";
import { addToLocalStorage, updateInLocalStorage } from "./storage.js";
import { allTodosList } from "./index.js";

const TODO_LIST = document.querySelector(".todo-list");
const TODO_RENDERER = new ElementRenderer(TODO_LIST);


export class Note {

    constructor(title, text) {
        this.title = title;
        this.text = text;
        allNotesList.addNote(this);
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
    }

    changeText(text) {
        this.text = text;
    }
}

export class AllNotes {
    constructor() {
        this.notes = [];
    }

    addNote(note) {
        this.notes.push(note);
    }

    getNotees() {
        return this.notes;
    }

}

export const allNotesList = new AllNotes();