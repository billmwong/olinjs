var app = angular.module('todo', ["ngRoute"]);

var handleError = function(err) {
  console.log("Error: "+ err)
}

app.controller("mainController", function ($scope, $http) {
  $scope.formData = {};

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

  $scope.deleteTodo = function (todo, index) {
    $http.post('api/todos/delete', todo)
      .success(function (newTodos) {
        $scope.todos = newTodos;  
      })
      .error(handleError);
  };

  $scope.toggleComplete = function(id) {
    $http.post('api/todos/toggleComplete', {id: id})
      .success(function (newTodos) {
        $scope.todos = newTodos;  
      })
      .error(handleError);
  };
});
