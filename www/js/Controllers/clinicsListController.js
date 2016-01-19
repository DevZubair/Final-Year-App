hospitalModule.controller('clinicsListController', function($scope,$ionicBackdrop, $ionicPopup,$state,$ionicSideMenuDelegate,$http,hospitalFactory,Domain) {
    $scope.toggleLeft = function () {
        $ionicSideMenuDelegate.toggleLeft();
    };
    $scope.showSpinner = true;
    $scope.cross='';
    $scope.validation=false;


    $scope.clearSearch= function () {
        $scope.cross='';
    };

    $scope.refreshAll= function () {
        $ionicBackdrop.retain();
        $http.get(Domain + 'getAllClinics').then(function(response) {
                if(response){

                    console.log(response);
                    $scope.allClinics = response.data.content;
                    $ionicBackdrop.release();
                    $scope.showSpinner = false;
                }},
            function(error){
                console.log(error);
                $ionicBackdrop.release();
                $scope.showSpinner = false;
            });
    };


    $http.get(Domain + 'getAllClinics').then(function(response) {
        if(response){
            console.log(response);
            if(response.data.code==200) {
                $scope.allClinics = response.data.content;
                $scope.showSpinner = false;
                $scope.validation=false;
            }
            else{
                $scope.validation=true;
                $scope.showSpinner = false

            }

        }},function(error){
        console.log(error);
        $scope.showSpinner = false;


    });
    $scope.changeState=function(clinic)
    {
        hospitalFactory.getterName(clinic);
        $state.go('doctorsList');
    };


});
