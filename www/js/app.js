// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in doctorDetailController.js
var hospitalModule = angular.module('hospitalModule', ['ionic','ionic.rating'])

  .run(function($ionicPlatform,$ionicPopup) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleLightContent();
      }
      // Check for network connection
      if(window.Connection) {
        if(navigator.connection.type == Connection.NONE) {
          $ionicPopup.confirm({
            title: 'No Internet Connection',
            content: 'Sorry, your internet is not connected. Please reconnect and try again.'
          })
            .then(function(result) {
              if(!result) {
                ionic.Platform.exitApp();
              }
            });
        }
      }
    });
  })

  .config(function($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in doctorDetailController.js
    $stateProvider

      .state('clinicsList', {
        url: '/clinicsList',
        templateUrl: 'templates/listOfClinics.html',
        controller: 'clinicsListController',
        cache: false

      })
      .state('doctorsList', {
        url: '/doctorsList',
        templateUrl: 'templates/listOfDoctors.html',
        controller: 'doctorsListController',
        cache: false

      })
      .state('doctorDetail', {
        url: '/doctorDetail',
        templateUrl: 'templates/doctorDetail.html',
        controller: 'doctorDetailController',
        cache: false
      })
      .state('appointmentDetail', {
        url: '/appointmentDetail',
        templateUrl: 'templates/appointmentDetail.html',
        controller: 'appointmentDetailController',
        cache: false
      })
      .state('settingsPage', {
        url: '/settingsPage',
        templateUrl: 'templates/settingsPage.html',
        controller: 'settingsController',
        cache: false

      })
      .state('thanksPage', {
        url: '/thanksPage',
        templateUrl: 'templates/thanksPage.html',
        controller: 'ThanksController',
        cache: false

      })
      .state('appointmentsList', {
        url: '/appointmentsList',
        templateUrl: 'templates/appointmentsList.html',
        controller: 'appointmentsListController',
        cache: false

      })
      .state('contactPage', {
        url: '/contactPage',
        templateUrl: 'templates/contactPage.html',
        controller: 'contactPageController',
        cache: false

      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/clinicsList');

  })

    .constant({
        Domain : 'http://fyp-server.herokuapp.com/',
        MobileID : 'DHGSJDHSSSSGJHGDJH'
    });

// Generated by CoffeeScript 1.9.1
(function() {
  angular.module('ionic.rating', []).constant('ratingConfig', {
    max: 5,
    stateOn: null,
    stateOff: null
  }).controller('RatingController', function($scope, $attrs, ratingConfig) {
    var ngModelCtrl;
    ngModelCtrl = {
      $setViewValue: angular.noop
    };
    this.init = function(ngModelCtrl_) {
      var max, ratingStates;
      ngModelCtrl = ngModelCtrl_;
      ngModelCtrl.$render = this.render;
      this.stateOn = angular.isDefined($attrs.stateOn) ? $scope.$parent.$eval($attrs.stateOn) : ratingConfig.stateOn;
      this.stateOff = angular.isDefined($attrs.stateOff) ? $scope.$parent.$eval($attrs.stateOff) : ratingConfig.stateOff;
      max = angular.isDefined($attrs.max) ? $scope.$parent.$eval($attrs.max) : ratingConfig.max;
      ratingStates = angular.isDefined($attrs.ratingStates) ? $scope.$parent.$eval($attrs.ratingStates) : new Array(max);
      return $scope.range = this.buildTemplateObjects(ratingStates);
    };
    this.buildTemplateObjects = function(states) {
      var i, j, len, ref;
      ref = states.length;
      for (j = 0, len = ref.length; j < len; j++) {
        i = ref[j];
        states[i] = angular.extend({
          index: 1
        }, {
          stateOn: this.stateOn,
          stateOff: this.stateOff
        }, states[i]);
      }
      return states;
    };
    $scope.rate = function(value) {
      if (!$scope.readonly && value >= 0 && value <= $scope.range.length) {
        ngModelCtrl.$setViewValue(value);
        return ngModelCtrl.$render();
      }
    };
    $scope.reset = function() {
      $scope.value = ngModelCtrl.$viewValue;
      return $scope.onLeave();
    };
    $scope.enter = function(value) {
      if (!$scope.readonly) {
        $scope.value = value;
      }
      return $scope.onHover({
        value: value
      });
    };
    $scope.onKeydown = function(evt) {
      if (/(37|38|39|40)/.test(evt.which)) {
        evt.preventDefault();
        evt.stopPropagation();
        return $scope.rate($scope.value + (evt.which === 38 || evt.which === 39 ? {
            1: -1
          } : void 0));
      }
    };
    this.render = function() {
      return $scope.value = ngModelCtrl.$viewValue;
    };
    return this;
  }).directive('rating', function() {
    return {
      restrict: 'EA',
      require: ['rating', 'ngModel'],
      scope: {
        readonly: '=?',
        onHover: '&',
        onLeave: '&'
      },
      controller: 'RatingController',
      template: '<ul class="rating" ng-mouseleave="reset()" ng-keydown="onKeydown($event)">' + '<li ng-repeat="r in range track by $index" ng-click="rate($index + 1)"><i class="icon" ng-class="$index < value && (r.stateOn || \'ion-ios-star\') || (r.stateOff || \'ion-ios-star-outline\')"></i></li>' + '</ul>',
      replace: true,
      link: function(scope, element, attrs, ctrls) {
        var ngModelCtrl, ratingCtrl;
        ratingCtrl = ctrls[0];
        ngModelCtrl = ctrls[1];
        if (ngModelCtrl) {
          return ratingCtrl.init(ngModelCtrl);
        }
      }
    };
  });

}).call(this);
