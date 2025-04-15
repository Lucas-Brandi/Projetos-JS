
const addTaskBtn = document.getElementById('addTaskBtn');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const taskCount = document.getElementById('taskCount');

function updateTaskCount() {
    const taskItems = document.querySelectorAll('.task-item');
    taskCount.textContent = `Total de Tarefas: ${taskItems.length}`;
}

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') {
        alert('Por favor, insira uma descrição para a tarefa!');
        return;
    }


    const taskItem = document.createElement('div');
    taskItem.classList.add('task-item');
    taskItem.textContent = taskText;


    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'X';
    removeBtn.classList.add('remove-btn');
    removeBtn.onclick = () => {
        taskList.removeChild(taskItem);
        updateTaskCount();
    };

    taskItem.appendChild(removeBtn);

    taskList.appendChild(taskItem);


    taskInput.value = '';
    updateTaskCount();
}


addTaskBtn.addEventListener('click', addTask);
