
   
   export class TaskManager {
    constructor(tasks = [], currentId = 0){
        this.tasks = tasks;
        this.currentId = currentId;
    }


    addTask(taskName, description, assignedTo, taskRole, dueDate, notes, taskStatus="Todo"){
        this.currentId++;
         
        const newTask = {
            id: this.currentId,
            name: taskName,
            description: description,
            assignedTo: assignedTo,
            taskRole: taskRole,
            dueDate: dueDate,
            notes: notes,
            taskStatus: taskStatus 

        };

        this.tasks.push(newTask);
    }

}


