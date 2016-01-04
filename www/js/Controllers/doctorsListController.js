hospitalModule.controller('doctorsListController', function($scope,$ionicPopup,$state,$ionicSideMenuDelegate,hospitalFactory,$http,Domain) {
  $scope.toggleLeft = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };

  $scope.ID = hospitalFactory.returnClinic();

  $http.post(Domain + "getClinicDoctors",{ClinicID:$scope.ID}).then (function(response){

    if(response){
      console.log(response);
      $scope.drarray = response.data.content;
    }

  },function(error){
    console.log(error);
  });

    $scope.sendDoctorDetail = function(data){
        hospitalFactory.getterDoctor(data);
        $state.go('doctorDetail');
    }
});



