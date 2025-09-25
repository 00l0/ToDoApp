let tasks = [
    {
        title: "faris",
        date: "10/12/2023",
        isChecked: false,
      },
    {
        title: "jalkjd",
        date: "10/12/2023",
        isChecked: false,
      },
    {
        title: "aljk[a",
        date: "10/12/2023",
        isChecked: false,
      },
    {
        title: "apojoi",
        date: "10/12/2023",
        isChecked: false,
      },
];

let retrivedTasks = JSON.parse(localStorage.getItem("tasks"))

tasks = retrivedTasks ?? []


let createBtn = document.getElementById("create");
let input = document.getElementById("input");

readTasks()
createBtn.addEventListener("click", function () {
  if (!input.value.trim() == "") {
    let now = new Date();
    let time =
      now.getDate() +
      "/" +
      now.getMonth() +
      "/" +
      now.getFullYear() +
      " | " +
      now.getHours() +
      ":" +
      now.getMinutes();
    console.log(time);
    let taskObj = {
      title: input.value,
      date: time,
      isChecked: false,
    };
    tasks.push(taskObj);

    storeTasks()

    readTasks();
    input.value = "";
  } else {
    alert("Please enter a task before adding.");
  }
});

function readTasks() {
  let listSection = document.getElementById("list-section");
  listSection.innerHTML = "";
  let index = 0;
  for (const task of tasks) {
    document.getElementById("list-section").innerHTML += `
            <div class="todo" id="todo">
            <div class="time">${task.date}</div>
              <i onclick='editTask(${index})' class="fa-solid fa-pen pen" id="pen"></i>
              ${
                task.isChecked
                  ? `<i onclick='UnCheckTask(${index})' class="fa-solid fa-circle-xmark uncheck"></i>`
                  : `<i onclick='checkTask(${index})' class="fa-solid fa-circle-check check" id="check"></i>`
              }
              <p class="todo-text ${task.isChecked ? "checked" : ""}">${
      task.title
    }</p>
              <i onclick='deleteTask(${index})' class="fa-solid fa-trash delete" id="del"></i>
            </div>
    `;
    index++;
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  storeTasks()
  readTasks();
}

function editTask(index) {
  let editValue = prompt("Edit : ");
  if (!editValue.trim() == "") {
    tasks[index].title = editValue;
    storeTasks()
    readTasks();
  } else {
    alert("Please enter a task before adding.");
  }
}

function checkTask(index) {
  tasks[index].isChecked = true;
  storeTasks()
  readTasks();
}
function UnCheckTask(index) {
  tasks[index].isChecked = false;
  storeTasks()
  readTasks();
}





// =============== STORAGE FUNCTIONS =============
function storeTasks(){
    let tasksString = JSON.stringify(tasks)
    localStorage.setItem("tasks" , tasksString)
}