export function addToLocalStorage(data) {
  let todos = JSON.parse(localStorage.getItem('todos')) || [];
  todos.push(data);
  localStorage.setItem('todos', JSON.stringify(todos));
}

export function removeFromLocalStorage(data) {
  let todos = JSON.parse(localStorage.getItem('todos')) || [];
  todos = todos.filter(todo => data.id !== todo.id);
  localStorage.setItem('todos', JSON.stringify(todos));
}

export function updateInLocalStorage(data) {
  removeFromLocalStorage(data);
  addToLocalStorage(data);
}

export function addNoteToStorage(data) {
  let notes = JSON.parse(localStorage.getItem('notes')) || [];
  notes.push(data);
  localStorage.setItem('notes', JSON.stringify(notes));
}

export function removeNoteFromStorage(data) {
  let notes = JSON.parse(localStorage.getItem('notes')) || [];
  notes = notes.filter(note => data.id !== note.id);
  localStorage.setItem('notes', JSON.stringify(notes));
}

export function updateNoteInStorage(data) {
  removeNoteFromStorage(data);
  addNoteToStorage(data);
}