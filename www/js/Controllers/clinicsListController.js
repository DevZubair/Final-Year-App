hospitalModule.controller('clinicsListController', function($scope,$ionicPopup,$state,$ionicSideMenuDelegate,$http,hospitalFactory,Domain) {
  $scope.toggleLeft = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };
  $scope.showSpinner = true;
  $scope.cross='';

  $scope.clearSearch= function () {
    $scope.cross='';
  };

  $http.get(Domain + 'getAllClinics').then(function(response) {
    if(response){
      console.log(response);
      if(response.data.code == 200){
        $scope.allClinics = response.data.content;
        $scope.showSpinner = false;
      }
      else{

      }

    }},function(error){
    console.log(error);
    $scope.showSpinner = false;
  });

  $scope.changeState=function(clinic)
  {
    hospitalFactory.getterName(clinic);
    $state.go('doctorsList');
  };
});
