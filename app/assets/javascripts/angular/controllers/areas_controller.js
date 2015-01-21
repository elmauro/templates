myApp.controller("AreaListCtr", ['$scope', '$http', '$resource', 'Areas', 'Area', 'Application', '$location', function($scope, $http, $resource, Areas, Area, Application, $location) {
   $scope.areas = Areas.query();
   $scope.applications = Application.query();

   $scope.deleteArea = function (areaId) {
    if (confirm("Are you sure you want to delete this area?")){
      Area.delete({ id: areaId }, function(){
        $scope.areas = Areas.query();
        $location.path('/areas');
      });
    }
  };
}]);


myApp.controller("AreaUpdateCtr", ['$scope', '$resource', 'Area', 'Application', '$location', '$routeParams', function($scope, $resource, Area, Application, $location, $routeParams) {
  $scope.area = Area.get({id: $routeParams.id})
  //$scope.applications = Application.query();

  $scope.applications = Application.query(function(){
        $scope.area.application_id = $scope.applications.filter(function (app) {
          return app.id == $scope.area.application_id;
        })[0];
  });

  $scope.update = function(){
    if($scope.area.application_id.id === undefined){
        $scope.area.application_id = null;
    }

    if ($scope.areaForm.$valid && $scope.area.application_id !== null){
      $scope.area.application_id = $scope.area.application_id.id
      Area.update({id: $scope.area.id},{area: $scope.area},function(){
        $location.path('/areas');
      }, function(error) {
        console.log(error)
      });
    }
  };
}]);

myApp.controller("AreaAddCtr", ['$scope', '$resource', 'Areas', 'Application', '$location', function($scope, $resource, Areas, Application, $location) {
  $scope.area = {}
  $scope.applications = Application.query();

  $scope.save = function () {
    if ($scope.areaForm.$valid){
      $scope.area.application_id = $scope.area.application_id.id
      Areas.create({area: $scope.area}, function(){
        $location.path('/areas');
      }, function(error){
        console.log(error)
      });
    }
  }
}]);