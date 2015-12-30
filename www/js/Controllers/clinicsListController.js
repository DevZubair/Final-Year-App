hospitalModule.controller('clinicsListController', function($scope,$ionicPopup,$state,$ionicSideMenuDelegate,$http,hospitalFactory) {
    $scope.toggleLeft = function () {
        $ionicSideMenuDelegate.toggleLeft();
    };

    /*$scope.allClinics=[{

     name: "Aziz medicare",
     location: "Garden"
     },
     {
     name: "Diagnostic",
     location: "nazimabad"

     },
     {
     name: "Health center",
     location: "Saddar"

     }];*/

    $http.get('https://fyp-server.herokuapp.com/getAllClinics').then(function(response) {
        if(response){
            console.log(response);
            $scope.allClinics = response.data.content;
        }},function(error){
        console.log(error);
    });

    $scope.changeState=function(name)
    {
        hospitalFactory.getterName(name);
        $state.go('doctorsList');
    };
});
