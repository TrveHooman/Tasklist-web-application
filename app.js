// *Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// *Load all event listeners
loadEventListeners();

function loadEventListeners() {
  // *DOM Load event
  document.addEventListener('DOMContentLoaded', getTasks);
  // *Add task event
  form.addEventListener('submit', addTask);
  // *Remove task event
  taskList.addEventListener('click', removeTask);
  // *Clear tasks event
  clearBtn.addEventListener('click', clearTasks);
  // *Filter tasks event
  filter.addEventListener('keyup', filterTasks);
}


// *Get tasks from LocalStorage
function getTasks() {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  } 

  tasks.forEach(function(task) {
  const li = document.createElement('li');
  li.className = 'collection-item';
  li.appendChild(document.createTextNode(task));

  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  link.innerHTML = '<i class="fa fa-remove"></i>';

  li.appendChild(link);
  taskList.appendChild(li);
  });
}


// *Add Task
function addTask(e) {
  if(taskInput.value === '') {
    alert('Add a task');
  }
  // *Create li element
  const li = document.createElement('li');
  li.className = 'collection-item';
  // *Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));

  // *Create new link element
  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  // *Add icon HTML
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // *Append link to li
  li.appendChild(link);

  // *Append li to ul
  taskList.appendChild(li);

  // *Store in Local Storage
  storeTaskInLocalStorage(taskInput.value);

  // *Clear Input
  taskInput.value = '';

  e.preventDefault();
}

// *Store Task
function storeTaskInLocalStorage(task) {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// *Remove Task
function removeTask(e) {
  if(e.target.parentElement.classList.contains('delete-item'))
    e.target.parentElement.parentElement.remove();

    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
}

// *Remove Task from Local Storage
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if(localStorage.getItem('tasks') === null)  tasks = [];
  tasks = JSON.parse(localStorage.getItem('tasks'));

  tasks.forEach((task, index) => {
    if(taskItem.textContent === task) tasks.splice(index, 1);
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// *Clear Tasks
function clearTasks(e) {
  // *simple way
  // taskList.innerHTML = '';
  // *Faster way
  while(taskList.firstChild)
    taskList.removeChild(taskList.firstChild);

  // *Clear from LS
  clearTasksFromLocalStorage();
}

// *Clear Tasks from Local Storage
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// *Filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(task => {
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}