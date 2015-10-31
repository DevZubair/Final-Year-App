hospitalModule.controller('settingsController', function($scope,$ionicPopup,$state,$ionicSideMenuDelegate) {
  $scope.toggleLeft = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };

});

