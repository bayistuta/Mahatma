(function () {
	'use strict';

	angular.module('mahatma')
		.controller('OrderConfrimCtrl', OrderConfrimCtrl);

	OrderConfrimCtrl.$inject = ['$scope', 'Utils', 'CommonService', 'StoreService', 'AccountService',
    '$state', 'ionicToast', 'OrderService'];

	function OrderConfrimCtrl($scope, Utils, CommonService, StoreService,
        AccountService, $state, ionicToast, OrderService) {
        var vm = this;
				
				vm.init = init;
        vm.init();

        function init() {
					var keys = $state.params.keys;
					OrderService.confirmOnlineOrder({
						SelectedCartItemKeyList: keys
					}).then(function(){

					});
				}

				
	}
})();
