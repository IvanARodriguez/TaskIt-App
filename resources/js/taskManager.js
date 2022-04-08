   export class TaskManager {
    constructor(tasks=[], currentId = 0){
        this.tasks = tasks;
        this.currentId = 0;
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


const newTaskMan= new TaskManager();

newTaskMan.addTask("feed your fish","dont over feed your fishes","Ivan",new Date().toDateString());

console.log(newTaskMan.tasks)