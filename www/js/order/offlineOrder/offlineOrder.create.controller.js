(function () {
	'use strict';

	angular.module('mahatma')
		.controller('OrderCreateCtrl', OrderCreateCtrl);

	OrderCreateCtrl.$inject = ['Utils', 'AccountService', 'Constants', 'ionicToast',
		'CommonService', 'OrderService'];

	function OrderCreateCtrl(Utils, AccountService, Constants, ionicToast, CommonService, OrderService) {
		var vm = this;
		vm.submitted = false
		vm.buyerName = '';
		vm.buyerCredit = 0;
		vm.sellerCredit = 0;
		vm.categories = [];
		vm.storeId = '';
		vm.storeName = '';
		vm.calcCommissionMoney = calcCommissionMoney;
		vm.createOrder = createOrder;
		vm.changePayModel = changePayModel;

		vm.buyerId = '';
		vm.productName = '';
		vm.selectedCategoryId = '';
		vm.verifyBuyer = verifyBuyer;
		vm.payMode = '0';
		vm.buyNumber = '';
		vm.cashMoney = '';
		vm.redMoney = '';
		vm.commissionMoney = '';
		vm.cashCommissionMoney = '';
		vm.redCommissionMoney = '';
		vm.payPassword = '';
		vm.changeCashCommissionMoney = changeCashCommissionMoney;
		vm.account = null;
		init();

		function init() {
			var account = Utils.getObjectFromSessionStorage(Constants.CACHE_ACCOUNT_KEY);
			vm.account = account;
			if (account.UserShopList.length > 0) {
				vm.storeName = account.UserShopList[0].StoreName;
				vm.storeId = account.UserShopList[0].StoreId;
				vm.sellerCredit = account.RedMoney;
			}
			loadCategories();
		}

		function calcCommissionMoney() {
			vm.commissionMoney = (vm.cashMoney * 0.15).toFixed(2) - 0.0;
			vm.cashCommissionMoney = vm.commissionMoney; 
		}

		function changeCashCommissionMoney() {
			if (vm.cashCommissionMoney < vm.commissionMoney ) {
				vm.redCommissionMoney = (((vm.commissionMoney - vm.cashCommissionMoney) / 85) * 100).toFixed(2) - 0.0;
			}
		}

		function changePayModel() {
			if (vm.payMode == "1") {
				vm.commissionMoney = '';
				vm.cashCommissionMoney = '';
				vm.cashMoney = '';
				vm.redCommissionMoney = '';
			} else if (vm.payMode == '0') {
				vm.cashMoney = '';
			}
		}

		function verifyBuyer() {
			if (vm.buyerName && vm.buyerName.length > 0) {
				AccountService.getUserByName(vm.buyerName).then(
					function (response) {
						if (!response.data.Data) {
							ionicToast.show('没有找到您输入的买家，请确认后重新输入', 'top', false, 2500);
							vm.buyerName = '';
							return;
						} else {
							vm.buyerId = response.data.Data.Uid;
							vm.buyerCredit = response.data.Data.RedMoney;
						}
					}
				);
			}
		}

		function loadCategories() {
			CommonService.getCategories(0).then(
				function (response) {
					vm.categories = response.data.Data;
				}
			);
		}

		function createOrder() {
			if (vm.account.Balance < vm.cashCommissionMoney) {
				ionicToast.show('账户金额不足以支付该平台服务费', 'top', false, 2500);
				return;
			}
			if (vm.cashCommissionMoney < (vm.commissionMoney * 0.5)) {
				ionicToast.show('现金支付平台服务费金额不能小于50%', 'top', false, 2500);
				return;
			}
			if (vm.account.RedMoney < vm.redCommissionMoney) {
				ionicToast.show('红包金额不足以支付该订单平台服务费', 'top', false, 2500);
				return;
			}

			OrderService.createOrder({
				StoreId: vm.storeId,
				BuyerUid: vm.buyerId,
				PayMode: vm.payMode,
				OrderAmount: (vm.cashMoney - 0) + (vm.redMoney - 0),
				CashMoney: (vm.cashMoney - 0),
				CreditMoney: (vm.redMoney - 0),
				CateId: vm.selectedCategoryId,
				ProductName: vm.productName,
				ProductCount: vm.buyNumber,
				CommissionMoney: vm.commissionMoney,
				CashCommissionMoney: (vm.cashCommissionMoney - 0),
				redCommissionMoney: (vm.redCommissionMoney - 0),
				PayPassword: vm.payPassword
			}).then(
				function (data) {
					AccountService.getUserById(vm.account.Uid).then(function (response) {
						if (response.data.Result) {
							Utils.setObjectInSessionStorage(Constants.CACHE_ACCOUNT_KEY, response.data.Data);
							ionicToast.show('报单成功', 'top', false, 1000);
							Utils.toLocation('/tab/orders', true);
						}
					});
				});
		}
	}


})();
