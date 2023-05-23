// Input text field listener

document.addEventListener('DOMContentLoaded', function() {
    var taskForm = document.getElementById('taskForm');
    taskForm.addEventListener('submit', function(event) {
      event.preventDefault();
      addTask();
    });
  
    function addTask() {
      var input = document.getElementById('taskInput');
      var taskList = document.getElementById('taskList');

      // checking if the user actually inputted a task (no empty input)
      if (input.value.trim() !== '') {
        // creating a new task and add it to the list
        var task = document.createElement('li');
        task.appendChild(document.createTextNode(input.value));
        taskList.appendChild(task);
        // reset input text
        input.value = '';
      }
    }
  });