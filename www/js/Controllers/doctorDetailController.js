hospitalModule.controller('doctorDetailController', function($scope,$ionicPopup,$state,$ionicSideMenuDelegate,$http,hospitalFactory,$ionicBackdrop,Domain) {

  $scope.ClinicID = localStorage.getItem('ClinicID');
  $scope.DoctorID = localStorage.getItem('DoctorID');
  $scope.appointmentCheckbox=false;
  $scope.appointmentToggle=false;
  var doctor = localStorage.getItem('Doctor');
  $scope.doctorName = JSON.parse(doctor);

  var socket = io.connect(Domain);
  socket.on('connect', function(){

    console.log('Connected to socket');

  });

  socket.on('device_active', function (data) {
    console.log('updated');
    $scope.drdetail.CurrentNumber = data.nowServing;
    $scope.drdetail.WaitingPersons = data.inWaiting-1;
    $scope.$apply($scope.drdetail);
    if($scope.drdetail.CurrentNumber == localStorage.getItem('appointNumber')){
      $scope.showPopup();
    }
  });

  socket.on('appointmentAdded', function (data) {
    console.log(data);
    if(data.DoctorID ==  $scope.DoctorID){
      $scope.drdetail.WaitingPersons =  $scope.drdetail.WaitingPersons + 1;
      $scope.$apply($scope.drdetail);
    }

  });

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
//First of all we made doRefresh function which we will call when user pulls, see in html
  $scope.doRefresh = function() {
    $ionicBackdrop.retain();
    $http.post(Domain + "getMachineDetail",{ClinicID:$scope.ClinicID, DoctorID:$scope.DoctorID}).then (function(response){

      if(response){
        console.log(response);

        $scope.drdetail = response.data.content;
        $scope.drdetail.WaitingPersons = $scope.drdetail.WaitingPersons.length;

        $ionicBackdrop.release();}

    },function(error){
      console.log(error);
      $ionicBackdrop.release();
    });
    //This is the same API we are calling.
    $scope.$broadcast('scroll.refreshComplete'); //This line stops the refresh loader
  };

  $scope.doRefresh();  //we are calling this function when page loads here.
});

