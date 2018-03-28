/*
alert(1);
var app = angular.module('myApp', []);
alert(2);
app.controller('myCtrl', function ($scope) {
	alert("hello");
	$scope.firstName = "John";
	$scope.lastName = "Doe";
});
alert(3);
*/


var app = angular.module('myApp', ['appSepModule','ngRoute','ngStorage', 'ui.bootstrap','ui.grid']);

app.config(function ($routeProvider) {

	$routeProvider
		.when("/",
		{
			templateUrl: "list.html",
			controller: "list"
		})
		.when("/boots",
		{
			templateUrl: "boots.html",
			controller: "boots"
		})
		.when("/screen",
		{
			templateUrl: "screen.html"
		})
		.when("/divImg",
		{
			templateUrl: "divImg.html"
		})
		.when("/modal",
		{
			templateUrl: "modalTamplate.html",
		})
		.when("/flex",
		{
			templateUrl: "flex.html",
		})
		.when("/dtls/:item",
		{
			templateUrl: "dtls.html",controller: "dtls"
		})
	.otherwise({
		redirectTo: '/'
	});

});

/*
app.config(function($provider) {
	$provider.decorator("$exceptionHandler",
	[
		'$delegate', function($delegate) {
			return function(exception, cause) {
				$delegate(exception, cause);
			};
		}
	]);
});
*/


var myComp = app.component('myComponent',
{
	template: '<div id="myDiv">hello {{$ctrl.pname}}&nbsp;{{$ctrl.fname}}&nbsp;{{$ctrl.myName}}&nbsp;{{$ctrl.myFunc()}}</div>',
	bindings: { pname: '@', fname: '@' },
	controller: 'ctrlForComp'
	}
);

app.directive('yossCapitalize', function() {
	return {
		require: 'ngModel',
		scope: {
			expression: '&lenThree',
		},
		link: function (scope, element, attrs, modelCtrl) {
			scope.$parent.$watch(attrs.ngModel,
				function (inputValue) {
					if (inputValue == undefined) inputValue = '';
					var capitalized = ""; //inputValue.toUpperCase();
					if (inputValue.length == 0)
						capitalized = '';
					else
						capitalized = parseInt(inputValue) + 1;
					element.val(capitalized);
					if (inputValue.length == 3)
						scope.expression();
					//modelCtrl.$setViewValue(capitalized);
					//modelCtrl.$render();
					//return capitalized;
				});
			//modelCtrl.$parsers.push(capitalize);
			//capitalize(scope[attrs.ngModel]); // capitalize initial value
		}
	};
});


app.factory('yossSvc',
	function($q) {
		return {
		  doSomething :  function() { alert("hello from service"); },
			doSome2() {
				alert("something 2");
				let defer = $q.defer();
				defer.resolve({ "a": "1", "b": "2" });
				alert("something 3");

				return defer.promise;
			}
		}
	});

app.factory('authorizationHeaderInterceptor',
	function () {
		var requestInterceptor = {
			'request': function (config) {
				//config.headers[":authority"] = "he.wikipedia.org";
				//config.headers[":method"] = "GET";
				//config.headers[":path"] = "/w/index.php?title=%D7%95%D7%99%D7%A7%D7%99%D7%A4%D7%93%D7%99%D7%94:%D7%9E%D7%95%D7%9E%D7%9C%D7%A5_%D7%90%D7%A7%D7%A8%D7%90%D7%99";
				//config.headers["cookie"] = "WMF-Last-Access=24-Jan-2018; WMF-Last-Access-Global=24-Jan-2018; CP=H2; GeoIP=IL:JM:Bet_Shemesh:31.75:34.99:v4";
				//config.headers["if-modified-since"] = "Wed, 24 Jan 2018 11:23:43 GMT";
				//config.headers["upgrade-insecure-requests"] = "1";
				//config.headers["yossi"] = "yossi33Try";
				//config.headers["Accept"] = "text/plain";
				return config;
			}
		};
		return requestInterceptor;
	});

app.filter('wikiFltr',
	function() {
		return function(input,spltr1,spltr2) {

			Array.prototype.clean = function (deleteValue) {
				for (var i = 0; i < this.length; i++) {
					if (this[i] == deleteValue) {
						this.splice(i, 1);
						i--;
					}
				}
				return this;
			};

			var arr = input.split(spltr2);
			arr = arr.clean("");
			if (arr.length > 0) {
				var word = arr[0];
				var arr1 = word.split(spltr1);
				arr1 = arr1.clean("");
				if (arr1.length > 0)
					return arr1[arr1.length -1];
				else
					return "XXX";
			}
			else
				return "YYY";


		}
	}
);


app.run(function ($rootScope) {
	$rootScope.$on('$routeChangeSuccess',
		function () {
			//alert("yes");
		});
});

app.run(function ($rootScope) {
	$rootScope.$on('$stateChangeSuccess',
		function (event, toState, toParams, fromState, fromParams) {
			alert("state changed");
		});
});

app.factory('errorInterceptor',
[
	"$q", "$injector", function($q, $injector) {
		var errorInterceptor = {
			'responseError': function(rejection) {
				alert("Error");
				return $q.reject(rejection);
			}
		};

		return errorInterceptor;
	}
]);







app.config([
	'$httpProvider', function ($httpProvider) {
		$httpProvider.interceptors.push('authorizationHeaderInterceptor');
		$httpProvider.interceptors.push('errorInterceptor');
	}
]);
