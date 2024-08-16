export class Note {

    constructor(title, text) {
        this.title = title;
        this.text = text;
        allNotesList.addNote(this);
    }

    getNotesList() {
        console.log(notesList);
        return notesList;
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