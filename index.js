// Input text field listener
document.addEventListener('DOMContentLoaded', function() {
    let taskForm = document.getElementById('taskForm');
    let taskInput = document.getElementById('taskInput');
    let taskList = document.getElementById('taskList');

    // Loading tasks from local storage - initialize an empty array if nothing is there
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Display tasks in the list
    tasks.forEach(function(taskText) {
        createTaskElement(taskText);
    });

    // Event handler for when the user adds a new task
    taskForm.addEventListener('submit', function(event) {
        event.preventDefault();
        addTask();
    });
  
    function addTask() {
        // Triming and storing our input text
        let taskText = taskInput.value.trim();

        // checking if the user actually inputted a task (no empty input)
        if (taskText !== '') {
            createTaskElement(taskText);

            // Save task to local storage
            tasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            
            // Reset input text
            taskInput.value = '';
        }
    }
    
    // Creates a new text element and adds the task to our list
    function createTaskElement(taskText) {
        var task = document.createElement('li');
        task.appendChild(document.createTextNode(taskText));
        taskList.appendChild(task);
      }
  });

//Clear storage
//localStorage.clear();