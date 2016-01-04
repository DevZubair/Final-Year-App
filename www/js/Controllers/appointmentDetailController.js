hospitalModule.controller('appointmentDetailController', function($scope,$ionicPopup,$state,$ionicSideMenuDelegate,hospitalFactory, $http, Domain) {
  $scope.toggleLeft = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };
    $scope.ClinicID = hospitalFactory.returnClinic();
    $scope.DoctorID = localStorage.getItem('DoctorID');
    $scope.myNumber = localStorage.getItem('appointNumber')

    $http.post(Domain + "getMachineDetail",{ClinicID:$scope.ClinicID , DoctorID:$scope.DoctorID}).then (function(response){

        if(response){
            console.log(response);
            $scope.drdetail = response.data.content;
        }

    },function(error){
        console.log(error);
    });

});

