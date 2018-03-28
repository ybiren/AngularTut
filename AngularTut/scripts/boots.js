app.controller('boots',
[
	'$scope', function($scope) {

		$scope.names = [];

		$scope.names.push({ pname: "yossi", fname: "birenboim",data:[] });
		$scope.names.push({ pname: "shlomo", fname: "levi", data: [] });
		$scope.names[0].data.push({ data1: "yossData1", data2: "yossData2" });
		$scope.names[0].data.push({ data1: "yossData1", data2: "yossData2" });
		$scope.names[0].data.push({ data1: "yossData1", data2: "yossData2" });
		$scope.names[0].data.push({ data1: "yossData1", data2: "yossData2" });

		$scope.names[1].data.push({ data1: "22", data2: "33" });
		$scope.names[1].data.push({ data1: "shlomData1", data2: "shlomData2" });
		$scope.names[1].data.push({ data1: "shlomData1", data2: "shlomData2" });
		$scope.names[1].data.push({ data1: "shlomData1", data2: "shlomData2" });

		$scope.SetPage= function(page) {
			$scope.currPage = page;
		}

	}
]);