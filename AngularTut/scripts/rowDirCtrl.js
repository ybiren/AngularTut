app.controller('rowDirCtrl',['$scope','httpSvc',
	function($scope,httpSvc) {
		console.log("hello from sss");

		$scope.rand = Math.floor(Math.random() * 12);

		httpSvc.post();

		$scope.isContained = function(ind) {
			return ind == $scope.rand;
		}

	}]);