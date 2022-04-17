import { TaskManager } from "./taskManager.js";

//create an instance of the TaskManager Class
const newTaskManager = new TaskManager();

//global access to the form element
const form = document.getElementById("form_section")
    
//load the task from local storage
newTaskManager.load();

newTaskManager.render();

//create a template to display toast notifications
const showNotification = (type, message)=>{
  //grab the html notification banner
  const notificationBanner = document.getElementById("notification_banner");
  const notificationBody = document.getElementById("notification_body");
  const notificationIcon = document.getElementById("notification_icon");

  //enter the customed notification  
  notificationBody.innerHTML = message;

  //identify if the notification will be a success "green" or danger "red"
  if(type === "success"){
    notificationIcon.className = "bi bi-check-circle-fill display-1";
    notificationBanner.classList.remove("warning-notification")
    notificationBanner.classList.add("success-notification");
  } else if (type === "warning"){
    notificationIcon.className = "bi bi-x-octagon-fill display-1 ";
    notificationBanner.classList.add("warning-notification")
    notificationBanner.classList.remove("success-notification");
  }

  //remove the css hide and implement show
  notificationBanner.classList.remove("hide");
  notificationBanner.classList.add("show");
  
  //remove the element from the page using asyncronous function setTimeOut()
  setTimeout(()=>{
    notificationBanner.classList.add("hide");
    notificationBanner.classList.remove("show");},
    2300); //2.3s
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
    showNotification("success", "Task successfully added!");

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
const priorityGroup = document.querySelector("#priority_group");

listTask.addEventListener("click",(event)=>{
  if(event.target.classList.contains("done_btn")){
    
    const parentTask = event.target.parentElement.parentElement;

    const taskId = Number(parentTask.getAttribute("data-task-id"));

    const task = newTaskManager.getTaskById(taskId);
    
    task.taskStatus = "DONE";

    showNotification("success", `The task ${task.id} was marked as done!`)

    //save the tasks to localStorage
    newTaskManager.save();

    newTaskManager.render();
  }
  if(event.target.classList.contains("delete_btn")){
    
    const parentTask = event.target.parentElement.parentElement;
    
    const taskId = Number(parentTask.getAttribute("data-task-id"));
    
    newTaskManager.deleteTask(taskId);
    
    newTaskManager.save();
  
    newTaskManager.render();

    showNotification("warning", `The task has been deleted`)

  }
});

// create a Priority event for button done

priorityGroup.addEventListener("click",(event)=>{
  if(event.target.classList.contains("done_btn")){
    
    const parentTask = event.target.parentElement.parentElement;

    const taskId = Number(parentTask.getAttribute("data-task-id"));

    const task = newTaskManager.getTaskById(taskId);
    
    task.taskStatus = "DONE";

    //save the tasks to localStorage
    newTaskManager.save();

    newTaskManager.render();

    showNotification("success", `The task ${task.id} was marked as done!`)
  }
  if(event.target.classList.contains("delete_btn")){
    
    const parentTask = event.target.parentElement.parentElement;
    
    const taskId = Number(parentTask.getAttribute("data-task-id"));
    
    newTaskManager.deleteTask(taskId);
    
    newTaskManager.save();
  
    newTaskManager.render();

    showNotification("warning", `The task has been deleted`)

  }
});



