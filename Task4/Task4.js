  let editingTaskElement = null; 
        
        function updateTaskCounts() {
            const totalTasks = document.querySelectorAll('#taskList .task-item').length;
            const completedTasks = document.querySelectorAll('#taskList .task-item .task-title.completed').length;
            const pendingTasks = totalTasks - completedTasks;

            document.getElementById('totalTasks').textContent = totalTasks;
            document.getElementById('completedTasks').textContent = completedTasks;
            document.getElementById('pendingTasks').textContent = pendingTasks;
        }

        function getTaskDetailsFromInputs() {
            const task = document.getElementById("task").value.trim();
            const durationValue = document.getElementById("durationValue").value;
            const durationUnit = document.getElementById("durationUnit").value;
            const date = document.getElementById("date").value;
            const category = document.getElementById("category").value;

            return { task, durationValue, durationUnit, date, category };
        }

        function validateInputs(taskDetails) {
            if (!taskDetails.task) {
                alert("Please enter a task description.");
                return false;
            }
            if (!taskDetails.durationValue || parseInt(taskDetails.durationValue) <= 0) {
                alert("Please enter a valid duration (a positive number).");
                return false;
            }
            return true;
        }

        function clearInputs() {
            document.getElementById("task").value = "";
            document.getElementById("durationValue").value = "";
            document.getElementById("durationUnit").value = "minutes"; 
            document.getElementById("date").value = "";
            document.getElementById("category").value = "Work"; 
        }

        function setButtonToAddMode() {
            const addTaskBtn = document.getElementById("addTaskBtn");
            addTaskBtn.textContent = "➕ Add Task";
            addTaskBtn.onclick = handleTask;
        }

        function setButtonToUpdateMode() {
            const addTaskBtn = document.getElementById("addTaskBtn");
            addTaskBtn.textContent = "🔄 Update Task";
            addTaskBtn.onclick = handleTask; 
        }

        function createTaskElement(taskDetails) {
            const li = document.createElement("li");
            li.className = "task-item";
            li.dataset.task = taskDetails.task;
            li.dataset.durationValue = taskDetails.durationValue;
            li.dataset.durationUnit = taskDetails.durationUnit;
            li.dataset.date = taskDetails.date;
            li.dataset.category = taskDetails.category;

            li.innerHTML = `
                <div class="task-details">
                    <div class="task-title">${taskDetails.task}</div>
                    <small style="color:#666;">
                        ${taskDetails.date ? `📅 ${taskDetails.date} | ` : ""}⏱ ${taskDetails.durationValue} ${taskDetails.durationUnit}
                    </small>
                    <div class="category-badge">${taskDetails.category}</div>
                </div>
                <div class="controls">
                    <button class="btn btn-small" onclick="editTask(this)">✏</button>
                    <button class="btn btn-small" onclick="toggleDone(this)">✔</button>
                    <button class="btn btn-small" onclick="deleteTask(this)">❌</button>
                </div>
            `;
            return li;
        }

        function updateTaskElement(element, taskDetails) {
            element.dataset.task = taskDetails.task;
            element.dataset.durationValue = taskDetails.durationValue;
            element.dataset.durationUnit = taskDetails.durationUnit;
            element.dataset.date = taskDetails.date;
            element.dataset.category = taskDetails.category;
            element.querySelector(".task-title").textContent = taskDetails.task;
            element.querySelector("small").innerHTML = `
                ${taskDetails.date ? `📅 ${taskDetails.date} | ` : ""}⏱ ${taskDetails.durationValue} ${taskDetails.durationUnit}
            `;
            element.querySelector(".category-badge").textContent = taskDetails.category;
            element.querySelector(".task-title").classList.remove("completed");
        }

        function handleTask() {
            const taskDetails = getTaskDetailsFromInputs();

            if (!validateInputs(taskDetails)) {
                return; 
            }

            if (editingTaskElement) {
                updateTaskElement(editingTaskElement, taskDetails);
                editingTaskElement = null; 
                setButtonToAddMode(); 
            } else {
                const li = createTaskElement(taskDetails);
                document.getElementById("taskList").appendChild(li);
            }
            clearInputs(); 
            updateTaskCounts(); 
        }

        function deleteTask(btn) {
            const liToDelete = btn.closest("li");
            if (editingTaskElement === liToDelete) {
                clearInputs();
                setButtonToAddMode();
                editingTaskElement = null;
            }
            liToDelete.remove();
            updateTaskCounts(); 
        }

        function toggleDone(btn) {
            const title = btn.closest("li").querySelector(".task-title");
            title.classList.toggle("completed");
            updateTaskCounts(); 
        }

        function editTask(btn) {
            const listItem = btn.closest("li");
            editingTaskElement = listItem; 
            document.getElementById("task").value = listItem.dataset.task;
            document.getElementById("durationValue").value = listItem.dataset.durationValue;
            document.getElementById("durationUnit").value = listItem.dataset.durationUnit;
            document.getElementById("date").value = listItem.dataset.date;
            document.getElementById("category").value = listItem.dataset.category;

            setButtonToUpdateMode(); 
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        document.addEventListener('DOMContentLoaded', updateTaskCounts);