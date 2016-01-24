hospitalModule.controller('clinicsListController',
  function($scope,
           $stateParams,
           mapService,
           $ionicBackdrop,
           $ionicPopup,
           $state,
           $ionicSideMenuDelegate,
           $ionicLoading, $compile,
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

    /* var my_location,
     orange_leaf_icon = {
     iconUrl: 'img/leaf-red.png',
     shadowUrl: 'img/marker-shadow.png',
     iconSize:     [26, 45]

     },
     origin_icon = {
     iconUrl: 'img/origin-marker.png',
     shadowUrl: 'img/marker-shadow.png',
     iconSize:     [35, 45]

     };

     angular.extend($scope, {
     center: {
     lat: 10,
     lng: 0,
     zoom: 5
     },
     markers: {}
     });

     mapService.getLocation(function(location) {

     $scope.center = {
     lat: location.lat,
     lng: location.long,
     zoom: 15
     };

     $scope.$digest($scope.center);
     mapService.getMarkers(
     new google.maps.LatLng(location.lat, location.long),document.getElementById('map'), ['hospital'],
     function(results) {
     results.forEach(function(marker) {

     var __location = marker.geometry.location.toJSON();

     $scope.markers[marker.id] = {
     lat: __location.lat,
     lng: __location.lng,
     message: marker.name,
     focus: false,
     icon: orange_leaf_icon
     };

     });
     $scope.markers['OriginID'] = {
     lat: location.lat,
     lng: location.long,
     message: "You are here",
     focus: true,
     icon: origin_icon
     };
     $scope.$apply($scope.markers)
     }
     )

     });*/

    var orange_leaf_icon = {
        url: 'img/leaf-red.png',
        scaledSize: new google.maps.Size(30, 45)

      },
      origin_icon = {
        url: 'img/origin-marker.png',
        scaledSize: new google.maps.Size(40, 45)

      };

    function initialize() {
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
          marker.content = '<div class="infoWindowContent">' + info.name + '</div>';
          google.maps.event.addListener(marker, 'click', function () {
            infowindow.setContent(marker.title);
            infowindow.open($scope.map, marker);
          });
          $scope.markers.push(marker);
          $scope.loading.hide();
        };

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

    }
    initialize();
  });

