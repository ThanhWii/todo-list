const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const tasks = [
    {
        title: 'Hoc bai',
        completed: false,
    }
];

const todoList = $('#task-list');
const todoForm = $('#todo-form');

todoForm.onsubmit = function (e) {
    e.preventDefault();
    const todoInput = this.querySelector('#todo-input');
    const newTask = todoInput.value.trim();
    // Add new task
    addTask(newTask);
    todoInput.value = '';
    renderTasks();
}

function addTask(taskTitle) {
    if (!taskTitle) {
        return alert('Please enter your task.');
    }
    tasks.push({ title: taskTitle, completed: false });
}

function renderTasks() {
    const html = tasks.map((task, index) => `
        <li class="task-item ${task.completed ? 'completed' : ''}" data-index="${index}">
            <span class="task-title">${task.title}</span>
            <div class="task-action">
                <button class="task-btn edit">Edit</button>
                <button class="task-btn done">${task.completed ? 'Mark as undone' : 'Mark as done'}</button>
                <button class="task-btn delete">Delete</button>
            </div>
        </li>
    `).join('');
    todoList.innerHTML = html;
}

todoList.onclick = handleClickButtons;

function handleClickButtons(e) {
    const taskItem = e.target.closest('.task-item');
    const taskIndex = parseInt(taskItem.dataset.index);
    if (e.target.classList.contains('edit')) {
        const newTask = prompt('Edit your task title', tasks[taskIndex].title);
        if (newTask === null) return;
        else if (!newTask.trim()) {
            return alert('Please enter your task.');
        }
        tasks[taskIndex].title = newTask;
        renderTasks();
    }
    else if (e.target.classList.contains('done')) {
        tasks[taskIndex].completed = !tasks[taskIndex].completed;
        renderTasks();
    }
    else if (e.target.classList.contains('delete')) {
        console.log('Click delete');

    }
}

renderTasks();
