hospitalModule.controller('appointmentDetailController', function($scope,$ionicPopup,$state,$ionicSideMenuDelegate,hospitalFactory, $http, Domain,$timeout) {
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
      subTitle: 'Please Rate our App',
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

});

