(function () {
	'use strict';

	angular.module('mahatma')
		.controller('ShipAddressListCtrl', ShipAddressListCtrl);

	ShipAddressListCtrl.$inject = ['AccountService'];

	function ShipAddressListCtrl(AccountService) {
		var vm = this;
		vm.addresses = [];		
		vm.init = init;
		vm.init();

		function init() {
			AccountService.getShipAddress().then(function(response){
				if(response.data.Data) {
					vm.addresses = response.data.Data;
				}
			});
		}
	}
})();
