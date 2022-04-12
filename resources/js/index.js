import { TaskManager } from "./taskManager.js";
//form elements
const form = document.getElementById("form_section")
const dueDate = document.getElementById("cal_datepicker");
const assignTo = document.getElementById("AssignTo");
const taskRole = document.getElementById("TaskRole");
const taskName = document.getElementById("TaskName");
const description = document.getElementById("Description");
const notes = document.getElementById("Notes");
const status = document.getElementsByName("inlineRadioOptions")
const selectedStatus = () =>{
//get the checked status
  for (let i = 0; i < status.length; i++) {
    
    if (status[i].checked) {
      return status[i].value;
    }
    
  }
}

const newTaskManager = new TaskManager();

newTaskManager.addTask(
  "Take dog out", 
  "If you can go to the market and buy some chicken for dinner 🥘",
  "Jonathan",
  "Husband",
  new Date().toDateString(),
  "remember the chicken can not be over burned");

newTaskManager.addTask(
  "Feed the fish", 
  "The fish tank doesn't have more filter, if you have a chance go to the pet store 🐠",
  "Juan",
  "Son",
  new Date().toDateString(),
  "The filter size is Medium"
  );

//tasks template
const ul = document.getElementById("tasks_group");
const taskCounter = document.getElementById("task_counter");

//create HTML task template
const createTaskTemplate = (task) => {
  const htmlLi = `
    <li id="${task.id}"class="row border-bottom pb-2 border-secondary mb-3 align-items-center close" >
      <span class="col-2 d-block pb-3">${(task.id < 10) ? "0" + task.id : task.id}</span> <h4 class="col-8 fw-lighter">${task.name}</h4><a type="button" class="text-white col-2 details_viewer" ><i class="bi bi-eye-fill"></i></a>
      <div class="bg-dark p-3 rounded mb-4 details border-left-orange">
      <span class="fw-lighter text-end d-block">${task.dueDate}</span>
        <h6 class="fw-light"> For:<span class=" fw-bolder "> ${task.assignedTo} </span> | <span class="text-secondary fw-light"> ${task.taskRole} </span></h6>
        <p class="fw-lighter">${task.description}</p>
        <p>Notes: <span class="fw-lighter">${task.notes === undefined ? "" : task.notes}</span></p>
      </div>
    </li> 
    `;
  ul.insertAdjacentHTML("beforeend", htmlLi);
  taskCounter.innerHTML = newTaskManager.tasks.length;
}

newTaskManager.tasks.forEach(task => {
  createTaskTemplate(task);
} );

//Hide or show tasks details
function toggleDetails(){
  let itemClass = this.parentNode.className;
  if(itemClass === "row border-bottom pb-2 border-secondary mb-3 align-items-center close"){
    this.parentNode.className = "row border-bottom pb-2 border-secondary mb-3 align-items-center open"
  } else {
    this.parentNode.className = "row border-bottom pb-2 border-secondary mb-3 align-items-center close"
  }
};
let detailViewerBtn = document.querySelectorAll(".details_viewer");
for (let i = 0; i < detailViewerBtn.length; i++) {
  detailViewerBtn[i].addEventListener("click", toggleDetails);
}

//getting the form inputs
const addNewTask=(event)=>{
  event.preventDefault()
  //validate before submitting
  if(taskName.value !== "" && taskRole.value !== "" && description.value !== "" && assignTo.value !== "" ){
   newTaskManager.addTask( taskName.value, description.value, assignTo.value, taskRole.value, dueDate.value, notes.value,selectedStatus() )
   createTaskTemplate(newTaskManager.tasks[newTaskManager.tasks.length-1]);
    //clear the input fields
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

  //Add an event listener to all task viewer links
  detailViewerBtn = document.querySelectorAll(".details_viewer")
  for (let i = 0; i < detailViewerBtn.length; i++) {
    detailViewerBtn[i].addEventListener("click", toggleDetails);
  }
}

form.onsubmit = addNewTask;