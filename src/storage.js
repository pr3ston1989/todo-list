export function addToLocalStorage(data) {
  let todos = JSON.parse(localStorage.getItem('todos'));
  if (todos) {
    todos.push(data);
    localStorage.setItem('todos', JSON.stringify(todos));
  } else {
    todos = [];
    todos.push(data);
    localStorage.setItem('todos', JSON.stringify(todos));
  }
}

export function removeFromLocalStorage(data) {
  let todos = JSON.parse(localStorage.getItem('todos'));
  if (todos) {
    todos = todos.filter(todo => data.id !== todo.id);
    localStorage.setItem('todos', JSON.stringify(todos));
  }
}

export function updateInLocalStorage(data) {
  removeFromLocalStorage(data);
  addToLocalStorage(data);
}