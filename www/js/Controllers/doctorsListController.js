hospitalModule.controller('doctorsListController', function($scope,$ionicPopup,$state,$ionicSideMenuDelegate,hospitalFactory,$http,Domain) {
  $scope.toggleLeft = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };

  $scope.cross='';
  $scope.validation=false;
  $scope.clearSearch= function () {
    $scope.cross='';
  };

  $scope.refreshAll= function () {
    $http.post(Domain + "getClinicDoctors",{ClinicID:$scope.ID}).then (function(response){

      if(response){
        console.log(response);
        if(response.data.code==200) {
          $scope.drarray = response.data.content;
          console.log('++++++++++++++++++++ DARRAY : +++++++++++++++++++++');
          console.log($scope.drarray);
          $scope.showSpinner = false;
        }
        else {
          $scope.validation=true;
          $scope.showSpinner = false
        }
      }
    },function(error){
      console.log(error);
      $scope.showSpinner = false;
    });
  };

  $scope.showSpinner = true;
  $scope.ID = localStorage.getItem('ClinicID');

  $http.post(Domain + "getClinicDoctors",{ClinicID:$scope.ID}).then (function(response){

    if(response){
      console.log(response);
      if(response.data.code==200){
        $scope.drarray = response.data.content;
        console.log('++++++++++++++++++++ DARRAY : +++++++++++++++++++++');
        console.log($scope.drarray);
        $scope.showSpinner = false;
      }
      else {
        $scope.validation=true;
        $scope.showSpinner = false

      }
    }


  },function(error){
    console.log(error);
    $scope.showSpinner = false;
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



