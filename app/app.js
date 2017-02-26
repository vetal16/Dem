var app = angular.module('EYE', ['ngRoute']);

app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/templates/main.html',
      controller: 'MainCtrl',
      controllerAs: 'vm'
    });
});
