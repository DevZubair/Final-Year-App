hospitalModule.controller('appointmentsListController', function($scope,$ionicPopup,$state,$ionicSideMenuDelegate,$http,Domain) {
  $scope.toggleLeft = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };

  $scope.MobileID = "ABCDSSDSDS45";
  $http.post(Domain + "getAllAppointments",{MobileID:$scope.MobileID}).then (function(response){

    if(response.data.code==200){
      console.log(response);
      $scope.appointments = response.data.content;

    }else{
      console.log(response);
    }},function(error){
    console.log(error);
  });

  //Socket connection
  var socket = io.connect(Domain);
  socket.on('connect', function(){
    console.log('Connected to socket');
  });

  socket.on('device_active', function (data) {
    console.log('Doctor :' + data.doctorID +'called pulse counter');
    var ___Realtime = $scope.appointments.map(function (item) {
      return item.DoctorID
    }).indexOf(data.doctorID);
    if(___Realtime >=0){
      $scope.appointments[___Realtime].DeviceNumber = data.nowServing;
      $scope.$apply($scope.appointments);
    }
  });

  $scope.appointmentDetail = function (device) {
    localStorage.setItem('ClinicID',device.ClinicID);
    localStorage.setItem('DoctorID',device.DoctorID);
    localStorage.setItem('appointNumber',device.AppointmentNumber);
    $state.go('appointmentDetail');
  }
});

