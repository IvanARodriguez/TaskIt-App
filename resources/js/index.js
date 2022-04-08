import { TaskManager } from "./taskManager.js";

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
//getting the form inputs
const addNewTask=(event)=>{
  event.preventDefault()
  //validate before submitting
  if(taskName.value !== "" && taskRole.value !== "" && description.value !== "" && assignTo.value !== "" ){
   newTaskManager.addTask( taskName.value, description.value, assignTo.value, dueDate.value, selectedStatus() )
   
   taskName.value = "";
   taskRole.value = "";
   description.value = "";
   assignTo.value = "";
   notes.value = "";
   status[0].checked;
  } else {
    console.log("Invalid values");
  }
  
  console.table(newTaskManager.tasks);
}
form.onsubmit = addNewTask;

//handling form validation
(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()





 