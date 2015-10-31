hospitalModule.controller('contactPageController', function($scope,$ionicPopup,$state,$ionicSideMenuDelegate) {

  $scope.toggleLeft = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };

});

