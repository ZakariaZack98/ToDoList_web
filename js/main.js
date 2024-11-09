let taskCount = 0;
let pendingCount = 0;
let personalCount = 0;
let businessCount = 0;
let dueCount = 0;
let othersCount = 0;
const header = document.getElementById('header');
const date = document.getElementById("todaysDate");
const addTaskBtn = document.getElementById("addTaskBtn");
const addTaskPage = document.getElementById("addTaskPage");
const returnToHome = document.getElementById("returnToHomeArrow");
const addTaskForm = document.getElementById("addTaskForm");
const inbox = document.getElementById("inbox");
const addingDoneBtn = document.getElementById("taskAddDoneBtn");
const completedTaskCount = document.getElementById("completeCount");
const totalPending = document.getElementById("totalTaskPending");
const businessTaskPending = document.getElementById("businessCount");
const dueTaskCount = document.getElementById("dueCount");
const personalTaskPending = document.getElementById('personalCount');
// const taskDeleteBtn = document.get('taskDelete');
// const taskEditBtn = document.getElementById('taskEdit');

//Date Part===================================================
const formattedDate = new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
}).format(new Date());
date.innerText = formattedDate;

addTaskBtn.addEventListener("click", () => {
  addTaskPage.style.transform = "translateX(0%)";
});
returnToHome.addEventListener("click", () => {
  addTaskPage.style.transform = "translateX(-100%)";
});


//task submittion==============================================
addTaskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(addTaskForm);
  console.log(formData);
  //creating main task section
  const newTaskElement = document.createElement("div");
  newTaskElement.classList.add(
    "taskSection",
    "d-flex",
    "align-items-center",
    "position-relative"
  );
  //adding checkbox
  const checkbox = document.createElement("div");
  checkbox.classList.add("form-check", "pointer");
  checkbox.innerHTML =
    '<input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />';
  //creating taskDetails section
  const taskDetails = document.createElement("div");
  taskDetails.classList.add("task", "flex-grow-1");
  //taskDetails header
  const taskHeader = document.createElement("h6");
  taskHeader.classList.add("taskHeader");
  taskHeader.textContent = formData.get("taskTitle");
  //taskType
  const taskType = document.createElement("p");
  taskType.classList.add("taskTag");
  taskType.textContent = formData.get("taskType");
  if (formData.get("taskType") === "Business") {
    businessCount++;
    newTaskElement.setAttribute("task-type", "business");
    businessTaskPending.innerText = businessCount;
  }
  if (formData.get("taskType") === "Personal") {
    personalCount++;
    newTaskElement.setAttribute("task-type", "personal");
    personalTaskPending.innerText = personalCount;
  }
  if (formData.get("taskType") === "Others") {
    othersCount++;
    newTaskElement.setAttribute("task-type", "others");
  }
  //date
  const taskDate = document.createElement("p");
  taskDate.classList.add("taskDeadLine");
  taskDate.textContent = formData.get("taskDate");
  if (new Date(formData.get('taskDate')) < new Date()) {
    dueCount++;
    dueTaskCount.innerText = dueCount;
    taskHeader.style.color = "red";
    taskDate.style.color = "red";
  }
  //nesting elements...
  newTaskElement.appendChild(checkbox);
  taskDetails.appendChild(taskHeader);
  taskDetails.appendChild(taskType);
  taskDetails.appendChild(taskDate);
  taskDetails.insertAdjacentHTML(
    "beforeend",
    `<i class="fa-regular fa-pen-to-square taskEdit position-absolute pointer" id="editTaskBtn"
                                style="font-size: 20px; color: blue"></i>`
  );
  taskDetails.insertAdjacentHTML(
    "beforeend",
    '<i class="fa-solid fa-trash-xmark taskDelete pointer position-absolute" style="font-size: 20px; color: red"></i>'
  );
  newTaskElement.appendChild(taskDetails);
  //finally appending the created element in inbox
  inbox.appendChild(newTaskElement);
  pendingCount++;
  totalPending.innerText = pendingCount;
});


// back to home after adding task
addingDoneBtn.addEventListener("click", () => {
  addTaskPage.style.transform = "translateX(-100%)";
});



//checking tasks===============================================
inbox.addEventListener("click", (event) => {
  event.stopPropagation();
  if (event.target.classList.contains("form-check-input")) {
    if (event.target.parentElement.parentElement.getAttribute('task-type') === 'business') {
      businessCount--;
      businessTaskPending.innerText = businessCount;
    }
    if (event.target.parentElement.parentElement.getAttribute('task-type') === 'personal') {
      personalCount--;
      personalTaskPending.innerText = personalCount;
    }
    if (event.target.parentElement.parentElement.getAttribute('task-type') === 'others') {
      othersCount--;
    }
    event.target.parentElement.parentElement.remove();
    taskCount++;
    pendingCount--;
    totalPending.innerText = pendingCount;
    completedTaskCount.innerText = taskCount;
  }
});

//modifying task===========================================
inbox.addEventListener('click', event => {
  event.stopPropagation();
  //deleting task==========================================
  if (event.target.classList.contains("taskDelete")) {
    if (event.target.parentElement.parentElement.getAttribute('task-type') === 'business') {
      businessCount--;
      businessTaskPending.innerText = businessCount;
    }
    if (event.target.parentElement.parentElement.getAttribute('task-type') === 'personal') {
      personalCount--;
      personalTaskPending.innerText = personalCount;
    }
    if (event.target.parentElement.parentElement.getAttribute('task-type') === 'others') {
      othersCount--;
    }
    event.target.parentElement.parentElement.remove();
    pendingCount--;
    totalPending.innerText = pendingCount;
    completedTaskCount.innerText = taskCount;
  }
  //renaming task=============================================
  if (event.target.classList.contains("taskEdit")) {
    //creating the edit prompt
    const editPrompt = document.createElement("div");
    editPrompt.classList.add('d-flex', 'gap-2');
    const editInputField = document.createElement("input");
    editInputField.classList.add("editInput");
    const editBtnSubmit = document.createElement('button');
    editBtnSubmit.classList.add("editSubmitBtn");
    editBtnSubmit.innerText = "✔";
    editPrompt.appendChild(editInputField);
    editPrompt.appendChild(editBtnSubmit);
    event.target.parentElement.replaceChild(editPrompt, event.target.parentElement.firstElementChild)
  }

  //submitting the renamed task
  if(event.target.classList.contains('editSubmitBtn')) {
    const taskAfterRename = event.target.parentElement.firstElementChild.value;
    const renamedTask = document.createElement('div');
    const taskHeader = document.createElement("h6");
    taskHeader.classList.add("taskHeader");
    taskHeader.innerText = taskAfterRename;
    renamedTask.appendChild(taskHeader);
    event.target.parentElement.replaceChild(renamedTask, event.target.parentElement.firstElementChild)
    event.target.remove();
  }
});

//fitering task by type===============================================
header.addEventListener('click', event => {
  if(event.target.classList.contains('personal')) {
    console.log('clicked')
    Array.from(inbox.children).forEach(tasksec => {
      if(tasksec.getAttribute('task-type') !== 'personal') tasksec.classList.toggle('invisible');
    })
  }
  if(event.target.classList.contains('business')) {
    Array.from(inbox.children).forEach(tasksec => {
      if (tasksec.getAttribute("task-type") !== "business")
        tasksec.classList.toggle("invisible");
    })
  }
})
