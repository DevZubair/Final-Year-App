hospitalModule.service('mapService', function() {

		return {
			getLocation: _getLocation,
			getMarkers: _getMarkers
		};

		function _getLocation(callBack) {
			navigator.geolocation.getCurrentPosition(function(g) {
				callBack({
					lat: g.coords.latitude,
					long: g.coords.longitude
				});
			});
		}

		function _getMarkers(location, mapElement, place_type_array, callBack) {

			var map = mapElement,
				request = {
					location: location,
					radius: 2000,
					types: place_type_array

				},
				service = new google.maps.places.PlacesService(map);

			service.nearbySearch(request, function(latLong) {
				callBack(latLong);
			});
		}

	});
