

export function addToLocalStorage(data) {
  let todos = JSON.parse(localStorage.getItem('todos')) || [];
  todos.push(this);
  localStorage.setItem('todos', JSON.stringify(todos));
}

export function removeFromLocalStorage(data) {
  let todos = JSON.parse(localStorage.getItem('todos')) || [];
  todos = todos.filter(todo => data.id !== todo.id);
  localStorage.setItem('todos', JSON.stringify(todos));
}