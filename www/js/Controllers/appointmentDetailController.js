hospitalModule.controller('appointmentDetailController', function($scope,$ionicPopup,$state,MobileID, $ionicSideMenuDelegate,hospitalFactory, $http, Domain,$timeout) {
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

  $scope.AppointmentID = localStorage.getItem('appointID');

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
    if($scope.drdetail.CurrentNumber == $scope.myNumber){
      $scope.showPopup();
    }
  });


// Triggered on a button click, or some other target
  $scope.showPopup = function() {
    $scope.data = {};

    // An elaborate, custom popup
    var myPopup = $ionicPopup.show({
      template: '',
      title: 'Number served',
      subTitle: 'Please rate our App',
      scope: $scope,
      buttons: [
        { text: 'Leave',
          onTap: function(e) {
            $state.go('appointmentsList');
          }},
        {
          text: '<b>Rate</b>',
          type: 'button-positive',
          onTap: function(e) {

            $state.go('thanksPage');
          }
        }
      ]
    });

    myPopup.then(function(res) {
      console.log('Tapped!', res);
    });
  };

  $scope.showReschedule = function() {
    $http.post(Domain + "getMachineDetail",{ClinicID:$scope.ClinicID , DoctorID:$scope.DoctorID}).then (function(response){

      if(response.data.code==200){
        $scope.rescheduleNumber = response.data.content.TotalAppointments + 1;
        var confirmPopup = $ionicPopup.confirm({
          title: 'Reschedule Appointment',
          template: 'Are you sure you want reschedule your appointment?'
        });

        confirmPopup.then(function(res) {
          if(res) {
            console.log('You are sure');
            confirmPopup.close();
            $scope.confirmation($scope.rescheduleNumber);

          } else {
            console.log('You are not sure');
          }
        });
      }
      else{
        $scope.alertFunct();
      }

    },function(error){
      console.log(error);
      $scope.alertFunct();

    });

  };
  $scope.confirmation = function(number) {

    var confirmPopup = $ionicPopup.confirm({
      title: 'Your next number will be' + number,
      template: 'Are you sure you want schedule your appointment?'
    });

    confirmPopup.then(function(res) {
      if(res) {
        console.log('You are sure');
        $http.post(Domain + "rescheduleNumber",{ClinicID:$scope.ClinicID , DoctorID:$scope.DoctorID , MobileID:MobileID, AppointID:$scope.AppointmentID }).then (function(response){

          if(response.data.code==200){
            localStorage.setItem('appointNumber', response.data.content);
            $scope.myNumber=response.data.content;
          }
          else{
            confirmPopup.close();
            $scope.alertFunct();
          }

        },function(error){
          console.log(error);
          confirmPopup.close();
          $scope.alertFunct();

        });
      } else {
        console.log('You are not sure');
      }
    });
  };
  $scope.showCancel = function() {
    console.log('efefge');
    var confirmPopup = $ionicPopup.confirm({
      title: 'Cancel Appointment',
      template: 'Are you sure you want cancel your appointment?'
    });

    confirmPopup.then(function(res) {
      if(res) {
        console.log('You are sure');
        $http.post(Domain + "cancelNumber",{ClinicID:$scope.ClinicID , DoctorID:$scope.DoctorID , MobileID:MobileID, AppointID:$scope.AppointmentID }).then (function(response){

          if(response.data.code==200){
            $state.go('clinicsList');
          }
          else{
            confirmPopup.close();
            $scope.alertFunct();
          }

        },function(error){
          console.log(error);
          confirmPopup.close();
          $scope.alertFunct();

        });


      } else {
        console.log('You are not sure');
      }
    });
  };
  $scope.alertFunct=function(){
    var alertPopup = $ionicPopup.alert({
      title: 'Sorry!',
      template: 'Sorry for the inconvenience '
    });

    alertPopup.then(function(res) {
      console.log('error');
    });

  }

});
