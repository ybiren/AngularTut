app.controller("wikiDlgCtrl",
[
	'$scope','$compile', function($scope,$compile) {

		this.elWasClicked = function(el) {
			alert("element was clicked3");

			var keyEl = angular.element('<trans-dir color="bug"></trans-dir>');
			alert(2);
			el.parent().append(keyEl);
			alert(3);
			$compile(keyEl)($scope);
			alert(4);
		}
		
		$scope.DoSomething = function () {
			alert($scope.aa);
			alert($scope.wikiUrl);
			alert($scope.customer);
			$scope.customer.name = "meir";
		}

	}
]);