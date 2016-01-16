hospitalModule.controller('contactPageController', function($scope,MobileID,$ionicPopup,$state,$ionicBackdrop,$ionicSideMenuDelegate,hospitalFactory, $http, Domain ) {

    $scope.toggleLeft = function () {
        $ionicSideMenuDelegate.toggleLeft();
    };
    $scope.ClinicID =  localStorage.getItem('ClinicID');
    $scope.DoctorID = localStorage.getItem('DoctorID');
    $scope.MobileID = MobileID;
    $scope.PatientFirstName = '';
    $scope.PatientLastName = '';
    $scope.PatientAge = '';
    $scope.PatientGender= '';
    $scope.emptyField=false;

    $scope.doctorName = localStorage.getItem('Doctor');
    var doctor = JSON.parse($scope.doctorName);

    $scope.clinicName = localStorage.getItem('Clinic');
    var clinic = JSON.parse($scope.clinicName);
    $scope.appoint=function(){
        //This if is used for checking validation
        if($scope.PatientFirstName == ''|| $scope.PatientLastName == ''|| $scope.PatientAge == ''|| $scope.PatientGender == ''){
            $scope.emptyField= true;
        }
        else{
//if validation is true than it will call the API
            $ionicBackdrop.retain();
            $http.post(Domain + "addAppointment",
                {
                    ClinicID:$scope.ClinicID,
                    MobileID : $scope.MobileID,
                    DoctorID:$scope.DoctorID,
                    PatientFirstName : $scope.PatientFirstName,
                    PatientLastName :  $scope.PatientLastName,
                    PatientAge :  $scope.PatientAge,
                    Gender : $scope.PatientGender,
                    DoctorName : doctor.DoctorFirstName + ' ' + doctor.DoctorLastName,
                    ClinicName : clinic.Name

                }).then (function(response){

                if(response){
                    console.log(response);
                    if (response.data.code == 200){
                        localStorage.setItem('appointNumber',response.data.AppointmentNumber);
                        localStorage.setItem('appointID',response.data.content._id);
                        $ionicBackdrop.release();
                        $state.go('appointmentDetail')
                    }
                    else{
                        $scope.showAlert();
                        $ionicBackdrop.release();
                    }
                }

            },function(error){
                $ionicBackdrop.release();
                console.log(error);
            });
        }
    };
    $scope.showAlert = function() {
        var alertPopup = $ionicPopup.alert({
            title: 'Appointment Found',
            template: 'You already had an appointment today with this doctor. Thanks'
        });

        alertPopup.then(function(res) {
            console.log('Appointment found');
        });
    };

});

