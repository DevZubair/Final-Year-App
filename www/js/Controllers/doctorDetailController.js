hospitalModule.controller('doctorDetailController', function($scope,$ionicPopup,$state) {

  $scope.appointmentCheckbox=false;
  $scope.appointmentToggle=false;

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
        $state.go("appointmentDetail");
      } else {
        console.log('You are not sure');
        $scope.appointmentCheckbox=false;
        $scope.appointmentToggle = false;
      }
    });
  };


});

