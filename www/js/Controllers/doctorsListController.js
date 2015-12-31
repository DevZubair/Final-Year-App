hospitalModule.controller('doctorsListController', function($scope,$ionicPopup,$state,$ionicSideMenuDelegate,hospitalFactory,$http) {
  $scope.toggleLeft = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };

  $scope.ID = hospitalFactory.returnClinic();

  $http.post("https://fyp-server.herokuapp.com/getClinicDoctors",{ClinicID:$scope.ID}).then (function(response){

    if(response){
      console.log(response);
      $scope.drarray = response.data.content;
    }

  },function(error){
    console.log(error);
  });
});



