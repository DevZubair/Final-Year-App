hospitalModule.controller('clinicsListController',
  function($scope,
           $stateParams,
           mapService,
           $ionicBackdrop,
           $ionicPopup,
           $state,
           $ionicSideMenuDelegate,
           $ionicLoading, $compile,
           $ionicModal,
           $http,
           hospitalFactory,
           Domain) {

    $scope.toggleLeft = function () {
      $ionicSideMenuDelegate.toggleLeft();
    };
    /* $scope.showSpinner = true;
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
     */

    var orange_leaf_icon = {
        url: 'img/leaf-red.png',
        scaledSize: new google.maps.Size(30, 45)

      },
      origin_icon = {
        url: 'img/origin-marker.png',
        scaledSize: new google.maps.Size(40, 45)

      };
    $scope.clinicExist = false;

    $scope.initialize = function() {
      //  var myLatlng = new google.maps.LatLng(43.07493,-89.381388);
      $scope.loading = $ionicLoading.show({
        content: 'Getting current location...',
        showBackdrop: true
      });
      //  $scope.loading.hide();
      navigator.geolocation.getCurrentPosition(function (pos) {
        //  $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
        var myLatlng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        var mapOptions = {
          center: myLatlng,
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map"),
          mapOptions);
        var marker = new google.maps.Marker({
          position: myLatlng,
          map: map,
          animation: google.maps.Animation.DROP,
          title: 'Current Location',
          icon: origin_icon
        });
        marker.addListener('click', toggleBounce);
        marker.content = '<div class="infoWindowContent">' + 'Current Location' + '</div>';
        google.maps.event.addListener(marker, 'click', function () {
          infowindow.setContent(marker.title);
          infowindow.open($scope.map, marker);
        });
        marker.setAnimation(google.maps.Animation.BOUNCE);
        function toggleBounce() {
          if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
          } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
          }
        }

        $scope.map = map;
        $scope.markers = [];
        var infowindow = new google.maps.InfoWindow();

        var createMarker = function (info, loc) {
          var marker = new google.maps.Marker({
            position: new google.maps.LatLng(loc.lat, loc.lng),
            map: $scope.map,
            title: info.name,
            icon: orange_leaf_icon
          });

          var content = document.createElement('div'),
            button;
          content.innerHTML = info.name + '<br/>';
          button = content.appendChild(document.createElement('p'));
          button.type = 'text';
          button.id='InfoWindowDetail';
          button.innerHTML = 'Clinic Details';

          google.maps.event.addListener(marker, 'click', function () {

            infowindow.setOptions({
              content: content,
              map: $scope.map,
              position: this.position
            });

          });
          $scope.markers.push(marker);
          $scope.loading.hide();
          google.maps.event.addDomListener(button, 'click', function () {
            //Open modal here for clinic details
            console.log(loc.lat + ' And ' + loc.lng);
            var clinicDetails = {
              clinicName : info.name,
              lat : loc.lat,
              long : loc.lng,
              originLat : pos.coords.latitude,
              originLong : pos.coords.longitude
            };
            $scope.showModal(clinicDetails);
          });
        };

        google.maps.event.addListener(map, 'click', function() {
          infowindow.close();
        });

        mapService.getMarkers(
          new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude), $scope.map , ['hospital'],
          function (results) {
            results.forEach(function (marker) {

              var __location = marker.geometry.location.toJSON();
              createMarker(marker,__location);

            });
          });


      }, function (error) {
        alert('Unable to get location: ' + error.message);
        $scope.loading.hide();
      });

    };
    $scope.initialize();

    $scope.showModal = function (detail) {

      $ionicBackdrop.retain();

      $ionicModal.fromTemplateUrl('clinic-detailModal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.modal = modal;
      });

      $scope.GeoClinicName = detail.clinicName;
      $scope.key = 'AIzaSyB3scfOYTKcIvsHf43xzdQZOw0_2mbmF3M';
      $scope.googleAPI = 'https://maps.googleapis.com/maps/api/distancematrix/json?destinations=' + detail.lat +',' + detail.long +'&origins=' + detail.originLat + ',' + detail.originLong +'&mode=driving&language=en-EN&key=' + $scope.key;
      $http.get($scope.googleAPI).then(function(response) {
        if (response.status == 200) {

          $scope.directionMatrix = response.data;
          $http.post(Domain + 'findClinic',{ClinicName : detail.clinicName}).then(function(res) {
            $ionicBackdrop.release();
            $scope.modal.show();
            if (res.data.code == 200) {
              console.log(res);
              $scope.clinicExist = true;
              localStorage.setItem('ClinicID',res.data.content[0]._id);
              localStorage.setItem('ClinicName',$scope.GeoClinicName);
            }
            else{
              $scope.clinicExist = false;
              console.log('Clinic not found');
            }
          }, function (err) {
            $scope.clinicExist = false;
            console.log(err);
          });
        }
        else{
          $ionicBackdrop.release();
          console.log('Error in google map direction matrix API call');
        }
      }, function (err) {
        $ionicBackdrop.release();
        console.log(err);
      });

    };
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });

    $scope.goToDoctor = function () {
      $scope.modal.remove();
      $state.go('doctorsList');
    };
  });

