const taskInput = document.getElementById('taskInput');
const taskButton = document.getElementById('taskButton');
const taskList = document.getElementById('taskList');

taskButton.addEventListener('click', addTask);

let tasks = [];

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    const taskItem = createTaskItem(taskText);
    taskList.appendChild(taskItem);
    tasks.push(taskText);
    saveTask(tasks);
    taskInput.value = '';
  }
}

function createTaskItem(taskText) {
  const taskItem = document.createElement('li');
  taskItem.textContent = taskText;
  taskItem.addEventListener('click', completeTask);

  const removeButton = document.createElement('button');
  removeButton.textContent = '❌';
  removeButton.addEventListener('click', removeTask);

  taskItem.appendChild(removeButton);


  return taskItem;
}

function completeTask(event) {
  const taskItem = event.target.closest('li');
  taskItem.classList.toggle('completed');
}

function removeTask(event) {
  const taskItem = event.target.closest('li');
  taskItem.remove();
}

function saveTask(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
function loadTask() {
  const savedTasks = localStorage.getItem('tasks');
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
    tasks.forEach((task) => {
      const taskItem = createTaskItem(task);
      taskList.appendChild(taskItem);
    });
  }

}

window.addEventListener('load', loadTask);
