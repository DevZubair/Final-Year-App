// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in doctorDetailController.js
var hospitalModule = angular.module('hospitalModule', ['ionic','ionic.rating','leaflet-directive'])
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
                cache: true

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

            })
            .state('homePage', {
                url: '/homePage',
                templateUrl: 'templates/homePage.html',
                controller: 'homeController',
                cache: false

            })
            .state('allDoctors', {
                url: '/allDoctors',
                templateUrl: 'templates/allDoctors.html',
                controller: 'allDoctorsController',
                cache: true

            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/homePage');

    })

    .constant({
        Domain : 'http://fyp-server.herokuapp.com/',
        MobileID : 'SSDSDS3643437672323'
    });



