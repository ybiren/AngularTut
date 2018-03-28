app.controller('modal', ['$scope','$modalInstance','uiGridConstants',
function ($scope,$modalInstance,uiGridConstants){ 
	   alert("modal16665454");



	 $scope.grd1 = {
		columnDefs: [
			{ field: 'id', displayName: 'id' },
			{ field: 'name', displayName: 'Title', headerCellClass: 'hdrGridCell', cellClass: 'noborder' },
		]
	}

	 $scope.grd1.data = { arr: [{ "id": "1", name: "Yossi" }, { "id": "2", name: "Meir" }] }.arr;

	$scope.cancel = function () {
	   	$modalInstance.close();
	   };


   }
])