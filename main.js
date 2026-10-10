const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

/*

*/

const tasks = [];

const todoList = $('#task-list');
const todoForm = $('#todo-form');

todoForm.onsubmit = function (e) {
    e.preventDefault();
    const todoInput = this.querySelector('#todo-input');
    const newTask = todoInput.value.trim();
    if (!newTask) {
        return alert('Please enter your task.');
    }
    // Add new task
    tasks.push({ title: newTask, completed: false });
    todoInput.value = '';
    renderTasks();
}

function renderTasks() {
    const html = tasks.map((task) => `
        <li class="task-item ${task.completed ? 'completed' : ''}">
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

renderTasks();
