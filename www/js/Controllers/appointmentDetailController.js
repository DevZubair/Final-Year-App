hospitalModule.controller('appointmentDetailController', function($scope,$ionicPopup,$state,$ionicSideMenuDelegate,hospitalFactory, $http, Domain) {
  $scope.toggleLeft = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };
  $scope.ClinicID = localStorage.getItem('ClinicID');
  $scope.DoctorID = localStorage.getItem('DoctorID');
  $scope.myNumber = localStorage.getItem('appointNumber');
  var doctor = localStorage.getItem('Doctor');
  $scope.doctorName = JSON.parse(doctor);
  var clinic = localStorage.getItem('Clinic');
  $scope.clinicName = JSON.parse(clinic);

  $http.post(Domain + "getMachineDetail",{ClinicID:$scope.ClinicID , DoctorID:$scope.DoctorID}).then (function(response){

    if(response){
      console.log(response);
      $scope.drdetail = response.data.content;
      $scope.drdetail.WaitingPersons = $scope.drdetail.WaitingPersons.length-1;
    }

  },function(error){
    console.log(error);
  });

  //Socket connection
  var socket = io.connect(Domain);
  socket.on('connect', function(){

    console.log('Connected to socket');

  });

  socket.on('device_active', function (data) {
    console.log('updated');
    $scope.drdetail.CurrentNumber = data.nowServing;
    $scope.drdetail.WaitingPersons = data.inWaiting-1;
    $scope.$apply($scope.drdetail);
  });
});

