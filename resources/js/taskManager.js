
   
   export class TaskManager {
    constructor(tasks = [], currentId = 0){
        this.tasks = tasks;
        this.currentId = currentId;
    }

    addTask(taskName, description, assignedTo, dueDate, taskStatus="Todo"){
        this.currentId++;
         
        const newTask = {
            id: this.currentId,
            name: taskName,
            description: description,
            assignedTo: assignedTo,
            dueDate: dueDate,
            taskStatus: taskStatus 

        };

        this.tasks.push(newTask);
    }

}


