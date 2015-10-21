myApp.controller('enterpriseController', ['$scope', 'Upload',
  function ($scope, Upload) {

    $scope.range = function(min, max, step){
      step = step || 1;
      var input = [];
      for (var i = min; i <= max; i += step) input.push(i);
      return input;
    };

    $scope.showForm = function(show){
      if(show){
        $scope.viewForm = true;
        $scope.showList = false;
      }
      else{
        $scope.viewForm = false;
        $scope.showList = true;
      }
    }

    $scope.initialize = function() {
      $scope.enterprise = {};
      $scope.showForm(false);
      $scope.showPaginate = true;
      $scope.pages = 1;
      $scope.getAll();
    };

    $scope.$watch('files', function () {
      $scope.upload($scope.files);
    });

    $scope.upload = function (files) {
      if (files && files.length) {
        Upload.upload({
          url: '/api/enterprises/import',
          method: 'POST',
          file: files
        })
        .success(function () {
          getUsers();
        });
      }
    };

    $scope.get = function() {
    };

    $scope.edit = function(enterprise) {
      $scope.showForm(true);
      $scope.Action = 'Edit Enterprise';
      $scope.showMessage = false;
      $scope.enterprise = enterprise;
    };

    $scope.delete = function(objet){
    };

    $scope.new = function(){
      $scope.showForm(true);
      $scope.Action = 'New Enterprise';
    };

    $scope.cancel = function(){
      $scope.showForm(false);
    };

    $scope.save = function(object) {
    };

    $scope.getAll = function(){
      $scope.enterpriseList = [
        {
          "idEnterprise": "1",
          "strCodeNumber": "1-555-456-23N",
          "strName": "Yuxi pacific",
          "active" : true
        },
        {
          "idEnterprise": "2",
          "strCodeNumber": "1-543-456-23M",
          "strName": "SUMMAN S.A.S",
          "active" : true
        }
      ];
    };

    $scope.search = function(){

      if($scope.enterprise.filter === ''){
        $scope.getAll();
      }
      else{
      }
    };

    $scope.initialize();
}]);