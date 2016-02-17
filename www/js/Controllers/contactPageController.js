hospitalModule.controller('contactPageController', function($scope,$ionicPlatform,MobileID,$ionicPopup,$state,$ionicBackdrop,$ionicSideMenuDelegate,hospitalFactory, $http, Domain ) {

  $scope.toggleLeft = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };
  //Socket connection
  var socket = io.connect(Domain);
  socket.on('connect', function(){

    console.log('Connected to socket');

  });

  $scope.ClinicID =  localStorage.getItem('ClinicID');
  $scope.DoctorID = localStorage.getItem('DoctorID');
  $scope.MobileID = MobileID;
  $scope.PatientFirstName = '';
  $scope.PatientLastName = '';
  $scope.PatientAge = '';
  $scope.PatientGender= '';
  $scope.errorField= false;
  $scope.emptyField = false;

  $scope.doctorName = localStorage.getItem('Doctor');
  var doctor = JSON.parse($scope.doctorName);

  $scope.clinicName = localStorage.getItem('ClinicName');
 // var clinic = JSON.parse($scope.clinicName);
  $scope.appoint=function() {

    $ionicBackdrop.retain();
    $scope.errorField= false;
    $scope.emptyField = false;

    //This if is used for checking validation
    var a = $scope.PatientFirstName + $scope.PatientLastName + $scope.PatientAge + $scope.PatientGender;
    var b = a.replace(/[^a-z0-9]/gi,'');

    if ($scope.PatientFirstName == '' || $scope.PatientLastName == '' || $scope.PatientAge == '' || $scope.PatientGender == '') {
      $scope.emptyField = true;
      $ionicBackdrop.release();
    }

    else {
//if validation is true than it will call the API
      if(a === b && $scope.PatientAge >=1 && $scope.PatientAge <=130){

        $http.post(Domain + "addAppointment",
          {
            ClinicID: $scope.ClinicID,
            MobileID: $scope.MobileID,
            DoctorID: $scope.DoctorID,
            PatientFirstName: $scope.PatientFirstName,
            PatientLastName: $scope.PatientLastName,
            PatientAge: $scope.PatientAge,
            Gender: $scope.PatientGender,
            DoctorName: doctor.DoctorFirstName + ' ' + doctor.DoctorLastName,
            ClinicName: $scope.clinicName

          }).then(function (response) {

            if (response) {
              console.log(response);
              if (response.data.code == 200) {

                socket.emit('appointmentAdded', {
                  ClinicID: $scope.ClinicID,
                  MobileID: $scope.MobileID,
                  DoctorID: $scope.DoctorID,
                  PatientFirstName: $scope.PatientFirstName,
                  PatientLastName: $scope.PatientLastName,
                  PatientAge: $scope.PatientAge,
                  Gender: $scope.PatientGender,
                  DoctorName: doctor.DoctorFirstName + ' ' + doctor.DoctorLastName,
                  ClinicName: $scope.clinicName,
                  Maker: 'Mobile',
                  AppointmentNumber : response.data.AppointmentNumber
                });

                localStorage.setItem('appointNumber', response.data.AppointmentNumber);
                localStorage.setItem('appointID', response.data.content._id);
                $ionicBackdrop.release();
                $state.go('appointmentDetail')
              }
              else {
                $scope.showAlert();
                $ionicBackdrop.release();
              }
            }

          }, function (error) {
            $ionicBackdrop.release();
            console.log(error);
          });

      }
      else{
        console.log('Error validation');
        $scope.emptyField = false;
        $scope.errorField= true;
        $ionicBackdrop.release();
      }

    }

    $scope.showAlert = function () {
      var alertPopup = $ionicPopup.alert({
        title: 'Appointment Found',
        template: 'You already had an appointment today with this doctor. Thanks'
      });

      alertPopup.then(function (res) {
        console.log('Appointment found');
      });
    };
  };

  //All code below is for push notifications

  /* $scope.notifications = [];

   // call to register automatically upon device ready

   // Register
   var register = function () {
   var config = null;

   if (ionic.Platform.isAndroid()) {
   config = {
   "senderID": "YOUR_GCM_PROJECT_ID" // REPLACE THIS WITH YOURS FROM GCM CONSOLE - also in the project URL like: https://console.developers.google.com/project/434205989073
   };
   }
   else if (ionic.Platform.isIOS()) {
   config = {
   "badge": "true",
   "sound": "true",
   "alert": "true"
   }
   }

   $cordovaPush.register(config).then(function (result) {
   console.log("Register success " + result);

   $scope.registerDisabled=true;
   // ** NOTE: Android regid result comes back in the pushNotificationReceived, only iOS returned here
   if (ionic.Platform.isIOS()) {
   $scope.regId = result;
   localStorage.setItem('RegID' , result);
   }
   }, function (err) {
   console.log("Register error " + err)
   });
   };

   // Notification Received
   $scope.$on('$cordovaPush:notificationReceived', function (event, notification) {
   console.log(JSON.stringify([notification]));
   if (ionic.Platform.isAndroid()) {
   switch(notification.event) {
   case 'registered':
   if (notification.regid.length > 0 ) {
   alert('registration ID = ' + notification.regid);
   localStorage.setItem('RegID' , notification.regid);
   }
   break;

   case 'message':
   // this is the actual push notification. its format depends on the data model from the push server
   alert('message = ' + notification.message + ' msgCount = ' + notification.msgcnt);
   break;

   case 'error':
   alert('GCM error = ' + notification.msg);
   break;

   default:
   alert('An unknown GCM event has occurred');
   break;
   }
   }
   else if (ionic.Platform.isIOS()) {

   }
   });
   $ionicPlatform.ready(function() {
   if (ionic.Platform.isAndroid() || ionic.Platform.isIOS()) {
   register();
   }

   });

   function storeDeviceToken(type) {
   // Create a random userid to store with it
   var user = { user: 'user' + Math.floor((Math.random() * 10000000) + 1), type: type, token: $scope.regId };
   console.log("Post token for registered device with data " + JSON.stringify(user));

   $http.post('http://192.168.1.16:8000/subscribe', JSON.stringify(user))
   .success(function (data, status) {
   console.log("Token stored, device is successfully subscribed to receive push notifications.");
   })
   .error(function (data, status) {
   console.log("Error storing device token." + data + " " + status)
   }
   );
   }*/
});

