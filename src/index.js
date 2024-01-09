import { addProjectsForm, addTasksForm, selectMenuOnChange, renderSelect } from "./domMethodsAndEventListeners";


document.addEventListener('DOMContentLoaded', renderSelect);

document.querySelector('.dropdown-select').addEventListener('change', selectMenuOnChange)

document.querySelector('#projects-form').addEventListener('submit', addProjectsForm);

document.querySelector('#tasks-form').addEventListener('submit', addTasksForm);




