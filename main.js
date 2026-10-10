const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

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

function checkTaskDuplicate(taskTitle, taskIndex) {
    return tasks.some((task, index) => task.title.toUpperCase() === taskTitle.toUpperCase() && index !== taskIndex)
}

function addTask(taskTitle) {
    if (!taskTitle) {
        return alert('Please enter your task.');
    }
    else if (checkTaskDuplicate(taskTitle)) {
        return alert('Your task is already on the list.');
    }
    tasks.push({ title: taskTitle, completed: false });
}

function renderTasks() {
    if (tasks.length) {
        const html = tasks.map((task, index) => `
            <li class="task-item ${task.completed ? 'completed' : ''}" data-index="${index}">
                <span class="task-title">${escapeHTML(task.title)}</span>
                <div class="task-action">
                    <button class="task-btn edit">Edit</button>
                    <button class="task-btn done">${task.completed ? 'Mark as undone' : 'Mark as done'}</button>
                    <button class="task-btn delete">Delete</button>
                </div>
            </li>
        `).join('');
        todoList.innerHTML = html;
    }
    else {
        const emptyMessage = '<li class="empty-message">Your task list is empty. Add new task now!</li>';
        todoList.innerHTML = emptyMessage;
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

todoList.onclick = handleClickButtons;

function handleClickButtons(e) {
    const taskItem = e.target.closest('.task-item');
    if (!taskItem) return;
    const taskIndex = parseInt(taskItem.dataset.index);
    if (e.target.classList.contains('edit')) {
        const newTask = prompt('Edit your task title', tasks[taskIndex].title);
        if (newTask === null) return;
        else if (!newTask.trim()) {
            return alert('Please enter your task.');
        }
        else if (checkTaskDuplicate(newTask, taskIndex)) {
            return alert('Your task is already on the list.');
        }
        tasks[taskIndex].title = newTask.trim();
        renderTasks();
    }
    else if (e.target.classList.contains('done')) {
        tasks[taskIndex].completed = !tasks[taskIndex].completed;
        renderTasks();
    }
    else if (e.target.classList.contains('delete')) {
        const result = confirm(`Are you sure you want to delete ${tasks[taskIndex].title}?`);
        if (result) {
            tasks.splice(taskIndex, 1);
            renderTasks();
        }
    }
}

function escapeHTML(html) {
    const div = document.createElement('div');
    div.innerText = html;
    return div.innerHTML;
}

renderTasks();
