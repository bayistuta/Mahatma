(function () {
	'use strict';

	angular.module('mahatma')
		.controller('FavoriteProductCtrl', FavoriteProductCtrl);

	FavoriteProductCtrl.$inject = ['AccountService'];

	function FavoriteProductCtrl(AccountService) {
		var vm = this;
		vm.products = [];		
		vm.init = init;
		vm.init();

		function init() {
			AccountService.getFavoriteProductList().then(function(response){
				if(response.data.Data) {
					vm.products = response.data.Data;
				}
			});
		}
	}
})();
