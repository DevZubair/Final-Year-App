hospitalModule.controller('doctorDetailController', function($scope,$ionicPopup,$state,$ionicSideMenuDelegate) {

  $scope.appointmentCheckbox=false;
  $scope.appointmentToggle=false;
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


});

