(function () {
	'use strict';

	angular.module('mahatma')
		.controller('OrderConfrimCtrl', OrderConfrimCtrl);

	OrderConfrimCtrl.$inject = ['$scope', 'Utils', 'CommonService', 'StoreService', 'AccountService',
    '$state', 'ionicToast', 'OrderService', '$ionicModal'];

	function OrderConfrimCtrl($scope, Utils, CommonService, StoreService,
        AccountService, $state, ionicToast, OrderService, $ionicModal) {
        var vm = this;
		vm.defaultShipAddress= {};
		vm.defaultPayPluginInfo = {};
		vm.payPluginList = [];
		vm.storeOrderList = [];
		vm.amount = 0;
		vm.count = 0;
		vm.keys = '';
				
		vm.init = init;
		vm.choosePayPlugin = choosePayPlugin;
		vm.changePlugin = changePlugin;
		vm.submitOnlineOrder = submitOnlineOrder;
        vm.init();

        function init() {
			var keys = $state.params.keys;
			vm.keys = keys;
			$ionicModal.fromTemplateUrl('plugin-modal.html', {
				scope: $scope,
				animation: 'slide-in-up'
			}).then(function(modal) {
				vm.pluginModal = modal;
			});
			$ionicModal.fromTemplateUrl('address-modal.html', {
				scope: $scope,
				animation: 'slide-in-up'
			}).then(function(modal) {
				vm.addressModal = modal;
			});
			OrderService.confirmOnlineOrder({
				SelectedCartItemKeyList: keys
			}).then(function(response){
				if (response.data && response.data.Data) {
					vm.defaultShipAddress = response.data.Data.DefaultFullShipAddressInfo;
					vm.defaultShipAddress.SaId = vm.defaultShipAddress.SAId;
					vm.defaultPayPluginInfo = response.data.Data.DefaultPayPluginInfo;
					vm.payPluginList =  response.data.Data.PayPluginList;
					vm.storeOrderList = response.data.Data.StoreOrderList;
					vm.storeOrderList[0].StoreCartInfo.SelectedOrderProductList.forEach(function(product){
						vm.amount += product.DiscountPrice * product.BuyCount;
						vm.count += product.BuyCount;
					});
				}
			});
			AccountService.getShipAddress().then(function(response){
				if(response.data.Data) {
					vm.addresses = response.data.Data;
				}
			});
		}

		function choosePayPlugin() {
			vm.pluginModal.show();
		}	

		function changePlugin(plugin) {
			vm.defaultPayPluginInfo = plugin;
			vm.pluginModal.hide();
		}	

		function submitOnlineOrder() {
			OrderService.submitOnlineOrder({
				SelectedCartItemKeyList: vm.keys,
				SaId: vm.defaultShipAddress.SaId,
				PayName: vm.defaultPayPluginInfo.SystemName,
				PayCreditCount: 0,
				CouponIdList: [],
				CouponSNList: [],
				FullCut: 0,
				BestTime: '',
				BuyerRemark: '',
				VerifyCode: '',
			}).then(function(response){
				ionicToast.show('恭喜您，下单成功，请尽快支付！', 'top', false, 1500);
				Utils.toLocation('/tab/cart');
			});
		}
	}
})();
