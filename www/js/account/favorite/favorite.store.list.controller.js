(function () {
	'use strict';

	angular.module('mahatma')
		.controller('FavoriteStoreCtrl', FavoriteStoreCtrl);

	FavoriteStoreCtrl.$inject = ['AccountService'];

	function FavoriteStoreCtrl(AccountService) {
		var vm = this;
		vm.stores = [];		
		vm.init = init;
		vm.init();

		function init() {
			AccountService.getFavoriteStoreList().then(function(response){
				if(response.data.Data) {
					vm.stores = response.data.Data;
				}
			});
		}
	}
})();
