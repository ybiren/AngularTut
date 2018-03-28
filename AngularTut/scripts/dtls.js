
app.controller('dtls',
[
	'$scope', '$routeParams', '$sessionStorage', '$localStorage', '$rootScope','$location',
	function($scope, $routeParams, $sessionStorage, $localStorage, $rootScope,$location) {

		//alert($routeParams.item);

		$scope.names = [
			{
				"name": "yossi"
			},
			{
				"name": "shlomo"
			},
			{
				"name": "meir"
			}
		];

		$scope.sa = $sessionStorage.a;
		$scope.la = $localStorage.a;

		alert("location search1");
		alert($location.search()["sss"]);
		$location.search('ttt','55');


		$rootScope.$on('rootScope.broadcast', function (event, data) {
			alert(data);
		});

		$rootScope.$on('rootScope.emit', function (event, data) {
			alert(data);
		});





}]);

