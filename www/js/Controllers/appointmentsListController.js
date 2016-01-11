hospitalModule.controller('appointmentsListController', function($scope,$ionicPopup,$state,$ionicSideMenuDelegate,$http,Domain,$ionicModal) {
  $scope.toggleLeft = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };

  $scope.showSpinner = true;
  $scope.current = true;
  $scope.MobileID = "ABCDSSDSDS45";

  $http.post(Domain + "getAllAppointments",{MobileID:$scope.MobileID}).then(function(response){

    if(response.data.code==200){
      console.log(response);
      $scope.appointments = response.data.content;
      $scope.showSpinner = false;
    }else{
      console.log(response);
      $scope.showSpinner = false;
    }},function(error){
    console.log(error);
    $scope.showSpinner = false;
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
      if(data.nowServing == $scope.appointments[___Realtime].AppointmentNumber){
        $scope.appointments[___Realtime].Past = true;
        $scope.$apply($scope.appointments);
      }
    }
  });

  $scope.appointmentDetail = function (device) {
    if(device.Past == true){
      $scope.showModal(device);
    }else{
      localStorage.setItem('ClinicID',device.ClinicID);
      localStorage.setItem('DoctorID',device.DoctorID);
      localStorage.setItem('appointNumber',device.AppointmentNumber);
      $state.go('appointmentDetail');
    }
  };

  $scope.getAppointments = function (num) {
    $scope.appointments = [];
    $scope.showSpinner = true;

    if(num==0){

      $scope.current = true;
      $http.post(Domain + "getAllAppointments",{MobileID:$scope.MobileID}).then(function(response){

        if(response.data.code==200){
          console.log(response);
          $scope.appointments = response.data.content;
          $scope.showSpinner = false;
        }else{
          console.log(response);
          $scope.showSpinner = false;
        }},function(error){
        console.log(error);
        $scope.showSpinner = false;
      });
    }
    else{

      $scope.current = false;
      $http.post(Domain + "getPastAppointments",{MobileID:$scope.MobileID}).then(function(response){

        if(response.data.code==200){
          console.log(response);
          $scope.appointments = response.data.content;
          $scope.showSpinner = false;
        }else{
          console.log(response);
          $scope.showSpinner = false;
        }},function(error){
        console.log(error);
        $scope.showSpinner = false;
      });
    }
  };

  // Modal for past appointment detail

  $ionicModal.fromTemplateUrl('my-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.showModal = function (detail) {
    $scope.pastAppointment = detail;
    $scope.modal.show();
  };
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
});

