import { Project, Task } from "./classes";
import { getLocalStorage, setLocalStorage } from "./localStorageMethods";
import { isFuture } from "date-fns";


export const addProjectsForm = (e) => {
    e.preventDefault();
    const projectList = getLocalStorage();
    const projectName = document.querySelector('.project-name').value;
    const projectId = parseInt(document.querySelector('#project-id').value);
    const span = document.querySelector('#project-id-error');
    if (projectList.some((item) => item.id === projectId)) {
        span.textContent = `Project with Id: ${projectId} exists`;
    }
    else {
        span.textContent = '';
        const project = new Project(projectId, projectName);
        projectList.push(project);
        setLocalStorage(projectList);
        renderSelect();
    }
}

export const addTasksForm = (e) => {
    e.preventDefault();
    const projectList = getLocalStorage();
    const selectProjectId = parseInt(document.querySelector('.form-select').value);
    const project = projectList.find((item) => item.id === selectProjectId);

    const task = createTask(project);

    if (task !== null) {
        project.tasks.push(task);
        setLocalStorage(projectList);
    }
    else {
        console.log('Task was null');
    }
    renderTasks(project);
}

const createTask = (project) => {
    const taskId = parseInt(document.querySelector('#task-id').value);
    const taskTitle = document.querySelector('#task-title').value;
    const taskDueDate = document.querySelector('#due-date').value;
    const taskPriority = document.querySelector('#task-priority').value;

    if (checkIfTaskExists(project, taskId)) {
        console.log('Id matching tasks exists');
        return null;
    }

    if (!isFutureDate(taskDueDate)) {
        console.log('Date must be in the future');
        return null;
    }

    const task = new Task(taskId, taskTitle, taskDueDate, taskPriority);
    return task;
}

export const selectMenuOnChange = (e) => {
    e.preventDefault();
    const projectId = parseInt(e.target.value);
    const project = getProjectFromSelect(projectId);
    renderTasks(project);
}


const checkIfTaskExists = (proj, taskId) => {
    const taskIdError = document.querySelector('#task-id-error');
    if (proj.tasks.some((item) => item.id === taskId)) {
        taskIdError.textContent = `Task with Id: ${taskId} exists`;
        return true;
    }
    else {
        taskIdError.textContent = '';
        return false;
    }
}

const deleteTaskById = (projId, taskId) => {
    const projectList = getLocalStorage();
    const projIndex = projectList.findIndex((item) => item.id === projId);
    const taskIndex = projectList[projIndex].tasks.findIndex((task) => task.id === taskId);
    projectList[projIndex].tasks.splice(taskIndex, 1);
    setLocalStorage(projectList);
    renderTasks(projectList[projIndex]);
}

const getProjectFromSelect = (id) => {
    const projectList = getLocalStorage();
    const project = projectList.find((item) => item.id === id);
    return project;
}

const isFutureDate = (taskDueDate) => {
    const dateSpan = document.querySelector('#date-error');
    if (isFuture(taskDueDate)) {
        dateSpan.textContent = '';
        return true;
    }
    else {
        dateSpan.textContent = 'Date must be in the future';
        return false;
    }
}

export const renderSelect = () => {
    const projectList = getLocalStorage();
    const dropDownSelect = document.querySelector('.dropdown-select');
    while (dropDownSelect.lastChild) {
        dropDownSelect.removeChild(dropDownSelect.lastChild);
    }
    const dropDownDefault = document.createElement('option');
    dropDownDefault.selected = true;
    dropDownDefault.textContent = 'Select A Project';
    dropDownSelect.appendChild(dropDownDefault);

    projectList.forEach((item) => {
        const dropDownItem = document.createElement('option');
        dropDownItem.textContent = `${item.title}`;
        dropDownItem.value = `${item.id}`;
        dropDownSelect.appendChild(dropDownItem);
    });
}

const renderTasks = (project) => {
    const listGroup = document.querySelector('.list-group');
    while (listGroup.lastChild) {
        listGroup.removeChild(listGroup.lastChild);
    }
    project.tasks.forEach((task) => {
        const liElement = document.createElement('li');
        liElement.classList.add("list-group-item");
        liElement.classList.add("d-flex");
        liElement.classList.add("justify-content-between");
        liElement.classList.add("align-items-baseline");


        const headerId = document.createElement('h3');
        headerId.textContent = `Id: ${task.id}`;

        const headerTitle = document.createElement('h3');
        headerTitle.textContent = `Title: ${task.title}`;

        const pDueDate = document.createElement('p');
        pDueDate.textContent = `Due Date: ${task.dueDate}`;

        const pPriority = document.createElement('p');
        pPriority.textContent = `Priority: ${task.priority}`;

        const checkBox = document.createElement('input');
        checkBox.id = 'check-completed';
        checkBox.classList.add("check-completed");
        checkBox.type = 'checkbox';
        checkBox.onchange = () => {
            if (checkBox.checked) {
                headerId.classList.add("completed");
                headerTitle.classList.add("completed");
                pDueDate.classList.add("completed");
                pPriority.classList.add("completed");
            }
            else {
                headerId.classList.remove("completed");
                headerTitle.classList.remove("completed");
                pDueDate.classList.remove("completed");
                pPriority.classList.remove("completed");
            }
        }


        const divTrash = document.createElement('div');
        divTrash.id = task.id;
        divTrash.innerHTML = `<i class="fa-solid fa-trash"></i>`;
        divTrash.addEventListener('click', (e) => {
            const projId = parseInt(document.querySelector('.dropdown-select').value);
            const taskId = parseInt(divTrash.id);
            deleteTaskById(projId, taskId);
        });

        const divTrashCheckContainer = document.createElement('div');
        divTrashCheckContainer.classList.add("d-flex");
        divTrashCheckContainer.classList.add("delete-trash-container");
        divTrashCheckContainer.appendChild(checkBox);
        divTrashCheckContainer.appendChild(divTrash);

        liElement.appendChild(headerId);
        liElement.appendChild(headerTitle);
        liElement.appendChild(pDueDate);
        liElement.appendChild(pPriority);
        liElement.appendChild(divTrashCheckContainer);

        listGroup.appendChild(liElement);
    })
}
