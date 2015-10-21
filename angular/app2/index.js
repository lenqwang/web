var angular = require('angular');
var ngModule = angular.module('myApp', []);

ngModule.controller({
    test: function($scope) {
        $scope.three = $scope.one + $scope.two;
    }
});