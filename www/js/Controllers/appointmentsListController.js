hospitalModule.controller('appointmentsListController', function($scope,$ionicPopup,$state,$ionicSideMenuDelegate,$http,Domain) {
  $scope.toggleLeft = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };
  //Socket connection
  var socket = io.connect(Domain);
  socket.on('connect', function(){
    console.log('Connected to socket');
  });

  $scope.MobileID = "ABCDEFGHIJK123245";

  $http.post(Domain + "getAllAppointments",{MobileID:$scope.MobileID}).then (function(response){

    if(response){
      console.log(response);
      $scope.appointments = response.data.content;

    }},function(error){
    console.log(error);
  });

  $scope.appointmentDetail = function (device) {
    localStorage.setItem('ClinicID',device.ClinicID);
    localStorage.setItem('DoctorID',device.DoctorID);
    localStorage.setItem('appointNumber',device.AppointmentNumber);
    $state.go('appointmentDetail');
  }
});

