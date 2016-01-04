hospitalModule.controller('contactPageController', function($scope,$ionicPopup,$state,$ionicSideMenuDelegate,hospitalFactory, $http, Domain ) {

  $scope.toggleLeft = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };
    $scope.ClinicID = hospitalFactory.returnClinic();
    $scope.DoctorID = localStorage.getItem('DoctorID');
    $scope.PatientFirstName = '';
    $scope.PatientLastName = '';
    $scope.PatientAge = '';
    $scope.PatientGender= '';

    $scope.appoint=function(){
        $http.post(Domain + "addAppointment",{ClinicID:$scope.ClinicID, MobileID : "HBDSWQWSDEaaFRGTHYJ" , DoctorID:$scope.DoctorID ,
            PatientFirstName : $scope.PatientFirstName , PatientLastName :  $scope.PatientLastName, PatientAge :  $scope.PatientAge,
            Gender : $scope.PatientGender}).then (function(response){

            if(response){
                console.log(response);
                 if (response.data.code == 200){
                     localStorage.setItem('appointNumber',response.data.AppointmentNumber);
                     $state.go('appointmentDetail')
                 }
            }

        },function(error){
            console.log(error);
        });
    }


    $scope.sendDoctorDetail = function(data){
        hospitalFactory.getterDoctor(data);
        $state.go('doctorDetail');
    }
});

