hospitalModule.controller('appointmentsListController', function($scope,MobileID,$ionicPopup,$state,$ionicSideMenuDelegate,$http,Domain,$ionicModal) {
  $scope.toggleLeft = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };
  var today = new Date();
  today.setHours(0,0,0,0);

  $scope.showSpinner = true;
  $scope.validation= false;
  $scope.rate =0;

  $scope.rating = 4;
  $scope.data = {
    rating : 1,
    max: 5
  };
  $scope.user = {
    comments : ''
  };
  $scope.current = true;
  $scope.MobileID = MobileID;

  $scope.getAppointmentsFunc = function () {

    $http.post(Domain + "getAllAppointments",{MobileID:$scope.MobileID}).then(function(response){

      if(response.data.code==200){
        console.log(response);
        $scope.appointments = response.data.content;

        $scope.showSpinner = false;
      }else{
        console.log(response);
        $scope.showSpinner = false;
        $scope.validation= true;
      }},function(error){
      console.log(error);
      $scope.showSpinner = false;
    });
  };
  $scope.getAppointmentsFunc();

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
    $scope.AppointmentID = device._id;
    localStorage.setItem('appointID',device._id);
    if(device.Past == true){
      $scope.ClinicID = device.ClinicID;
      $scope.DoctorID = device.DoctorID;
      $scope.showModal(device);
    }
    else{
      localStorage.setItem('ClinicID',device.ClinicID);
      localStorage.setItem('DoctorID',device.DoctorID);
      localStorage.setItem('appointNumber',device.AppointmentNumber);
      $state.go('appointmentDetail');
    }
  };

  $scope.getAppointments = function (num) {
    $scope.appointments = [];
    $scope.showSpinner = true;
    $scope.validation=false;

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
          $scope.validation= true;
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
          $scope.validation= true;
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
    console.log(detail);
    $scope.AppointmentID = detail._id;
    localStorage.setItem('appointID',detail._id);
    $scope.pastAppointment = detail;
    $scope.user.comments = $scope.pastAppointment.Reviews.comments;
    $scope.data.rating = $scope.pastAppointment.Reviews.stars;
    $scope.modal.show();
  };
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });

  $scope.$watch('data.rating', function() {
    // console.log('New value: '+ $scope.data.rating);
    $scope.rate = $scope.data.rating;
  });

  $scope.thanks = function() {

    $http.post(Domain + "addReview", {
      ClinicID: $scope.ClinicID,
      DoctorID: $scope.DoctorID,
      MobileID: $scope.MobileID,
      comments:$scope.user.comments,
      AppointID : $scope.AppointmentID,
      rating:$scope.rate

    }).then(function (response) {

      if (response) {
        console.log(response);
        if (response.data.code == 200) {
          $scope.getAppointmentsFunc();
          $scope.modal.hide();
        }
        else {
          $scope.getAppointmentsFunc();
          $scope.modal.hide();
        }
      }
    }, function (error) {
      console.log(error);
    });
  };
});

