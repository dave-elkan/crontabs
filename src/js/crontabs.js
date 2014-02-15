"use strict";

var crontabs = angular.module('crontabs', ['webStorageModule', 'ngRoute']);

crontabs.controller("NavigationCtrl", function($scope, $location) {
    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };
});

crontabs.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/time-management', {
                templateUrl: 'src/partials/time-management.html',
                controller: 'TimeManagementController'
            }).
            when('/advanced', {
                templateUrl: 'src/partials/advanced.html',
                controller: 'EditorCtrl'
            }).
            otherwise({
                redirectTo: '/time-management'
            });
    }]);