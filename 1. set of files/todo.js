let tasks = [];
const tasksList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');

//console.log('Working');

//working with APIs -
//the structure of the object in the json file in the API consist of
//completed - in place of done
//title - in place of text
//hence change done with completed, change text with title.
// function fetchTodos(){
//     fetch('https://jsonplaceholder.typicode.com/todos') // this is a promise and hence we can perform .then over this
//     .then(function(response){
//         console.log(response);
//         return response.json(); // this will also return the promise only and hence again .then is being used
//     }).then(function(data){
//         console.log(data);
//         tasks = data.slice(0,10);
//         renderList();
//     })
//     .catch(function(error){
//         console.log('error', error);
//     })
// }

//how to handle the post request
//we have learned to handle get request. The api we are woring with just allows us to fetch data from it i.e only get request

async function fetchTodos(){
    try{
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        const data = await response.json();
        tasks = data.slice(0,10);
        renderList();
    }catch(error){
        console.log(error);
    }
}

function addTaskToDom(task){
    const li = document.createElement('li');
    li.innerHTML = `
        <input type="checkbox" id="${task.id}" ${task.completed ? 'checked' : ''} class="custom-checkbox">
        <label for="${task.id}">${task.title}</label>
        <img src="delete-icon-13.jpg" class="delete" data-id="${task.id}" />
    `
    tasksList.append(li);
}
function renderList () {
    //when we wre entering the new item in via addTask, we are removing the display of the item and then after adding again displaying the items
    tasksList.innerHTML = "";
    for(let i=0; i<tasks.length; i++){
        addTaskToDom(tasks[i]);
    }
    tasksCounter.innerHTML = tasks.length;
}

function markTaskAsComplete (taskId) {
    // for(let i=0; i<tasks.length; i++){
    //     if(tasks[i].id == taskId){
    //         tasks[i].done = true;
    //     }
    // }

    const task = tasks.filter(function(task){
        return task.id == Number(taskId);
    })
    if(task.length > 0){
        const currrentTask = task[0];
        currrentTask.completed = !currrentTask.completed;
        renderList();
        showNotification('task toggled successfully');
        return;
    }
    showNotification('task cant be toggled');

    
}

function deleteTask (taskId) {
    const newTasks = tasks.filter(function(task){
        return task.id != Number(taskId);
    })

    tasks = newTasks;
    renderList();
    showNotification('task deleted successfully');
}



function addTask (task) {

    if(task){
        // this is a promise and hence we can perform .then over this
        // fetch('https://jsonplaceholder.typicode.com/todos', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type' : 'application/json',
        //     },
        //     body: JSON.stringify(task) 
        // }).then(function(response){
        //     console.log(response);
        //     return response.json(); // this will also return the promise only and hence again .then is being used
        // }).then(function(data){
        //     console.log(data);
        //     tasks = data.slice(0,10);
        //     renderList();
        // })
        // .catch(function(error){
        //     console.log('error', error);
        // })
        tasks.push(task);
        renderList();
        showNotification('Task added successfully');
        return;
    }
    showNotification('Please enter the task');
}



function showNotification(text) {
    alert(text);
}



function handleInputKeypress(e){
    if(e.key == 'Enter'){
        const text = e.target.value;
        if(!text){
            showNotification('Task text cannot be empty');
        }

        const task = {
            title: text,
            id: Date.now(),
            completed: false,
        }

        //empting the input box and passing the value of input box to addTask functi//on
        e.target.value = '';
        addTask(task);
    }

}

function handleCickListener(e){
    const target = e.target;
    console.log(target);
    if(target.className == 'delete'){
        const taskID = target.dataset.id;
        deleteTask(taskID);
        return;
    }else if(target.className == 'custom-checkbox'){
        const taskID = target.id;
        markTaskAsComplete(taskID);
        return;
    }
}


function initialiser(){
    fetchTodos();
    addTaskInput.addEventListener('keyup', handleInputKeypress)
    document.addEventListener('click', handleCickListener);
}

initialiser();