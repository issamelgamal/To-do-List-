let input = document.querySelector(".input")
let submit = document.querySelector(".add")
let taskDiv = document.querySelector(".tasks")
let deletAll = document.querySelector(".deleteAll")



// On page load, display the saved date (if any) from localStorage
window.onload = function() {
    const savedDate = localStorage.getItem('savedDate');
    if (savedDate) {
        document.getElementById('savedDate').textContent = 'date: ' + savedDate;
    }
};

// Handle form submission
document.getElementById('dateForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const dateInput = document.getElementById('dateInput').value;
    localStorage.setItem('savedDate', dateInput);

    // Update the text to display the saved date
    document.getElementById('savedDate').textContent = 'date : ' + dateInput;
    document.getElementById('dateForm').style.display = 'none';

});
// create array to store tasks
let arrayOfTasks = [];


// check there is tasks in localstorage
if(localStorage.getItem("tasks")){
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"))
}
//trigger get data from local storage
getDateFromLocalStorage()

//add task
submit.onclick = function(){
    if(input.value != ''){
        // add tasks to array of tasks
        addTaskToArray(input.value); 
        // empty the input
        input.value = '';
        
    }
}
// click on task element 
taskDiv.addEventListener("click" ,(e)=>{
    // delete button 
    if(e.target.classList.contains("del")){
        // remove element from local storage
        deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
        // remove element from page
        e.target.parentElement.remove()
        updateDeleteButtonOpacity();
    }
    
    // task Element
    if(e.target.classList.contains("task")){
        toggleStatusTaskWith(e.target.getAttribute("data-id"));
        // Toggle Completed For The Task
        //toggle done class
        e.target.classList.toggle("done")
    }
})
function addTaskToArray(taskText){
    // task Data 
    const task = {
        id: Date.now(),
        title:taskText,
        completed:false,
    };
    // push task to arrayoftasks
    arrayOfTasks.push(task);
    // add tasks to page
    addElementsToPageFrom(arrayOfTasks);
    // add Tasks to local storage
    addDataToLocalStorageFrom(arrayOfTasks)
    
    updateDeleteButtonOpacity();

}

function addElementsToPageFrom(arrayOfTasks){
    // empty the tasks div 
    taskDiv.innerHTML = "";
    arrayOfTasks.forEach((task)=>{
        // create main div
        let div = document.createElement("div")
        div.className = "task";
        // check if task is done 
        if(task.completed){
            div.className = "task done";
        }
        div.setAttribute("data-id" , task.id);
        div.appendChild(document.createTextNode(task.title));
        // create delte button
        let span = document.createElement("span")
        span.className = "del"
        span.appendChild(document.createTextNode("delete"));
        div.appendChild(span);
        // add task div to page
        taskDiv.appendChild(div);
    })
}

function  addDataToLocalStorageFrom(arrayOfTasks){
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks))
    
}
function getDateFromLocalStorage(){
    let data = window.localStorage.getItem("tasks")
    if(data){
        let tasks = JSON.parse(data);
        addElementsToPageFrom(tasks)
    }
}

function deleteTaskWith(taskId){
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId)
    addDataToLocalStorageFrom(arrayOfTasks);
}

function toggleStatusTaskWith(taskId) {
    for (let i = 0; i < arrayOfTasks.length; i++) {
        if (arrayOfTasks[i].id == taskId) {
            arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false);
        }
    }
    addDataToLocalStorageFrom(arrayOfTasks);
}

function updateDeleteButtonOpacity() {
    // Check if taskDiv is empty
    if (taskDiv.innerHTML.trim() === "") {
        deletAll.style.opacity = '0.5'; // Set opacity to 0.5 if empty
        deletAll.style.pointerEvents  = "none";
    } else {
        deletAll.style.opacity = '1'; // Set opacity to 1 if not empty
        deletAll.style.pointerEvents  = "auto";
    }
}
deletAll.onclick = function(){
    window.localStorage.removeItem("tasks")
    taskDiv.innerHTML = "";
    arrayOfTasks = [];
    console.log(arrayOfTasks)
    updateDeleteButtonOpacity()
    document.getElementById('dateForm').style.display = 'flex';
}

updateDeleteButtonOpacity();

