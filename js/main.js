$(document).ready(function(){
  // Add task event
  $('#add-task-form').submit(function(e){
    addTask(e);
  });

  // Edit event
  $('#edit-task-form').submit(function(e){
    updateTask(e);
  });

  // Remove task event
  $('#task-table').on('click','#remove-task', function(){
    id = $(this).data('id');
    removeTask(id);
  });

  // Clear tasks event
  $('#clear-tasks').on('click', function(){
    clearAllTasks();
  });

  // Display tasks
  displayTasks();

  // Function to display tasks
  function displayTasks() {
    var taskList = JSON.parse(localStorage.getItem('tasks'));
    
    // Sort tasks
    if (taskList !== null) {
      taskList = taskList.sort(sortByTime);
    }

    // Check tasks
    if (localStorage.getItem('tasks') !== null) {
      // var counter = 1;

      // Loop through and display
      $.each(taskList, function(key, value){
        $('#task-table').append('<tr id="' + value.id + '">' +
          '<td>' + value.task + '</td>' +
          '<td>' + value.task_priority + '</td>' +
          '<td>' + value.task_date + '</td>' +
          '<td>' + value.task_time + '</td>' +
          '<td><a href="edit.html?id=' + value.id + '">Edit</a> | <a href="#" id="remove-task" data-id="' + value.id + '">Remove</a></td>' +
          '</tr>');
        // counter++;
      });
    }
  }

  // Function to sort by time
  function sortByTime(a, b) {
    var aTime = a.task_time;
    var bTime = b.task_time;
    return ((aTime < bTime) ? -1 : ((aTime > bTime) ? 1 : 0));
  }

  // Function to add a task
  function addTask(e){
    // Add Unique ID
    var newDate = new Date();
    var id = newDate.getTime();
    
    var task = $('#task').val();
    var task_priority = $('#priority').val();
    var task_date = $('#date').val();
    var task_time = $('#time').val();

    // Simple validation
    if (task === '') {
      alert('Task is required');
      e.preventDefault();
    } else if (task_date === '') {
      alert('Date is required');
      e.preventDefault();
    } else if (task_time === '') {
      alert('Time is required');
      e.preventDefault();
    } else if (task_priority === '') {
      task_priority = 'normal';
    } else {
      // Get tasks from localStorage
      var tasks = JSON.parse(localStorage.getItem('tasks'));

      if (tasks === null) {
        tasks = [];
      }

      // New Task Object
      var newTask = {
        "id": id,
        "task": task,
        "task_priority": task_priority,
        "task_date": task_date,
        "task_time": task_time
      };

      tasks.push(newTask);
      localStorage.setItem('tasks', JSON.stringify(tasks));

      console.log('Task ' + newTask + ' added');
    }
  }

  // Function to update task
  function updateTask(e) {
    var id = $('#task-id').val();
    var task = $('#task').val();
    var task_priority = $('#priority').val();
    var task_date = $('#date').val();
    var task_time = $('#time').val();

    // Simple validation
    if (task === '') {
      alert('Task is required');
      e.preventDefault();
    } else if (task_date === '') {
      alert('Date is required');
      e.preventDefault();
    } else if (task_time === '') {
      alert('Time is required');
      e.preventDefault();
    } else if (task_priority === '') {
      task_priority = 'normal';
    } else {
      // Get tasks from localStorage
      var tasks = JSON.parse(localStorage.getItem('tasks'));

      for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id == id) {
          tasks[i].task = task;
          tasks[i].task_priority = task_priority;
          tasks[i].task_date = task_date;
          tasks[i].task_time = task_time;
          localStorage.setItem('tasks', JSON.stringify(tasks));    
          break;
        }
      }
    }
  }

  // Function to remove task
  function removeTask(id) {
    if (confirm('Are you sure you want to remove this task?')) {
      var taskList = JSON.parse(localStorage.getItem('tasks'));

      for (var i = 0; i < taskList.length; i++) {
        if (taskList[i].id == id) {
          taskList.splice(i, 1);
          localStorage.setItem('tasks', JSON.stringify(taskList));
          break;
        }
      }

      location.reload();
    }
  }

  // Function to clear all tasks
  function clearAllTasks() {
    if (confirm('Do you want to clear all tasks?')) {
      localStorage.removeItem('tasks');
      location.reload();
    }
  }
});

// Function for getting single task
function getTask() {
  var $_GET = getQueryParams(document.location.search);
  var id = $_GET.id;

  console.log('id=' + id);
  console.log('$_GET.id=' + $_GET.id);

  var taskList = JSON.parse(localStorage.getItem('tasks'));

  for (var i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      console.log("equal");
      $('#edit-task-form #task-id').val(taskList[i].id);
      $('#edit-task-form #task').val(taskList[i].task);
      $('#edit-task-form #priority').val(taskList[i].task_priority);
      $('#edit-task-form #date').val(taskList[i].task_date);
      $('#edit-task-form #time').val(taskList[i].task_time);
    }
  }
}

// Function to Get HTTP GET Requests
function getQueryParams(qs) {
  qs = qs.split("+").join(" ");
  var params = {},
  tokens,
  re = /[?&]?([^=]+)=([^&]*)/g;

  while (tokens = re.exec(qs)) {
    params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
  }

  return params;
}
