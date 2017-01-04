(function () {
	'use strict';

	angular.module('mahatma')
		.controller('ShipAddressListCtrl', ShipAddressListCtrl);

	ShipAddressListCtrl.$inject = ['AccountService'];

	function ShipAddressListCtrl(AccountService) {
		var vm = this;
		vm.addresses = [];		
		vm.init = init;
		vm.setDefault = setDefault;
		vm.removeShipAddress = removeShipAddress;
		vm.init();

		function init() {
			loadShipAddress();
		}

		function loadShipAddress() {
			AccountService.getShipAddress().then(function(response){
				if(response.data.Data) {
					vm.addresses = response.data.Data;
				}
			});
		}

		function setDefault(said) {
			AccountService.setDefaultShipAddress(said).then(function (){
				loadShipAddress();
			}); 
		}

		function removeShipAddress(said) {
			AccountService.removeShipAddress(said).then(function (){
				loadShipAddress();
			});
		}
	}
})();
