document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const pendingTasks = document.getElementById('pendingTasks');
    const completedTasks = document.getElementById('completedTasks');

    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            addTask(taskText);
            taskInput.value = '';
        }
    });

    function addTask(taskText, isCompleted = false) {
        const taskItem = document.createElement('li');

        const taskTextNode = document.createElement('span');
        taskTextNode.className = 'task-text';
        taskTextNode.textContent = taskText;

        const taskButtons = document.createElement('div');
        taskButtons.className = 'task-buttons';

        const editButton = document.createElement('button');
        editButton.className = 'edit-button';
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => editTask(taskItem, taskTextNode));

        const completeButton = document.createElement('button');
        completeButton.className = 'complete-button';
        completeButton.textContent = isCompleted ? 'Uncomplete' : 'Complete';
        completeButton.addEventListener('click', () => toggleCompleteTask(taskItem, taskTextNode));

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-button';
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteTask(taskItem));

        taskButtons.appendChild(editButton);
        taskButtons.appendChild(completeButton);
        taskButtons.appendChild(deleteButton);

        taskItem.appendChild(taskTextNode);
        taskItem.appendChild(taskButtons);

        if (isCompleted) {
            completedTasks.appendChild(taskItem);
        } else {
            pendingTasks.appendChild(taskItem);
        }
    }

    function editTask(taskItem, taskTextNode) {
        const newTaskText = prompt('Edit your task:', taskTextNode.textContent);
        if (newTaskText !== null) {
            taskTextNode.textContent = newTaskText.trim();
        }
    }

    function toggleCompleteTask(taskItem, taskTextNode) {
        if (taskItem.parentNode.id === 'pendingTasks') {
            completedTasks.appendChild(taskItem);
            taskItem.querySelector('.complete-button').textContent = 'Uncomplete';
        } else {
            pendingTasks.appendChild(taskItem);
            taskItem.querySelector('.complete-button').textContent = 'Complete';
        }
    }

    function deleteTask(taskItem) {
        taskItem.parentNode.removeChild(taskItem);
    }
});
