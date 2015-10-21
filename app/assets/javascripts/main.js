var myApp = angular.module('myapplication', ['ngRoute', 'ngResource','ui.bootstrap', 'ngMessages', 'ngFileUpload']); 

function HeaderController($scope, $location) 
{ 
    $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };

    $scope.isCollapsed = true;
}

//Routes
myApp.config([
  '$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/applications',{
      templateUrl: '/templates/applications/index.html',
      controller: 'ApplicationListCtr'
    });
    $routeProvider.when('/applications/new',{
      templateUrl: '/templates/applications/new.html',
      controller: 'ApplicationAddCtr'
    });
    $routeProvider.when('/applications/:id/edit', {
      templateUrl: '/templates/applications/edit.html',
      controller: "ApplicationUpdateCtr"
    });
    $routeProvider.when('/areas',{
      templateUrl: '/templates/areas/index.html',
      controller: 'AreaListCtr'
    });
    $routeProvider.when('/areas/new',{
      templateUrl: '/templates/areas/new.html',
      controller: 'AreaAddCtr'
    });
    $routeProvider.when('/areas/:id/edit', {
      templateUrl: '/templates/areas/edit.html',
      controller: "AreaUpdateCtr"
    });
    $routeProvider.when('/tables',{
      templateUrl: '/templates/tables/index.html',
      controller: 'TableListCtr'
    });
    $routeProvider.when('/tables/new',{
      templateUrl: '/templates/tables/new.html',
      controller: 'TableAddCtr'
    });
    $routeProvider.when('/tables/:id/edit', {
      templateUrl: '/templates/tables/edit.html',
      controller: "TableUpdateCtr"
    });
    $routeProvider.when('/columns',{
      templateUrl: '/templates/columns/index.html',
      controller: 'ColumnListCtr'
    });
    $routeProvider.when('/columns/new',{
      templateUrl: '/templates/columns/new.html',
      controller: 'ColumnAddCtr'
    });
    $routeProvider.when('/columns/:id/edit', {
      templateUrl: '/templates/columns/edit.html',
      controller: "ColumnUpdateCtr"
    });
    $routeProvider.when('/users',{
      templateUrl: '/templates/users/index.html',
      controller: 'UserListCtr'
    });
    $routeProvider.when('/users/new', {
      templateUrl: '/templates/users/new.html',
      controller: 'UserAddCtr'
    });
    $routeProvider.when('/users/:id/edit', {
      templateUrl: '/templates/users/edit.html',
      controller: "UserUpdateCtr"
    });
    $routeProvider.otherwise({
      templateUrl: '/templates/index.html',
    });
  }
]);
