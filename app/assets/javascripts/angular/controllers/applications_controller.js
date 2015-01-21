myApp.controller("ApplicationListCtr", ['$scope', '$http', '$resource', 'Applications', 'Application', '$location', function($scope, $http, $resource, Applications, Application, $location) {
   $scope.applications = Applications.query();

   $scope.deleteApplication = function (applicationId) {
    if (confirm("Are you sure you want to delete this application?")){
      Application.delete({ id: applicationId }, function(){
        $scope.applications = Applications.query();
        $location.path('/applications');
      });
    }
  };
}]);

myApp.controller("ApplicationUpdateCtr", ['$scope', '$resource', 'Application', '$location', '$routeParams', function($scope, $resource, Application, $location, $routeParams) {
  $scope.application = Application.get({id: $routeParams.id})
  $scope.update = function(){
    if ($scope.applicationForm.$valid){
      Application.update({id: $scope.application.id},{application: $scope.application},function(){
        $location.path('/applications');
      }, function(error) {
        console.log(error)
      });
    }
  };
}]);

myApp.controller("ApplicationAddCtr", ['$scope', '$resource', 'Applications', '$location', function($scope, $resource, Applications, $location) {
  $scope.application = {}
  $scope.save = function () {
    if ($scope.applicationForm.$valid){
      Applications.create({application: $scope.application}, function(){
        $location.path('/applications');
      }, function(error){
        console.log(error)
      });
    }
  }
}]);