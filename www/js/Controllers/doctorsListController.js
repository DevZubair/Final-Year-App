hospitalModule.controller('doctorsListController', function($scope,$ionicPopup,$state,$ionicSideMenuDelegate,hospitalFactory) {
    $scope.toggleLeft = function () {
        $ionicSideMenuDelegate.toggleLeft();
    };



    $scope.drarray= [{

        name:"Dr Lina",
        specialization: "Neurologist",
        timings:"9:00pm to 11:00 pm",
        status:"Available",
        number:"1",
        clinicName:'Aziz Medicare'

    },
        {

            name:"Dr John",
            specialization: "Cardiologist",
            timings:"10:00am to 1:00 pm",
            status:"Unavailable",
            number:"2",
            clinicName:'Aziz Medicare'

        },
        {

            name:"Dr Sam",
            specialization: "ENT",
            timings:"5:00pm to 7:00 pm",
            status:"Available",
            number:"3",
            clinicName:' Medicare'

        }];


     $scope.myClinicName= hospitalFactory.returnClinic();
       for(var i=0; i<$scope.drarray.length-1;i++){
        if ($scope.drarray[i].clinicName==$scope.myClinicName){

           $scope.allClinicDoctors.push($scope.drarray[i]);
        }
    }
});



