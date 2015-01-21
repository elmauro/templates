myApp.controller("ColumnListCtr", ['$scope', '$http', '$resource', 'Columns', 'Column', 'Table', '$location', function($scope, $http, $resource, Columns, Column, Table, $location) {
   $scope.columns = Columns.query();
   $scope.tables = Table.query();

   $scope.deleteColumn = function (columnId) {
    if (confirm("Are you sure you want to delete this column?")){
      Column.delete({ id: columnId }, function(){
        $scope.columns = Columns.query();
        $location.path('/columns');
      });
    }
  };
}]);


myApp.controller("ColumnUpdateCtr", ['$scope', '$resource', 'Column', 'Table', '$location', '$routeParams', function($scope, $resource, Column, Table, $location, $routeParams) {
  $scope.column = Column.get({id: $routeParams.id})
  
  $scope.tables = Table.query(function(){
        $scope.column.table_id = $scope.tables.filter(function (app) {
          return app.id == $scope.column.table_id;
        })[0];
  });

  $scope.update = function(){
    if($scope.column.table_id.id === undefined){
        $scope.column.table_id = null;
    }

    if ($scope.columnForm.$valid && $scope.column.table_id !== null){
      $scope.column.table_id = $scope.column.table_id.id
      Column.update({id: $scope.column.id},{column: $scope.column},function(){
        $location.path('/columns');
      }, function(error) {
        console.log(error)
      });
    }
  };
}]);

myApp.controller("ColumnAddCtr", ['$scope', '$resource', 'Columns', 'Table', '$location', function($scope, $resource, Columns, Table, $location) {
  $scope.column = {}
  $scope.tables = Table.query();

  $scope.save = function () {
    if ($scope.columnForm.$valid){
      $scope.column.table_id = $scope.column.table_id.id
      Columns.create({column: $scope.column}, function(){
        $location.path('/columns');
      }, function(error){
        console.log(error)
      });
    }
  }
}]);