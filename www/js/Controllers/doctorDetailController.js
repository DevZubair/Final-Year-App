hospitalModule.controller('doctorDetailController', function($scope,$ionicPopup,$state,$ionicSideMenuDelegate,$http,hospitalFactory,$ionicBackdrop) {

  $ionicBackdrop.retain();

  $scope.ClinicID = localStorage.getItem('ClinicID');
  $scope.DoctorID = localStorage.getItem('DoctorID');
  $scope.appointmentCheckbox=false;
  $scope.appointmentToggle=false;
  var doctor = localStorage.getItem('Doctor');
  $scope.doctorName = JSON.parse(doctor);

  $scope.toggleLeft = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };
  // A confirm dialog
  $scope.showConfirm = function() {
    $scope.appointmentToggle = true;
    var confirmPopup = $ionicPopup.confirm({
      title: 'Appoint a number',
      template: 'Are you sure you want to appoint a number for this doctor?'
    });
    confirmPopup.then(function(res) {
      if(res) {
        console.log('You are sure');
        $state.go("contactPage");
      } else {
        console.log('You are not sure');
        $scope.appointmentCheckbox=false;
        $scope.appointmentToggle = false;
      }
    });
  };

  $http.post("https://fyp-server.herokuapp.com/getMachineDetail",{ClinicID:$scope.ClinicID, DoctorID:$scope.DoctorID}).then (function(response){

    if(response){
      console.log(response);
      $scope.drdetail = response.data.content;
      $ionicBackdrop.release();
    }

  },function(error){
    console.log(error);
    $ionicBackdrop.release();
  });
});

