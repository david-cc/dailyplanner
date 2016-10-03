$(document).ready(function(){
  $('#add-task-form').submit(function(e){
    addTask(e);
  });

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
});
