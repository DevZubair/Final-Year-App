hospitalModule.controller('appointmentsListController', function($scope,$ionicPopup,$state,$ionicSideMenuDelegate,$http,Domain) {
    $scope.toggleLeft = function () {
        $ionicSideMenuDelegate.toggleLeft();
    };
    $scope.allAppointments = [];

    $http.post(Domain + "getAllAppointments",{MobileID : "HBDSWQWSDEaaFRGTHYJ"}).then (function(response){

        if(response){
            console.log(response);
            if (response.data.code == 200){
                $scope.allAppointments = response.data.content;
            }
        }
    },function(error){
        console.log(error);
    });
});

