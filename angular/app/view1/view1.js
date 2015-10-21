'use strict';
define([
	'angular',
	'angularRoute',
	'direvtive/dumbPassword'
], function(angular) {
	angular.module('myApp.view1', ['ngRoute', 'myApp.direvtive.dumbPassword'])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/view1', {
			templateUrl: 'view1/view1.html',
			controller: 'View1Ctrl'
		});
	}])
	.controller('View1Ctrl', [function() {
		
	}]);
});