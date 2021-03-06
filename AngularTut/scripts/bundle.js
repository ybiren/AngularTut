﻿<div ng-repeat="itm in names">
	<div>
		{{itm.name}}
	</div>
</div>
<a href="#/dtls/2">dfdfdfdfdfdfd</a>

<button ng-click="DoRoute()">route</button>

<div>{{ ::param }}</div>
<input type="text" ng-model="param"/>

<my-component pname="yossi" fname="birenboim"></my-component>

<section>
	<form novalidate name="form1">

		<div ng-show="form1.input1.$pristine">input1 pristine</div>
		<div ng-show="form1.input2.$dirty">input2 dirty</div>
		<fieldset>
			<input type="text" ng-model="input1" name="input1"><br>
			<input type="text" ng-model="input2" name="input2">
		</fieldset>
	</form>

</section>

<input type="text" ng-model="name1" yoss-capitalize len-three="func1();"/>

<button ng-click="SendDataToDtls()">SendDataToDtls</button>

<wiki-pedia wiki-url="{{wikiUrl2}}"></wiki-pedia>

<button ng-click="SendReqToWiki()">Send req to wiki</button>

<!--
<div>{{wikiTxt | wikiFltr:');':'&lt;/body&gt;'}}</div>
<div>{{wikiTxt1}}</div>
-->

<section>
<div ng-repeat="itm in wikiDat">
	<div><a ng-click="SetWikiUrl(itm.href)"  >{{itm.title}}</a></div>
</div>
</section>

<div ng-repeat="itm in names">
	<div ng-click="SelItem(itm.index)" ng-class="{'selected':isSelected == itm.index}" >{{itm.name}}</div>
</div>
 

<div class="hdrRow"><span><input type="text"></span><span><input type="text"></span><span><input type="text"></span></div>
<div  class="dataRow" ng-click="isSelected2 = true" ng-class="{'selected2' : isSelected2}" ><span>AA</span><span>BB</span><span>CC</span></div>
<div class="dataRow"><span>AAA</span><span>BBB</span><span>CCC</span></div>

<section>
<div>
red div
<span>green span</span>
</div>
</section>


<!--



<div ui-grid="myGrid"  style="width: 100%; height:200px;" ></div>
-->

	<!--<div ng-controller="dtls">sdsdsd</div>-->
	<!--<iframe src="http://localhost:49722/index.html#/dtls/4?vvv=5" width="600" height="400"/>-->
---------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------
﻿/*
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


var app = angular.module('myApp', ['ngRoute', 'ngStorage']);

app.config(function ($routeProvider) {
	$routeProvider
		.when("/",
		{
			templateUrl: "list.html",
			controller: "list"
		})
		.when("/dtls/:item",
		{
			templateUrl: "dtls.html",
			controller: "dtls"
		});
});

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
---------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------
﻿
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

---------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------
﻿
app.controller('list',
['$scope', '$location', '$sessionStorage', '$localStorage', '$rootScope', 'yossSvc', '$http', '$q', function ($scope, $location, $sessionStorage, $localStorage, $rootScope, yossSvc, $http, $q) {
	$scope.aa = "hello";

	$scope.isSelected2 = true;


	$rootScope.bb = "8";
	alert($scope.bb);
	
	$scope.names = [
		{
			"index" :0,
			"name": "yossi"
		},
		{
			"index": 1,
			"name": "shlomo"
		},
			{
				"index": 2,
				"name": "meir"
			}
	];

	$scope.SelItem = function(ind) {
		$scope.isSelected = ind;
	}



	$sessionStorage.a = "S";
	$localStorage.a = "L";

	$scope.wikiTxt = ");AAA</body>";


	$scope.DoRoute = function() {
		alert(11);
		alert(document.getElementById('myDiv').innerHTML);
		yossSvc.doSomething();
		yossSvc.doSome2()
			.then(function(data) {
				alert(angular.toJson(data));
				$location.path("/dtls/3").search("sss=3");
			});
		
	}

	$scope.func1 = function() {
		alert("function222");
	}

	$scope.SendDataToDtls = function() {
		$rootScope.$emit('rootScope.emit', 'emit');
		$rootScope.$broadcast('rootScope.broadcast', 'broadcast');
	}

	$scope.SendReqToWiki1 = function() {

		var params = {
			//url:
				//"//he.wikipedia.org/w/index.php?title=%D7%95%D7%99%D7%A7%D7%99%D7%A4%D7%93%D7%99%D7%94:%D7%9E%D7%95%D7%9E%D7%9C%D7%A5_%D7%90%D7%A7%D7%A8%D7%90%D7%99",
			url:"//192.168.1.15:3000/ffff1f",
			method: "get",
			responseType: "text"
		}

		defer = $q.defer();
		$http(params)
			.then(function(data) {
				defer.resolve(data.data);
				
			});
		return defer.promise;
	};


	$scope.SplitMulti = function(str, tokens) {
		var tempChar = tokens[0]; // We can use the first token as a temporary join character
		for (var i = 0; i < tokens.length; i++) {
			str = str.split(tokens[i]).join(tempChar);
		}
		str = str.split(tempChar);
		return str;
	}

	//alert($scope.SplitMulti("aaa<li>bbb</li>ccc",["<li>","</li>"]).length);



	$scope.SendReqToWiki = function () {
		//alert(44);
		Array.prototype.clean1 = function() {
			for (var i = 0; i < this.length; i++) {
				if (this[i].length ==  1 || this[i].length >  1000) {
					this.splice(i, 1);
					i--;
				}
			}
			return this;
		};

		$scope.SendReqToWiki1().then(function (data) {

			$scope.wikiDat = [];
			alert(556);

			$scope.SplitMulti(data, ["<li>", "</li>"]).clean1().splice(0, 10).forEach(function (val) {
					//alert(val);
					//alert(val.length);
				$scope.wikiDat.push({ "title": $scope.GetDomAttribute(val).title.replace('\r','').replace('\n',''), "href": "https://he.wikipedia.org" + $scope.GetDomAttribute(val).href });
			});
			//alert($scope.SplitMulti(data, ["<li>", "</li>"]).length);
			$scope.wikiTxt = $scope.wikiTxt1 = data;
		});

	};

	$scope.SetWikiUrl = function(href) {
		$scope.wikiUrl2 = href;
		alert($scope.wikiUrl2);
		signDialog.showModal();

	}


	$scope.GetDomAttribute = function(val) {

		var regex = new
			RegExp('[\\s\\r\\t\\n]*([a-z0-9\\-_]+)[\\s\\r\\t\\n]*=[\\s\\r\\t\\n]*([\'"])((?:\\\\\\2|(?!\\2).)*)\\2', 'ig');
		var attributes = {};
		while ((match = regex.exec(val))) {
			attributes[match[1]] = match[3];
		}
		return attributes;
	};


	/*
	$scope.myGrid = {
		columnDefs: [
				{ field: 'title', displayName: 'title' },
				{
					field: 'href',
					displayName: 'href',
					cellTemplate: '<div class="ui-grid-cell-contents" ><input type="text" ng-model="row.entity.href"></div>'
				}
		]
	};

	alert(7);
	$scope.myGrid.data = [{ "title": "title", "href": "href" }];
	alert(8);
	*/
}]);
---------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------
﻿<div>1111</div>
<div>{{la}}</div>
<div>{{sa}}</div>---------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------
