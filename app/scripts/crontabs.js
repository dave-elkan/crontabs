"use strict";

var crontabs = angular.module('crontabs', ['webStorageModule', 'ngRoute', 'checklist-model']);

crontabs.controller("NavigationCtrl", ['$scope', '$location', function($scope, $location) {
    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };
}]);

crontabs.config([

    '$routeProvider',

    function($routeProvider) {

        $routeProvider.
            when('/time-management', {
                templateUrl: 'partials/time-management.html',
                controller: 'TimeManagementCtrl'
            }).
            when('/advanced', {
                templateUrl: 'partials/advanced.html',
                controller: 'EditorCtrl'
            }).
            otherwise({
                redirectTo: '/time-management'
            });
    }]);