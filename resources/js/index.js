import { TaskManager } from "./taskManager.js";
//form elements
const form = document.getElementById("form_section")
const dueDate = document.getElementById("cal_datepicker");
const assignTo = document.getElementById("AssignTo");
const taskRole = document.getElementById("TaskRole");
const taskName = document.getElementById("TaskName");
const description = document.getElementById("Description");
const notes = document.getElementById("Notes");
const status = document.getElementsByName("inlineRadioOptions");
const selectedStatus = () =>{
//get the checked status
  for (let i = 0; i < status.length; i++) {
    
    if (status[i].checked) {
      return status[i].value;
    }
    
  }
}
const newTaskManager = new TaskManager();
newTaskManager.addTask("feed the fish", "feed fish at 3pm","me","");
newTaskManager.addTask("feed the fish", "feed fish at 3pm","me","");
newTaskManager.addTask("feed the fish", "feed fish at 3pm","me","");
newTaskManager.addTask("feed the fish", "feed fish at 3pm","me","");
newTaskManager.addTask("feed the fish", "feed fish at 3pm","me","");
newTaskManager.addTask("feed the fish", "feed fish at 3pm","me","");
//tasks template

const ul = document.getElementById("tasks_group");
const taskCounter = document.getElementById("task_counter");

//create HTML task template
const createTaskTemplate = (task) => {
  
  const htmlLi = `
  <li class="row border-bottom pb-2 border-secondary mb-3" >
  <span class="col-2">${task.id}</span> <span class="col-8">${task.name}</span><i class="bi bi-eye-fill col-2"></i>
  </li>  `;
  ul.insertAdjacentHTML("beforeend", htmlLi);
  
  taskCounter.innerHTML = newTaskManager.tasks.length;
}

newTaskManager.tasks.forEach(task => {
  createTaskTemplate(task);
} );


//getting the form inputs
const addNewTask=(event)=>{
  event.preventDefault()
  //validate before submitting
  if(taskName.value !== "" && taskRole.value !== "" && description.value !== "" && assignTo.value !== "" ){
   newTaskManager.addTask( taskName.value, description.value, assignTo.value, dueDate.value, selectedStatus() )
   createTaskTemplate(newTaskManager.tasks[newTaskManager.tasks.length-1]);
  
     taskName.value = "";
     taskRole.value = "";
     description.value = "";
     assignTo.value = "";
     notes.value = "";
     status[0].checked;
     form.classList.remove('was-validated')
    } else if(!form.checkValidity()) {
      event.stopPropagation()
      form.classList.add('was-validated')
  }
}
form.onsubmit = addNewTask;

