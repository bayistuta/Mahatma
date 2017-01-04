(function () {
	'use strict';

	angular.module('mahatma')
		.controller('ChargeCtrl', ChargeCtrl);

	ChargeCtrl.$inject = ['Utils', 'AccountService', 'Constants', 'ionicToast'];

	function ChargeCtrl(Utils, AccountService, Constants, ionicToast) {
		var vm = this;
		vm.reCharges = [];

		init();
		function init() {
			AccountService.getReChargeList({
				PageSize: 100,
				PageIndex: 1
			}).then(function(response){
				vm.reCharges = response.data.Data.RechargeList;
			})
		}

		
	}


})();
