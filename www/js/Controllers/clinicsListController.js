hospitalModule.controller('clinicsListController', function($scope,$ionicPopup,$state,$ionicSideMenuDelegate,$http,hospitalFactory) {
  $scope.toggleLeft = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };

  $http.get('https://fyp-server.herokuapp.com/getAllClinics').then(function(response) {
    if(response){
      console.log(response);
      $scope.allClinics = response.data.content;
    }},function(error){
    console.log(error);
  });

  $scope.changeState=function(id)
  {
    hospitalFactory.getterName(id);
    $state.go('doctorsList');
  };
});
