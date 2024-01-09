import { addDays, formatDistance, isWithinInterval } from "date-fns";


export class Project {
    constructor(id, title) {
        this.id = id;
        this.title = title;
        this.tasks = [];
    }
}

export class Task {
    constructor(id, title, dueDate, priority) {
        this.id = id;
        this.title = title;
        this.dueDate = dueDate;
        this.priority = priority
    }

    
}