hospitalModule.controller('clinicsListController', function($scope,$ionicPopup,$state,$ionicSideMenuDelegate) {
  $scope.toggleLeft = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };

});

