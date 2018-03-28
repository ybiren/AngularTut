

app.factory('httpSvc',
[
	'$http', function($http) {
		return{
			post: function() {

				alert("hello from post4");

				promise = $http({
					method: 'POST',
					url: '//10.111.111.61:3000/try',
					headers: { 'XXX': 'xxxyyyzzz' }
				}).then(function (data) {
					return data;
				});
				
				return promise.data;
			}
			
	}


	}
]);