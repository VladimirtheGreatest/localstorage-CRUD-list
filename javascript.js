(function() {

    'use strict';
  
    var lastId = 0;
    var taskWrapper = document.getElementById("creditsList");
    var btnSave = document.getElementById("create");
    var removeIcon;
    var updateIcon;
    var taskList;
    //need them to edit values dynamically
    var productionForEdit;
    var typeForEdit;
    var dateFromForEdit;
    var dateToForEdit;
  
    // Initialize taskList 
    // Add event to save button
    // Render the list
  
    function init() {
  
      if (!!(window.localStorage.getItem('credits'))) {
        taskList = JSON.parse(window.localStorage.getItem('credits'));
      } else {
        taskList = [];
      }
      btnSave.addEventListener('click', saveTask);
      showList();
    }
  
    //End Init
  
    //CRUD task
  
    function showList() {
  
      if (!!taskList.length) {
        getLastTaskId();
        for (var item in taskList) {
          var task = taskList[item];
          addTaskToList(task);
        }
        syncEvents();
      }
      
    }
  
    function saveTask(event) {
  
      var task = {
        taskId: lastId,
        productionName : document.getElementById("productionName").value,
        type : document.getElementById("type").value,
        dateFrom : document.getElementById("dateFrom").value,
        dateTo : document.getElementById("dateTo").value,
      };
      taskList.push(task);
      syncTask();
      addTaskToList(task);
      syncEvents();
      lastId++;
    }
  
    function addTaskToList(task) {
  
      var removeIcon = document.createElement('span');
      var element = document.createElement('li');
      var updateIcon = document.createElement('span');
      var creditInformation = document.createElement('div');
      let productionText = document.createElement('p');
      let typeText = document.createElement('p');
      let dateFromText = document.createElement('span');
      let dateToText = document.createElement('span');
      let dateSpan = document.createElement('span');

       //need them to edit values dynamically
       productionForEdit =  task.taskId+"production"
       typeForEdit = task.taskId+"type";
       dateFromForEdit = task.taskId+"dateFrom";
       dateToForEdit = task.taskId+"dateTo";

      productionText.innerHTML += task.productionName + "<br>" 
      productionText.setAttribute("id", productionForEdit);
      typeText.innerHTML += task.type + "<br>" 
      typeText.setAttribute("id", typeForEdit);
      dateFromText.innerHTML +=  task.dateFrom + "-"
      dateFromText.setAttribute("id", dateFromForEdit );
      dateToText.innerHTML += task.dateTo;
      dateToText.setAttribute("id", dateToForEdit);     

      dateSpan.appendChild(dateFromText);
      dateSpan.appendChild(dateToText);

      creditInformation.appendChild(productionText);
      creditInformation.appendChild(typeText);
      creditInformation.appendChild(dateSpan);

      removeIcon.innerHTML = "<i></i>";
      removeIcon.className = "remove_item clickeable fa fa-trash";
      removeIcon.setAttribute("title", "Remove");
  
      updateIcon.innerHTML = "<i></i>";
      updateIcon.className = "update_icon clickeable fa fa-edit";
      updateIcon.setAttribute("title", "Update");
  
     // element.innerHTML += task.productionName;
      element.appendChild(creditInformation);
      element.appendChild(updateIcon);
      element.appendChild(removeIcon);
      element.setAttribute("id", task.taskId);
      taskWrapper.appendChild(element);
    }
  
    function updateTask(event) {
  
      var taskTag = event.currentTarget.parentNode;
      var taskId = taskTag.id;
      var taskToUpdate = findTask(taskId).task;
      var pos = findTask(taskId).pos;
      if (!!taskToUpdate) {
        var productionEdited = prompt("Production Name", taskToUpdate.productionName);
        var typeEdited = prompt("Type", taskToUpdate.type);
        var dateFromEdited = prompt("Date From", taskToUpdate.dateFrom);
        var dateToEdited = prompt("Date To", taskToUpdate.dateTo);
        taskToUpdate.productionName = productionEdited;
        taskToUpdate.type = typeEdited;
        taskToUpdate.dateFrom = dateFromEdited;
        taskToUpdate.dateTo = dateToEdited;
        taskList[pos] = taskToUpdate;
        document.getElementById(taskId+"production").textContent = taskToUpdate.productionName;
        document.getElementById(taskId+"type").textContent = taskToUpdate.type;
        document.getElementById(taskId+"dateFrom").textContent = taskToUpdate.dateFrom;
        document.getElementById(taskId+"dateTo").textContent = taskToUpdate.dateTo;
      //  taskTag.lastChild.textContent = taskToUpdate.productionName;
        syncTask();
      }
    }
  
    function removeTask(event) {
  
      var taskToRemove = event.currentTarget.parentNode;
      var taskId = taskToRemove.id;
      taskWrapper.removeChild(taskToRemove);
      taskList.forEach(function(value, i) {
        if (value.taskId == taskId) {
          taskList.splice(i, 1);
        }
      })
  
      syncTask();
    }
  
    // End CRUD
  
  
    //Common
  
    function syncTask() {
  
      window.localStorage.setItem('credits', JSON.stringify(taskList));
      taskList = JSON.parse(window.localStorage.getItem('credits'));
    }
  
    function getLastTaskId() {
      var lastTask = taskList[taskList.length - 1];
      lastId = lastTask.taskId + 1;
    }
  
    function syncEvents() {
  
      updateIcon = document.getElementsByClassName("update_icon");
      removeIcon = document.getElementsByClassName("remove_item");
      if (!!removeIcon.length) {
        for (var i = 0; i < removeIcon.length; i++) {
          removeIcon[i].addEventListener('click', removeTask);
        }
      }
      if (!!updateIcon.length) {
        for (var j = 0; j < updateIcon.length; j++) {
          updateIcon[j].addEventListener('click', updateTask);
        }
      }
    }
  
    function findTask(id) {
  
      var response = {
        task: '',
        pos: 0
      };
      taskList.forEach(function(value, i) {
        if (value.taskId == id) {
          response.task = value;
          response.pos = i;
        }
      });
  
      return response;
    }
  
    //End Common
  
  
    init();
  
  
  })();

 console.log(localStorage);
   

  




  










