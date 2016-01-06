hospitalModule.controller('doctorsListController', function($scope,$ionicPopup,$state,$ionicSideMenuDelegate,hospitalFactory,$http,Domain) {
  $scope.toggleLeft = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };

  $scope.ID = hospitalFactory.returnClinic();


  $http.post(Domain + "getClinicDoctors",{ClinicID:$scope.ID}).then (function(response){

    if(response){
      console.log(response);
      $scope.drarray = response.data.content;
      console.log('++++++++++++++++++++ DARRAY : +++++++++++++++++++++')
      console.log($scope.drarray);

    }

  },function(error){
    console.log(error);
  });

  $scope.sendDoctorDetail = function(data){
    hospitalFactory.getterDoctor(data);
    $state.go('doctorDetail');
  };

  var socket = io.connect(Domain);
  socket.on('connect', function(){

    console.log('Connected to socket');

  });

  socket.on('doctorOnlineStatus', function (data) {
    console.log('Doctor :' + data.doctorID +' status is ' + data.status);
    var ___Realtime = $scope.drarray.map(function (item) {
      return item._id
    }).indexOf(data.doctorID);
    if(___Realtime >=0){
      $scope.drarray[___Realtime].Status = true;
      $scope.$apply($scope.drarray);
    }
  });

  socket.on('doctorOfflineStatus', function (data) {
    console.log('Doctor :' + data.doctorID +' status is ' + data.status);
    var ___Realtime = $scope.drarray.map(function (item) {
      return item._id
    }).indexOf(data.doctorID);
    if(___Realtime >=0){
      $scope.drarray[___Realtime].Status = false;
      $scope.$apply($scope.drarray);
    }
  });
});



