app.directive('transDir',
	function () {
		return {
			require:'^wikiPedia',
			scope: {
				color: '@'
			},
			template: '<div class="fa fa-{{color}}">A</div>',
			link:function(scope, el,attr,ctrl) {
				alert("linked occured");
				el.on('click',
					function(evt) {
						alert("clicked");
						scope.$apply(function() {
							ctrl.elWasClicked(el);
						});
					});
			}
		}
	});