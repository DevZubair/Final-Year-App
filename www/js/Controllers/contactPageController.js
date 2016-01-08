hospitalModule.controller('contactPageController', function($scope,$ionicPopup,$state,$ionicSideMenuDelegate,hospitalFactory, $http, Domain ) {

  $scope.toggleLeft = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };
  $scope.ClinicID =  localStorage.getItem('ClinicID');
  $scope.DoctorID = localStorage.getItem('DoctorID');
  $scope.MobileID = 'ABCDSSDSDS45';
  $scope.PatientFirstName = '';
  $scope.PatientLastName = '';
  $scope.PatientAge = '';
  $scope.PatientGender= '';

  $scope.doctorName = localStorage.getItem('Doctor');
  var doctor = JSON.parse($scope.doctorName);

  $scope.clinicName = localStorage.getItem('Clinic');
  var clinic = JSON.parse($scope.clinicName);

  $scope.appoint=function(){
    $http.post(Domain + "addAppointment",
      {
        ClinicID:$scope.ClinicID,
        MobileID : $scope.MobileID,
        DoctorID:$scope.DoctorID,
        PatientFirstName : $scope.PatientFirstName,
        PatientLastName :  $scope.PatientLastName,
        PatientAge :  $scope.PatientAge,
        Gender : $scope.PatientGender,
        DoctorName : doctor.DoctorFirstName + ' ' + doctor.DoctorLastName,
        ClinicName : clinic.Name

      }).then (function(response){

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
  };

  $scope.sendDoctorDetail = function(data){
    hospitalFactory.getterDoctor(data);
    $state.go('doctorDetail');
  }
});

