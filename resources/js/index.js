import { TaskManager } from "./taskManager.js";

const newTaskManager = new TaskManager();

const form = document.getElementById("form_section")

//TEMPLATES
// newTaskManager.addTask(
//   "Take dog out", 
//   "If you can go to the market and buy some chicken for dinner 🥘",
//   "Jonathan",
//   "Husband",
//   new Date().toDateString(),
//   "remember the chicken can not be over burned"
//   );
  
//   newTaskManager.addTask(
//     "Feed the fish", 
//     "The fish tank doesn't have more filter, if you have a chance go to the pet store 🐠",
//     "Juan",
//     "Son",
//     new Date().toDateString(),
//     "The filter size is Medium"
//     );
    
//load the task from local storage
newTaskManager.load();

newTaskManager.render();

//show notification

const showNotification = ()=>{
  const notificationBanner = document.getElementById("notification_banner");

  notificationBanner.classList.remove("hide");
  notificationBanner.classList.add("show");
  
  setTimeout(()=>{
    notificationBanner.classList.add("hide");
    notificationBanner.classList.remove("show");},
    1600);
}

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
    showNotification();

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
  

  newTaskManager.save();

  newTaskManager.render();
}); 

//Task 7 
const listTask = document.querySelector("#tasks_group");

listTask.addEventListener("click",(event)=>{
  if(event.target.classList.contains("done_btn")){
    
    const parentTask = event.target.parentElement.parentElement;

    const taskId = Number(parentTask.getAttribute("data-task-id"));

    const task = newTaskManager.getTaskById(taskId);
    
    task.taskStatus = "DONE";

    //save the tasks to localStorage
    newTaskManager.save();

    newTaskManager.render();
  }
})
