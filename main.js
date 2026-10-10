const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

/*
<li class="task-item completed">
    <span class="task-title">Task Title</span>
    <div class="task-action">
        <button class="task-btn edit">Edit</button>
        <button class="task-btn done">Done/Undone</button>
        <button class="task-btn delete">Delete</button>
    </div>
</li>
*/

const tasks = [
    {
        title: 'Quet nha',
        completed: false,
    },
    {
        title: 'Rua chen',
        completed: true,
    },
    {
        title: 'Nau com',
        completed: false,
    },
];

const todoList = $('#task-list');

function renderTasks() {
    tasks.forEach((task) => {
        const taskItem = document.createElement('li');
        taskItem.className = task.completed ? 'task-item completed' : 'task-item';
        const taskTitle = document.createElement('span');
        taskTitle.textContent = task.title;
        taskTitle.classList.add('task-title');
        const taskActions = document.createElement('div');
        taskActions.classList.add('task-action');
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.className = 'task-btn edit';
        const doneBtn = document.createElement('button');
        doneBtn.textContent = task.completed ? 'Mark as undone' : 'Mark as done';
        doneBtn.className = 'task-btn done';
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'task-btn delete';

        // Append element
        taskActions.append(editBtn, doneBtn, deleteBtn);
        taskItem.append(taskTitle, taskActions);
        todoList.append(taskItem);
    });
}

renderTasks();
