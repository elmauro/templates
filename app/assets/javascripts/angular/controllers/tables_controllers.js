myApp.controller("TableListCtr", ['$scope', '$http', '$resource', 'Tables', 'Table', '$location', function($scope, $http, $resource, Tables, Table, $location) {
   $scope.tables = Tables.query();

   $scope.deleteTable = function (tableId) {
    if (confirm("Are you sure you want to delete this table?")){
      Table.delete({ id: tableId }, function(){
        $scope.tables = Tables.query();
        $location.path('/tables');
      });
    }
  };
}]);

myApp.controller("TableUpdateCtr", ['$scope', '$resource', 'Table', '$location', '$routeParams', function($scope, $resource, Table, $location, $routeParams) {
  $scope.table = Table.get({id: $routeParams.id})
  $scope.update = function(){
    if ($scope.tableForm.$valid){
      Table.update({id: $scope.table.id},{table: $scope.table},function(){
        $location.path('/tables');
      }, function(error) {
        console.log(error)
      });
    }
  };
}]);

myApp.controller("TableAddCtr", ['$scope', '$resource', 'Tables', '$location', function($scope, $resource, Tables, $location) {
  $scope.table = {}
  $scope.save = function () {
    if ($scope.tableForm.$valid){
      Tables.create({table: $scope.table}, function(){
        $location.path('/tables');
      }, function(error){
        console.log(error)
      });
    }
  }
}]);