const pendingTaskList = JSON.parse(localStorage.getItem("pendingTaskList")) || [];
const index = JSON.parse(localStorage.getItem("index")) || 0;
const completedTaskList = JSON.parse(localStorage.getItem("completedTaskList")) || [];

const task = {
    index: index,
    task: null,
    createDate: null,
    completeDate: null,
    addTask: function () {
        const addTask = document.getElementById("addTask");
        const pendingTasksList = document.getElementById("pendingTasksList");
        if (addTask.value !== "") {
            pendingTasksList.innerHTML = ""; //Delete all task in html
            const completedTasksList = document.getElementById("completedTasksList");
            completedTasksList.innerHTML = ""; //Delete all task in html
            pendingTaskList.push({ index: this.index, task: addTask.value, createDate: todayDate(), completeDate: this.completeDate }) //Add to the pending list new task
            task.runTasks(); //Run tasks to update the html whith the new task
            addTask.value = ""; //Reset the new task text for the next
            this.index++ //increase the index by 1 for the next
            localStorage.setItem("pendingTaskList", JSON.stringify(pendingTaskList)); //Save list in local storage
            localStorage.setItem("index", JSON.stringify(this.index)); // Save index in local storage
        }
    },
    removePendingTask: function () {
        const removeIndex = pendingTaskList.findIndex(item => item.index == event.target.id); //Find the position of the id clicked that is the same of the index
        pendingTaskList.splice(removeIndex, 1); //Delete the task
        const pendingTasksList = document.getElementById("pendingTasksList");
        pendingTasksList.innerHTML = ""; //Delete all task in html
        const completedTasksList = document.getElementById("completedTasksList");
        completedTasksList.innerHTML = ""; //Delete all task in html
        task.runTasks(); //Run tasks to update the html whith the new task
        localStorage.setItem("pendingTaskList", JSON.stringify(pendingTaskList)); //Save list in local storage
    },
    completeTask: function () {
        const removeIndex = event.target.id;
        const indexToRemove = pendingTaskList.findIndex(item => item.index == event.target.id); //Find the position of the id clicked that is the same of the index
        completedTaskList.push({ index: removeIndex, task: pendingTaskList.find(item => item.index == removeIndex).task, createDate: pendingTaskList.find(item => item.index == removeIndex).createDate, completeDate: todayDate() }) //Add to the completed list the task
        pendingTaskList.splice(indexToRemove, 1); //Remove the deleted item in the pendingTaskList
        const pendingTasksList = document.getElementById("pendingTasksList");
        pendingTasksList.innerHTML = ""; //Delete all task in html
        const completedTasksList = document.getElementById("completedTasksList");
        completedTasksList.innerHTML = ""; //Delete all task in html
        task.runTasks(); //Run tasks to update the html whith the new task
        localStorage.setItem("pendingTaskList", JSON.stringify(pendingTaskList)); //Save list in local storage
        localStorage.setItem("completedTaskList", JSON.stringify(completedTaskList)); //Save list in local storage  
    },
    removeCompleteTask: function () {

        const removeIndex = completedTaskList.findIndex(item => item.index == event.target.id); //Find the position of the id clicked that is the same of the index

        completedTaskList.splice(removeIndex, 1); //Delete the task
        const completedTasksList = document.getElementById("completedTasksList");
        completedTasksList.innerHTML = ""; //Delete all task in html
        const pendingTasksList = document.getElementById("pendingTasksList");
        pendingTasksList.innerHTML = ""; //Delete all task in html
        task.runTasks(); //Run tasks to update the html whith the new task
        localStorage.setItem("completedTaskList", JSON.stringify(completedTaskList)); //Save list in local storage
    },


    runTasks: function () {
        const pendingTasksList = document.getElementById("pendingTasksList");
        pendingTaskList.forEach(element => {
            pendingTasksList.innerHTML += pendingTask(element.index, element.task, element.createDate);
        }); //For each element in the list in local storage runs the pending task function

        const completedTasksList = document.getElementById("completedTasksList");
        completedTaskList.forEach(element => {
            completedTasksList.innerHTML += completedTask(element.index, element.task, element.completeDate);
        }); //For each element in the list in local storage runs the completed task function
    },
}

//functions

function todayDate() {
    const today = new Date();
    return today.toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
    }).replace(',', '');
}

function pendingTask(taskindex, taskText, createDate) {
    return `<article class="pendingTask">
                <div class="pendingTaskTexts">
                    <p class="pendingTaskDescription">${taskText}</p>
                    <p class="pendingTaskDate">Created: ${createDate}</p>
                </div>
                <div class="pendingTaskButtons">
                    <input type="button" id="${taskindex}" onclick="task.completeTask()" value="Complete">
                    <input type="button" id="${taskindex}" onclick="task.removePendingTask()" value="Delete">
                </div>
            </article>`
}

function completedTask(taskIndex, taskText, completeDate) {
    return `<article class="completedTask">
                <div class="completedTaskTexts">
                    <p class="completedTaskDescription">${taskText}</p>
                    <p class="completedTaskDate">Completed: ${completeDate}</p>
                </div>
                <input type="button" id="${taskIndex}" onclick="task.removeCompleteTask()" value="Delete">
            </article>`
}

//run tasks
task.runTasks();