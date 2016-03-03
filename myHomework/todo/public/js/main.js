var app = angular.module('todo', ["ngRoute"]);

var handleError = function(err) {
  console.log("Error: "+ err)
}

app.controller("mainController", function ($scope, $http) {
  $scope.formData = {};
  $scope.editInputs = {};

  $http.get('/api/todos')
    .success(function(todos) {
      $scope.todos = todos;
    })
    .error(handleError);

  $scope.newTodo = function() {
    $http.post('/api/todos/new', $scope.formData)
      .success(function(thisTodo) {
        // CLear the form and update the todos
        $scope.formData = {};
        $scope.todos.push(thisTodo);
      })
      .error(handleError);
  };

  $scope.deleteTodo = function (todo) {
    $http.post('api/todos/delete', todo)
      .success(function (newTodos) {
        $scope.todos = newTodos;  
      })
      .error(handleError);
  };

  $scope.toggleComplete = function (id) {
    $http.post('api/todos/toggleComplete', {id: id})
      .success(function (newTodos) {
        $scope.todos = newTodos;  
      })
      .error(handleError);
  };

  $scope.openEdit = function (id, text) {
    // Make the edit input show the current text
    $scope.editInputs[id] = text
  };

  $scope.editTodo = function (id) {
    // Edit the text of the mongo entry
    $http.post('api/todos/edit', {
      id: id,
      newText: $scope.editInputs[id]
    })
      .success(function (newTodos) {
        $scope.todos = newTodos;  
      })
      .error(handleError);
  };

});
