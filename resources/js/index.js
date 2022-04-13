import { TaskManager } from "./taskManager.js";

const newTaskManager = new TaskManager();

const form = document.getElementById("form_section")

//TEMPLATES
newTaskManager.addTask(
  "Take dog out", 
  "If you can go to the market and buy some chicken for dinner 🥘",
  "Jonathan",
  "Husband",
  new Date().toDateString(),
  "remember the chicken can not be over burned"
);

newTaskManager.addTask(
  "Feed the fish", 
  "The fish tank doesn't have more filter, if you have a chance go to the pet store 🐠",
  "Juan",
  "Son",
  new Date().toDateString(),
  "The filter size is Medium"
);

newTaskManager.render();

//getting the form inputs
form.addEventListener("submit", (event)=>{
  event.preventDefault()

  //form elements
  const dueDate = document.getElementById("cal_datepicker");
  const assignedTo = document.getElementById("AssignTo");
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

  //validate before submitting
  if(taskName.value !== "" && taskRole.value !== "" && description.value !== "" && assignedTo.value !== "" && dueDate.value !== ""){
    newTaskManager.addTask(
      taskName.value, 
      description.value, 
      assignedTo.value, 
      taskRole.value, 
      dueDate.value, 
      notes.value,
    selectedStatus())

    //clear the input fields
     taskName.value = "";
     taskRole.value = "";
     description.value = "";
     assignedTo.value = "";
     notes.value = "";
     status[0].checked;
     form.classList.remove('was-validated')
    } else if(!form.checkValidity()) {
      event.stopPropagation()
      form.classList.add('was-validated')
    }

  newTaskManager.render();
}) 