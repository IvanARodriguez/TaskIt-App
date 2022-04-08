   export class TaskManager {
    tasks;
    //currentId = 0;
    construtor(tasks=[]){
        this.tasks = tasks;
        this.currentId = 0;
        
    }

    // addTask(taskName, description, assignedTo, dueDate, taskStatus="Todo"){
    //     this.currentId++;
         
    //     const newTask = {
    //         id: this.currentId,
    //         name: taskName,
    //         description: description,
    //         assignedTo: assignedTo,
    //         dueDate: dueDate,
    //         taskStatus: taskStatus 

    //     };

    //     this.tasks.push(newTask);
    // }

}


//newTaskMan.addTask("feed your fish","dont over feed your fishes","Ivan",new Date().toDateString());
const newTaskMan= new TaskManager();
// console.log(newTaskMan());

console.log(TaskManager.tasks)