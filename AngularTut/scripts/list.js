
app.controller('list',
['$scope', '$location', '$sessionStorage', '$localStorage', '$rootScope', 'yossSvc', '$http', '$q', '$injector', '$log', '$modal', function ($scope, $location, $sessionStorage, $localStorage, $rootScope, yossSvc, $http, $q, $injector, $log,  $modal) {
	$scope.aa = "hello";

	$log.log("hello from log");


	$scope.isSelected2 = true;

	$scope.person = { "name": "yos", "family": "biren" };


	$rootScope.bb = "8";
	
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

	 $scope.ShowModal = function (title, message, callback) {
		$modal.open({
			templateUrl: 'modalTamplate.html',
			controller: 'modal',
			resolve: {
				title: function () { return title; },
				message: function () { return message; },
				callback: function () { return callback; }
			}
		});
	};





	

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

	$scope.InjSvc = function() {
		alert("hello from InjSvc");	
		var service = $injector.get('yossSvc');
		alert(service.doSomething);
	}

	


	$scope.func1 = function() {
		alert("function222");
	}

	$scope.SendDataToDtls = function() {
		$rootScope.$emit('rootScope.emit', 'emit');
		$rootScope.$broadcast('rootScope.broadcast', 'broadcast');
	}

	$scope.SendReqToWiki1 = function (url) {

		var params = {
			url: "//10.111.111.61:3000/" + url,
			method: "get",
			responseType: "text"
		}

		//defer = $q.defer();
		promise = $http(params)
			.then(function(data) {
				//defer.resolve(data.data);
				return data;
			});
		
		return promise;
		//return defer.promise;
	};

	$scope.SendReqToWiki2 = function (url,index) {

		var params = {
			url: "//10.111.111.61:3000/" + url,
			method: "get",
			responseType: "text"
		}

		//defer = $q.defer();
		promise = $http(params)
			.then(function (data) {
				data.index = index;
				return data;
				//defer.resolve(data.data);
				return obj;
			});
		return promise;
		//return defer.promise;
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

		$scope.SendReqToWiki1("https://he.wikipedia.org/w/index.php?title=%D7%A7%D7%98%D7%92%D7%95%D7%A8%D7%99%D7%94:%D7%A2%D7%A8%D7%9B%D7%99%D7%9D_%D7%9E%D7%95%D7%9E%D7%9C%D7%A6%D7%99%D7%9D&from=ד").then(function (value) {

			$scope.wikiDat = [];
	
			$scope.SplitMulti(value.data, ["<li>", "</li>"]).clean1().splice(0, 10).forEach(function (val) {
					//alert(val);
					//alert(val.length);
				$scope.wikiDat.push({ "title": $scope.GetDomAttribute(val).title.replace('\r','').replace('\n',''), "href": "https://he.wikipedia.org" + $scope.GetDomAttribute(val).href });
			});
		
			arrPromises = [];
			for(i=0;i< $scope.wikiDat.length; i++) {
				arrPromises.push($scope.SendReqToWiki2($scope.wikiDat[i].href,i));
			}
			$q.all(arrPromises)
				.then(function(values) {
					alert("done");
					alert(values.length);
					//$scope.wikiTxt = $scope.wikiTxt1 = values[1].data;
					for(i=0;i<values.length;i++)
					  $scope.wikiDat[i].text = values[i].data;

					var keyWords = [" היא ", " הוא ", " הם ", " הן "," היה "," היתה "," היו "];
					for (i = 0; i < $scope.wikiDat.length; i++) {
						var minInd = -1;
						var minTxt = "";
						for (j = 0; j < keyWords.length; j++) {
							var ind = $scope.wikiDat[i].text.indexOf(keyWords[j]);
							if (ind != -1 && (minInd == -1 || ind < minInd)) {
								minInd = ind;
								minTxt = $scope.wikiDat[i].text.split(keyWords[j])[1];
							}
						}
					  
						////alert($scope.wikiDat[i].title);

						var sentence = "";
						var startWord = false;
						for (k = 0; k < minTxt.length  ; k++) {
							if (minTxt[k].search(/[\u0590-\u05FF]/) != -1) {
								if (startWord == false)
									startWord = true;
								sentence += minTxt[k];
							}
							else {
								if (startWord == true)
									sentence += " ";
								startWord = false;
							}
						}
						////alert(sentence);

					}
					
				});




			//alert($scope.SplitMulti(data, ["<li>", "</li>"]).length);
			//$scope.wikiTxt = $scope.wikiTxt1 = value.data;
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
