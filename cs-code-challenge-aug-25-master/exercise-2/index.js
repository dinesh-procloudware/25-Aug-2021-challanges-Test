const COMPLETED_ITEMS_KEY = 'completed_items';
const INCOMPLETED_ITEMS_KEYS = 'incompleted_items';
var taskInput = document.getElementById("new-task");
var addButton = document.getElementsByTagName("button")[0];
var incompleteTasksHolder = document.getElementById("incomplete-tasks");
var completedTasksHolder = document.getElementById("completed-tasks");

const completedItemsData = localStorage.getItem(COMPLETED_ITEMS_KEY);
const incompleteItemsData = localStorage.getItem(INCOMPLETED_ITEMS_KEYS);
completedItemsData ? completedTasksHolder.innerHTML = completedItemsData : null;
incompleteItemsData ? incompleteTasksHolder.innerHTML = incompleteItemsData : null;

var createNewTaskElement = function(taskString, arr) {
    listItem = document.createElement("li");
    checkBox = document.createElement("input");
    label = document.createElement("label");
    editInput = document.createElement("input");
    editButton = document.createElement("button");
    deleteButton = document.createElement("button");

    checkBox.type = "checkbox";
    editInput.type = "text";
    editButton.innerText = "Edit";
    editButton.className = "edit";
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete";
    label.innerText = taskString;

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    return listItem;
};

var addItem = function() {
    if (taskInput.value && taskInput.value != '') {
        taskInput.classList.remove('error');
        var listItemName = taskInput.value;
        listItem = createNewTaskElement(listItemName)
        incompleteTasksHolder.appendChild(listItem);
        bindTaskEvents(listItem, taskSuccessful)
        taskInput.value = "";
        updateLocalStorage();
    } else {
        taskInput.classList.add('error');
    }
};

var editItem = function() {
    var listItem = this.parentNode;
    console.log(':: parentNode', this.parentNode);
    var editInput = listItem.querySelectorAll("input[type=text")[0];
    var label = listItem.querySelector("label");
    var button = listItem.getElementsByTagName("button")[0];

    var containsClass = listItem.classList.contains("editMode");
    if (containsClass) {
        label.innerText = editInput.value
        button.innerText = "Edit";
    } else {
        editInput.value = label.innerText
        button.innerText = "Save";
    }

    listItem.classList.toggle("editMode");
    updateLocalStorage();
};

var deleteItem = function(el) {
    var listItem = this.parentNode;
    var ul = listItem.parentNode;
    ul.removeChild(listItem);
    updateLocalStorage();
};

var taskSuccessful = function(el) {
    debugger;
    var listItem = this.parentNode;
    var checkBox = listItem.querySelectorAll("input[type=checkbox]")[0];
    checkBox.setAttribute('checked', true);
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskunSuccess);
    updateLocalStorage();
};

var taskunSuccess = function() {
    debugger;
    var listItem = this.parentNode;
    var checkBox = listItem.querySelectorAll("input[type=checkbox]")[0];
    checkBox.removeAttribute('checked');
    incompleteTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskSuccessful);
    updateLocalStorage();
};


var bindTaskEvents = function(taskListItem, checkBoxEventHandler, cb) {
    var checkBox = taskListItem.querySelectorAll("input[type=checkbox]")[0];
    var editButton = taskListItem.querySelectorAll("button.edit")[0];
    var deleteButton = taskListItem.querySelectorAll("button.delete")[0];
    editButton.onclick = editItem;
    deleteButton.onclick = deleteItem;
    checkBox.onchange = checkBoxEventHandler;
};

addButton.addEventListener("click", addItem);

for (var i = 0; i < incompleteTasksHolder.children.length; i++) {
    bindTaskEvents(incompleteTasksHolder.children[i], taskSuccessful);
}

for (var i = 0; i < completedTasksHolder.children.length; i++) {
    bindTaskEvents(completedTasksHolder.children[i], taskunSuccess);
}

var updateLocalStorage = function() {
    // get all incomplete tasks and save it in localStorage 
    // all incomplete tasks 
    const completed_tasks = '#completed-tasks';
    const incomplete_tasks = '#incomplete-tasks';
    let incompleteTasks = document.querySelector(incomplete_tasks).innerHTML;
    let completedTasks = document.querySelector(completed_tasks).innerHTML;
    localStorage.setItem(INCOMPLETED_ITEMS_KEYS, incompleteTasks);
    localStorage.setItem(COMPLETED_ITEMS_KEY, completedTasks);
}