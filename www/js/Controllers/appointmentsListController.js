hospitalModule.controller('appointmentsListController', function($scope,$ionicPopup,$state,$ionicSideMenuDelegate) {
  $scope.toggleLeft = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };


});

