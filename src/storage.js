export function addToStorage(data, item = 'todos') {
  let storedData = JSON.parse(localStorage.getItem(item)) || [];
  storedData.push(data);
  localStorage.setItem(item, JSON.stringify(storedData));
}

export function removeFromStorage(data, item = 'todos') {
  let storedData = JSON.parse(localStorage.getItem(item)) || [];
  console.log(storedData)
  storedData = storedData.filter(obj => data.id !== obj.id);
  console.log(storedData)
  localStorage.setItem(item, JSON.stringify(storedData));
}

export function updateInStorage(data, item = 'todos') {
  removeFromStorage(data, item);
  addToStorage(data, item);
}

export function getFromStorage(item = 'todos') {
  const storageItems = JSON.parse(localStorage.getItem(item));
  if (item === 'todos') {
    localStorage.removeItem(item);
  }
  return storageItems;
} 