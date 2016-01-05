hospitalModule.controller('doctorsListController', function($scope,$ionicPopup,$state,$ionicSideMenuDelegate,hospitalFactory,$http,Domain) {
    $scope.toggleLeft = function () {
        $ionicSideMenuDelegate.toggleLeft();
    };

    $scope.ID = hospitalFactory.returnClinic();
    $scope.doctorStatus = '';

    $http.post(Domain + "getClinicDoctors",{ClinicID:$scope.ID}).then (function(response){

        if(response){
            console.log(response);
            $scope.drarray = response.data.content;
        }

    },function(error){
        console.log(error);
    });

    $scope.sendDoctorDetail = function(data){
        hospitalFactory.getterDoctor(data);
        $state.go('doctorDetail');
    };

    //Socket connection starts

    var socket = io.connect(Domain);
    socket.on('connect', function () {
        console.log('Connected with socket');


    });
    socket.on('doctorStatusMethod', function (data) {
        console.log('Status method with socket received');
        $scope.doctorStatus = data;
        console.log($scope.doctorStatus);
    });

});



