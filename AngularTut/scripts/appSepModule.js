var appSepModule = angular.module('appSepModule', ['ngRoute']);

appSepModule.config(function ($routeProvider) {

	$routeProvider
		.when("/jjj",
		{
			templateUrl: ""
		});
});

appSepModule.directive('mySep',
	function() {
		return {
			template:"my sep dir"
		}
	});