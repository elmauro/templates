  myApp.controller('countryController', ['$scope', 'Upload',
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
      $scope.country = {};
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
          url: '/api/countries/import',
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

    $scope.edit = function(country) {
      $scope.showForm(true);
      $scope.Action = 'Edit Country';
      $scope.showMessage = false;
      $scope.country = country;
    };

    $scope.delete = function(objet){
    };

    $scope.new = function(){
      $scope.showForm(true);
      $scope.Action = 'New Country';
    };

    $scope.cancel = function(){
      $scope.showForm(false);
    };

    $scope.save = function(object) {
    };

    $scope.getAll = function(){
      $scope.countryList = [
        {
          "idCountry": "1",
          "strName": "Colombia",
          "strCode": "57",
          "active" : true
        },
        {
          "idCountry": "2",
          "strName": "Estados Unidos",
          "strCode": "1",
          "active" : true
        }
      ];
    };

    $scope.search = function(){

      if($scope.country.filter === ''){
        $scope.getAll();
      }
      else{
      }
    };

    $scope.initialize();
}]);