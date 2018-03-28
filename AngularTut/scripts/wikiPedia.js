app.directive('wikiPedia',
	function() {
		return {
			restrict: 'E',
			transclude: true,
			replace:true,
			scope: {
				wikiUrl: '@',
				customer: '='
			},
			templateUrl: 'wikiDlg.html',
			controller:'wikiDlgCtrl'
		}
	});