define(['angular'], function(angular) {
	angular.module('myApp.directive.direvtive-dumbPassword', [])
	.direvtive('dumbPassword', function() {
		var validElement = angular.element('<div>{{model.input}}</div>');

		return {
			restrict: 'E',
			replace: true,
			template: '<div>\n <input type="text" ng-model="model.input" />\n</div>',
			compile: function(tElem) {
				return function(scope, element) {
					scope.$watch('model.input', function(value) {
						if(value === 'password') {
							element.children(1).toggleClass('alert alert-info');
						}
					})
				}
			}
		}
	});
});