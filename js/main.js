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
const body = document.getElementById('body');
const inbox = document.getElementById("inbox");
const personalTab = document.getElementById('personalTab');
const addingDoneBtn = document.getElementById("taskAddDoneBtn");
const completedTaskCount = document.getElementById("completeCount");
const totalPending = document.getElementById("totalTaskPending");
const businessTaskPending = document.getElementById("businessCount");
const dueTaskCount = document.getElementById("dueCount");
const personalTaskPending = document.getElementById('personalCount');

//Date Part===================================================
const formattedDate = new Intl.DateTimeFormat('en-US', {
  day: 'numeric',
  month: 'long',
  year: 'numeric'
}).format(new Date());
date.innerText = formattedDate;

//add task and return to home =================================
addTaskBtn.addEventListener("click", () => {
  addTaskPage.style.transform = "translateX(0%)";
  body.style.opacity = 0;
});
returnToHome.addEventListener("click", () => {
  addTaskPage.style.transform = "translateX(-100%)";
  body.style.opacity = 1;
});

//updatecount function=========================================
updatecount = () => {
  totalPending.innerText = pendingCount;
  businessTaskPending.innerText = businessCount;
  personalTaskPending.innerText = personalCount;
  dueTaskCount.innerText = dueCount;
  completedTaskCount.innerText = taskCount;
}

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
    updatecount();
  }
  if (formData.get("taskType") === "Personal") {
    personalCount++;
    newTaskElement.setAttribute("task-type", "personal");
    updatecount();
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
    newTaskElement.setAttribute('task-status', 'due');
    dueCount++;
    updatecount();
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
  inbox.insertAdjacentElement('afterbegin', newTaskElement);
  document.getElementById("taskTitle").value = '';
  document.getElementById("taskPlace").value = '';
  pendingCount++;
  updatecount();
});


// back to home after adding task
addingDoneBtn.addEventListener("click", () => {
  addTaskPage.style.transform = "translateX(-100%)";
  body.style.opacity = 1;
});



//checking tasks===============================================
inbox.addEventListener("click", (event) => {
  event.stopPropagation();
  if (event.target.classList.contains("form-check-input")) {
    event.target.parentElement.parentElement.classList.add("taskDone"); //animation
    if (event.target.parentElement.parentElement.getAttribute('task-type') === 'business') {
      businessCount--;
      updatecount();
    }
    if (event.target.parentElement.parentElement.getAttribute('task-type') === 'personal') {
      personalCount--;
      updatecount();
    }
    if (event.target.parentElement.parentElement.getAttribute('task-type') === 'others') {
      othersCount--;
    }
    if (event.target.parentElement.parentElement.getAttribute('task-status') === 'due') {
      dueCount--;
    }
    setTimeout(() => {
      event.target.parentElement.parentElement.remove();
    }, 500);
    taskCount++;
    pendingCount--;
    updatecount();
  }
});

//modifying task===========================================
inbox.addEventListener('click', event => {
  event.stopPropagation();
  //deleting task==========================================
  if (event.target.classList.contains("taskDelete")) {
    //adding animation
    event.target.parentElement.parentElement.style.transform =
      "translateX(100%)";
    event.target.parentElement.parentElement.classList.add("taskDeleted");
    //animation ends
    if (
      event.target.parentElement.parentElement.getAttribute("task-type") ===
      "business"
    ) {
      businessCount--;
      updatecount();
    }
    if (
      event.target.parentElement.parentElement.getAttribute("task-type") ===
      "personal"
    ) {
      personalCount--;
      updatecount();
    }
    if (
      event.target.parentElement.parentElement.getAttribute("task-type") ===
      "others"
    ) {
      othersCount--;
    }
    if (
      event.target.parentElement.parentElement.getAttribute("task-status") ===
      "due"
    ) {
      dueCount--;
    }
    setTimeout(() => {
      event.target.parentElement.parentElement.remove();
    }, 500);
    pendingCount--;
    updatecount();
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
    event.target.parentElement.replaceChild(editPrompt, event.target.parentElement.firstElementChild);
  }

  //submitting the renamed task
  if (event.target.classList.contains('editSubmitBtn')) {
    const taskAfterRename = event.target.parentElement.firstElementChild.value;
    if (taskAfterRename.length > 0) {
      const renamedTask = document.createElement("div");
      const taskHeader = document.createElement("h6");
      taskHeader.classList.add("taskHeader");
      taskHeader.innerText = taskAfterRename;
      renamedTask.appendChild(taskHeader);
      event.target.parentElement.replaceChild(
        renamedTask,
        event.target.parentElement.firstElementChild
      );
      event.target.remove();
    }
    else alert('Please fill out this field.')
  }
});

//fitering task by type===============================================
header.addEventListener('click', event => {
  if (event.target.classList.contains('personal')) {
    //animation
    inbox.style.opacity = 0;
    setTimeout(() => {
      inbox.style.opacity = 1;
      inbox.style.transition = "0.3s ease";
    }, 300); //animation
    event.target.classList.toggle("activetab");
    Array.from(inbox.children).forEach(tasksec => {
      if (tasksec.getAttribute('task-type') !== 'personal') {
        setTimeout(() => {
          tasksec.classList.toggle("invisible");
        }, 300);
      }
    })

  }
  if (event.target.classList.contains('business')) {
    //animation
    inbox.style.opacity = 0;
    setTimeout(() => {
      inbox.style.opacity = 1;
      inbox.style.transition = "0.3s ease";
    }, 300); //animation
    event.target.classList.toggle("activetab");
    Array.from(inbox.children).forEach((tasksec) => {
      if (tasksec.getAttribute("task-type") !== "business")
        setTimeout(() => {
          tasksec.classList.toggle("invisible");
        }, 300);
    });
  }
});
