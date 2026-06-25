const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const totalTasks = document.getElementById("totalTasks");
const filterButtons = document.querySelectorAll(".filter-btn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let currentFilter = "all";
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function displayTasks(filter = "all") {

    taskList.innerHTML = "";

    let filteredTasks = tasks;

    if (filter === "active") {

        filteredTasks = tasks.filter(task => !task.completed);

    } else if (filter === "completed") {

        filteredTasks = tasks.filter(task => task.completed);

    }

    filteredTasks.forEach((task, index) => {

        const li = document.createElement("li");

        li.className = task.completed ? "task completed" : "task";

        li.innerHTML = `

            <span>${task.text}</span>

            <div class="actions">

                <button
                class="complete-btn"
                data-action="complete"
                data-index="${index}">

                ✓

                </button>

                <button
                class="edit-btn"
                data-action="edit"
                data-index="${index}">

                Edit

                </button>

                <button
                class="delete-btn"
                data-action="delete"
                data-index="${index}">

                Delete

                </button>

            </div>

        `;

        taskList.appendChild(li);

    });

    totalTasks.textContent = tasks.length;

    saveTasks();

}
addBtn.addEventListener("click", () => {

    const text = taskInput.value.trim();

    if (text === "") {

        alert("Enter a task.");

        return;

    }

    tasks.push({

        text,

        completed: false

    });

    taskInput.value = "";

    displayTasks(currentFilter);

});
taskList.addEventListener("click", (e) => {

    const action = e.target.dataset.action;

    const index = e.target.dataset.index;

    if (!action) return;

    if (action === "complete") {

        tasks[index].completed = !tasks[index].completed;

    }

    if (action === "delete") {

        tasks.splice(index, 1);

    }

    if (action === "edit") {

        const updated = prompt(

            "Edit Task",

            tasks[index].text

        );

        if (updated !== null && updated.trim() !== "") {

            tasks[index].text = updated;

        }

    }

    displayTasks(currentFilter);

});

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn =>

            btn.classList.remove("active")

        );

        button.classList.add("active");

        currentFilter = button.dataset.filter;

        displayTasks(currentFilter);

    });

});
taskInput.addEventListener("keypress", function(e){

    if(e.key==="Enter"){

        addBtn.click();

    }

});
displayTasks();