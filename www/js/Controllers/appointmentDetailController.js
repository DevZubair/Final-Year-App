hospitalModule.controller('appointmentDetailController', function($scope,$ionicPopup,$state,$ionicSideMenuDelegate) {
  $scope.toggleLeft = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };


});

