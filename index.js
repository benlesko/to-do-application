// Input text field listener
document.addEventListener('DOMContentLoaded', function() {
    let taskForm = document.getElementById('taskForm');
    let taskInput = document.getElementById('taskInput');
    let taskList = document.getElementById('taskList');
    let completedList = document.getElementById('completedTaskList');

    // Loading tasks from local storage - initialize an empty array if nothing is there
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];

    // Display tasks in the list
    tasks.forEach(function(taskText) {
        createTaskElement(taskText);
    });


    //Display completed tasks in the archive
    completedTasks.forEach(function(taskText) {
        createCompletedElement(taskText);
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
        let task = document.createElement('li');

        //Create checkbox for moving items
        let childCheckbox = document.createElement('input')
        childCheckbox.type='checkbox';
        task.classList.add("todo");

        //Create Remove Button
        let removeButton = document.createElement('img');
        removeButton.src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fassets.webiconspng.com%2Fuploads%2F2017%2F01%2FRed-Trash-Simple-Icon.png&f=1&nofb=1&ipt=08caa121fbabebcf0b3ee4205adc69767bac2d889dc6bcaeb993203bf1d69171&ipo=images'
        removeButton.classList.add('remove-button');

        //Appending elements to form each task entry
        task.appendChild(document.createTextNode(taskText));
        task.appendChild(childCheckbox);
        task.appendChild(removeButton);
        taskList.appendChild(task);

        childCheckbox.addEventListener('change', function(){
            toggleTaskCompletion(task, taskText);
        });

        removeButton.addEventListener('click', function(event) {
            event.stopPropagation();
            removeTask(task, taskText, taskList);
        });
    }

    function createCompletedElement(taskText) {
        let task = document.createElement('li');

        //Create checkbox for moving items
        let childCheckbox = document.createElement('input')
        childCheckbox.type = 'checkbox';
        childCheckbox.checked = true;
        task.classList.add("completed");

        //Create Remove Button
        let removeButton = document.createElement('img');
        removeButton.src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fassets.webiconspng.com%2Fuploads%2F2017%2F01%2FRed-Trash-Simple-Icon.png&f=1&nofb=1&ipt=08caa121fbabebcf0b3ee4205adc69767bac2d889dc6bcaeb993203bf1d69171&ipo=images'
        removeButton.classList.add('remove-button');

        //Appending elements to form each task entry
        task.appendChild(document.createTextNode(taskText));
        task.appendChild(childCheckbox)
        task.appendChild(removeButton);
        completedList.appendChild(task);

        childCheckbox.addEventListener('change', function(){
            toggleTaskCompletion(task, taskText);
        });
        
        removeButton.addEventListener('click', function(event) {
            event.stopPropagation();
            removeTask(task, taskText, completedList);
        });
    }

    function toggleTaskCompletion(task, taskText) {
        if (task.parentElement === taskList) {
            // Move task from task list to archive
            task.classList.add('completed');
            task.classList.remove('todo')
            taskList.removeChild(task);
            completedList.appendChild(task);

            // Remove task from tasks array
            let taskIndex = tasks.indexOf(taskText);
            tasks.splice(taskIndex, 1);
    
            // Add task to completed tasks array
            completedTasks.push(taskText);
        } else if (task.parentElement === completedList) {
            // Move task from archive to task list
            task.classList.add('todo')
            task.classList.remove('completed');
            completedList.removeChild(task);
            taskList.appendChild(task);
        
            // Remove task from completed tasks array
            let completedTaskIndex = completedTasks.indexOf(taskText);
            completedTasks.splice(completedTaskIndex, 1);
        
            // Add task back to tasks array
            tasks.push(taskText);
        }
    
        // Save updated tasks to local storage
        localStorage.setItem('tasks', JSON.stringify(tasks));
        localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
      }

      function removeTask(task, taskText, sourceList) {
        if (sourceList === taskList) {
          // Remove task from task list
          tasks.splice(tasks.indexOf(taskText), 1);
        } else {
          // Remove task from completed tasks list
          completedTasks.splice(completedTasks.indexOf(taskText), 1);
        }
    
        sourceList.removeChild(task);
    
        // Save updated tasks to local storage
        localStorage.setItem('tasks', JSON.stringify(tasks));
        localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
      }

  });

//Clear storage
// localStorage.clear();