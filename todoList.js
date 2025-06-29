document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#add-btn");
  const newTaskInput = document.querySelector("#wrapper input[type='text']");
  const dueDateInput = document.querySelector("#due-date-input");
  const tasksContainer = document.querySelector("#tasks");
  const error = document.getElementById("error");
  const countValue = document.querySelector(".count-value");

  const displayCount = () => {
    const pendingTasks = document.querySelectorAll(
      ".task .task-check:not(:checked)"
    );
    countValue.innerText = pendingTasks.length; // Update the count display
  };

  // Save tasks to localStorage
  const saveTasksToLocalStorage = () => {
    const tasks = Array.from(tasksContainer.querySelectorAll(".task")).map(
      (task) => ({
        name: task.querySelector(".taskname").textContent,
        completed: task.querySelector(".task-check").checked,
        dueDate:
          task
            .querySelector(".task-due-date")
            ?.textContent.replace("Due date: ", "") || "",
      })
    );
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const loadTasksFromLocalStorage = () => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasksContainer.innerHTML = "";
    savedTasks.forEach((task) => {
      addTaskToDOM(task.name, task.completed, task.dueDate);
    });
    displayCount();
  };

  const addTaskToDOM = (taskName, completed = false, dueDate = "") => {
    const task = document.createElement("div");
    task.className = "task";

    task.innerHTML = `
      <input type="checkbox" class="task-check" ${completed ? "checked" : ""}>
      <span class="taskname ${completed ? "completed" : ""}">${taskName}</span>
      <span class="task-due-date">${
        dueDate ? `Due date: ${dueDate}` : ""
      }</span>
      <button class="edit"><i class="fas fa-edit"></i></button>
      <button class="delete"><i class="far fa-trash-alt"></i></button>
    `;

    tasksContainer.appendChild(task);

    // Delete task functionality
    task.querySelector(".delete").addEventListener("click", () => {
      task.remove();
      displayCount();
      saveTasksToLocalStorage();
    });

    // Edit task functionality
    task.querySelector(".edit").addEventListener("click", () => {
      newTaskInput.value = task.querySelector(".taskname").textContent;
      dueDateInput.value = task
        .querySelector(".task-due-date")
        .textContent.replace("Due date: ", "");
      task.remove();
      displayCount();
      saveTasksToLocalStorage();
    });

    // Mark task as completed/incomplete
    task.querySelector(".task-check").addEventListener("change", () => {
      const isChecked = task.querySelector(".task-check").checked;
      task.querySelector(".taskname").classList.toggle("completed", isChecked);
      displayCount();
      saveTasksToLocalStorage();
    });

    displayCount();
    saveTasksToLocalStorage();
  };

  // Handle adding a new task
  const addTask = () => {
    const taskName = newTaskInput.value.trim();
    const dueDate = dueDateInput.value;
    error.style.display = "none";

    if (!taskName) {
      error.style.display = "block";
      return;
    }

    addTaskToDOM(taskName, false, dueDate);
    newTaskInput.value = "";
    dueDateInput.value = "";
    newTaskInput.focus();
  };

  // for adding tasks
  addBtn.addEventListener("click", addTask);
  newTaskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTask();
  });

  loadTasksFromLocalStorage();
  displayCount();
});
