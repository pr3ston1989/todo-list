export class ElementRenderer {
    constructor(container) {
        this.container = container;
    }

    createNote(note) {
        const stickyNote = document.createElement("li");
        const url = document.createElement("a");
        url.href = "#";
        const title = document.createElement("h2");
        title.textContent = note.title;
        const text = document.createElement("p");
        text.textContent = note.text;

        url.appendChild(title);
        url.appendChild(text);
        stickyNote.appendChild(url);
        this.container.appendChild(stickyNote);
    }
}