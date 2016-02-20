hospitalModule.controller('homeController', function($scope,$ionicPlatform,MobileID,$ionicPopup,$state,$ionicBackdrop,$ionicSideMenuDelegate,hospitalFactory, $http, Domain ) {

    $scope.toggleLeft = function () {
        $ionicSideMenuDelegate.toggleLeft();
    };




});