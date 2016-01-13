hospitalModule.controller('ThanksController', function($scope,$ionicPopup,$state,$ionicSideMenuDelegate,hospitalFactory,$http,Domain,MobileID) {
  $scope.toggleLeft = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };
  $scope.ClinicID = localStorage.getItem('ClinicID');
  $scope.DoctorID = localStorage.getItem('DoctorID');
  $scope.AppointmentID = localStorage.getItem('AppointmentID');
  $scope.MobileID = MobileID;

  $scope.myComments= '';
  $scope.rate =0;

  $scope.rating = 4;
  $scope.data = {
    rating : 1,
    max: 5
  };

  $scope.$watch('data.rating', function() {
    console.log('New value: '+ $scope.data.rating);
    $scope.rate = $scope.data.rating;
  });

  $scope.thanks = function() {

    $http.post(Domain + "addReview", {
      ClinicID: $scope.ClinicID,
      DoctorID: $scope.DoctorID,
      MobileID: $scope.MobileID,
      comments:$scope.myComments,
      AppointID : $scope.AppointmentID,
      rating:$scope.rate

    }).then(function (response) {

      if (response) {
        console.log(response);
        if (response.data.code == 200) {
          $state.go('clinicsList');
        }
        else {
          $state.go('clinicsList');
        }
      }
    }, function (error) {
      console.log(error);

    });
  };

});



