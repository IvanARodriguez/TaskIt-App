 //create HTML task template
const createTaskHtml = (id, name, assignedTo, role, description, notes, dueDate, status) => `
      <li data-task-id="${id}"class="row border-bottom pb-2 border-secondary mb-3 align-items-center close" >
        <span class="col-2 d-block pb-3">${(id < 10) ? "0" + id  : id}</span> 
        <h4 class="col-8 fw-lighter">${name}</h4>
        <a type="button" class="text-white col-2 details_viewer" ><i class="bi bi-eye-fill"></i></a>
        <div class="bg-dark p-3 rounded mb-4 details border-left-orange">
          <div class="d-flex justify-content-between mb-3">
             <span class="fw-lighter text-end d-block">${status}</span>
             <span class="fw-lighter text-end d-block">${dueDate}</span>
          </div>
          <h6 class="fw-light"> For:<span class=" fw-bolder "> ${assignedTo} </span> | <span class="text-secondary fw-light"> ${role} </span></h6>
          <p class="fw-lighter">${description}</p>
          <p>Notes: <span class="fw-lighter">${notes === undefined ? "" : notes}</span></p>
          <a class="text-primary done_btn" type="button">Mark as Done</a>
        </div>
      </li> 
`;

//Hide or show task details
const showDetails = ()=>{
    function toggleDetails(){
        const itemClass = this.parentNode.classList;
        const showBtn = this.children[0];
        if(itemClass.contains('close')){
            itemClass.remove('close');
            itemClass.add('open')
            //change view button to close view button
            showBtn.classList.remove('bi-eye-fill')
            showBtn.classList.add('bi-eye-slash-fill');
        } else {
            itemClass.add('close');
            itemClass.remove('open');
            showBtn.classList.add('bi-eye-fill')
            showBtn.classList.remove('bi-eye-slash-fill');
        }
    };

    //select all tasks
    let detailViewerBtn = document.querySelectorAll(".details_viewer");

    detailViewerBtn.forEach(element => {
        element.onclick = toggleDetails;
    })
}

 export class TaskManager {
    constructor(tasks = [], currentId = 0){
        this.tasks = tasks;
        this.currentId = currentId;
    }
    addTask(taskName, description, assignedTo, taskRole, dueDate, notes, taskStatus="TODO"){
        this.currentId++;
        //Create a new object and push it to the tasks array
        const newTask = {
            id: this.currentId,
            name: taskName,
            assignedTo: assignedTo,
            taskRole: taskRole,
            description: description,
            dueDate: dueDate,
            notes: notes,
            taskStatus: taskStatus 

        };
        this.tasks.push(newTask);
    }

    getTaskById(taskId) {
        // Create a variable to store the found task
        let foundTask;

        // Loop over the tasks and find the task with the id passed as a parameter
        for (let i = 0; i < this.tasks.length; i++) {
            // Get the current task in the loop
            const task = this.tasks[i];

            // Check if its the right task by comparing the task's id to the id passed as a parameter
            if (task.id === taskId) {
                // Store the task in the foundTask variable
                foundTask = task;
            }
        }
        // Return the found task
        return foundTask;
    }

    render() {
        const tasksHtmlList = [];

        for (let i = 0; i < this.tasks.length; i++) {
            const task = this.tasks[i];
            const date = new Date(task.dueDate);
            const formattedDate = (date.getDate() +1) + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

            // Pass the task id as a parameter
            const taskHtml = createTaskHtml(task.id, task.name, task.assignedTo, task.taskRole, task.description, task.notes, formattedDate, task.taskStatus);

            tasksHtmlList.push(taskHtml);
        }

        const tasksHtml = tasksHtmlList.join('\n');

        const tasksList = document.querySelector('#tasks_group');

        tasksList.innerHTML = tasksHtml;

        showDetails();

        //display the total of tasks
        const taskCounter = document.getElementById("task_counter");
        taskCounter.innerHTML = this.tasks.length;
        
    }
}