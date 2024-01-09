export const getLocalStorage = () => {
    if(JSON.parse(localStorage.getItem('project-list')) === null) {
        return [];
    }
    else {
        return JSON.parse(localStorage.getItem('project-list'));
    }
}

export const setLocalStorage = (projectList) => {
    localStorage.setItem('project-list', JSON.stringify(projectList));
}

