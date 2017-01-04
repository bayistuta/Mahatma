(function () {
	'use strict';

	angular.module('mahatma')
		.controller('CartCtrl', CartCtrl);

	CartCtrl.$inject = ['$scope', 'Utils', 'CommonService', 'StoreService', 'AccountService',
    '$state', 'ionicToast'];

	function CartCtrl($scope, Utils, CommonService, StoreService,
        AccountService, $state, ionicToast) {
        var vm = this;
				vm.cart = {};
				vm.selectedAll = false;
				vm.amount = 0;

				vm.init = init;
				vm.selectAll = selectAll;
				vm.selectOne = selectOne;
				vm.confirmOrder = confirmOrder;
        vm.init();

        function init() {
					loadCart();
				}

				function loadCart() {
					StoreService.cartList().then(function(response) {
						vm.cart = response.data.Data;
					});
				}

				function selectAll() {
					vm.selectedAll = !vm.selectedAll;
					vm.cart.StoreCartList[0].CartProductList.forEach(function(product){
						product.OrderProductInfo.isSelected = vm.selectedAll;
					});
					calcAmount();
				}

				function selectOne(product) {
					product.OrderProductInfo.isSelected=!product.OrderProductInfo.isSelected;
					calcAmount();
				}

				function calcAmount() {
					var amount = 0;
					vm.cart.StoreCartList[0].CartProductList.forEach(function(product){
						if (product.OrderProductInfo.isSelected) {
							amount += parseFloat(product.OrderProductInfo.DiscountPrice) * product.OrderProductInfo.BuyCount;
						}
					})
					vm.amount = amount;
				}

				function confirmOrder() {
					if (vm.amount > 0) {
						
					}
				}
	}
})();
