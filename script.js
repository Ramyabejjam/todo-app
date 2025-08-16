const taskInput = document.getElementById("taskInput");
const priorityInput = document.getElementById("priorityInput");
const taskList = document.getElementById("taskList");

function addTask(text = taskInput.value, completed = false, priority = priorityInput.value) {
  if (text === "") return;

  let li = document.createElement("li");

  let span = document.createElement("span");
  span.textContent = `[${priority}] ${text}`;
  if (completed) span.style.textDecoration = "line-through";

  // toggle complete
  span.onclick = () => {
    span.style.textDecoration =
      span.style.textDecoration === "line-through" ? "none" : "line-through";
    saveTasks();
  };

  let btn = document.createElement("button");
  btn.textContent = "❌";
  btn.onclick = () => {
    li.remove();
    saveTasks();
  };

  // priority style
  li.classList.add(priority.toLowerCase());
  li.appendChild(span);
  li.appendChild(btn);
  taskList.appendChild(li);

  taskInput.value = "";
  saveTasks();
}

function saveTasks() {
  let tasks = [];
  document.querySelectorAll("li").forEach(li => {
    let text = li.querySelector("span").textContent.split("] ")[1];
    let completed = li.querySelector("span").style.textDecoration === "line-through";
    let priority = li.classList.contains("high")
      ? "High"
      : li.classList.contains("medium")
      ? "Medium"
      : "Low";
    tasks.push({ text, completed, priority });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks
window.onload = () => {
  let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(task => addTask(task.text, task.completed, task.priority));
};
