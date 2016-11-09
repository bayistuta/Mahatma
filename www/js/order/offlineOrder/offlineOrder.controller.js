(function () {
	'use strict';

	angular.module('mahatma')
		.controller('OfflineOrderCtrl', OfflineOrderCtrl);

	OfflineOrderCtrl.$inject = ['$scope', 'Utils', 'OrderService', 'Constants', 
		'ionicToast', 'params', '$rootScope', '$ionicPopup', 'AccountService'];

	function OfflineOrderCtrl($scope, Utils, OrderService, Constants, ionicToast, 
		params, $rootScope, $ionicPopup, AccountService) {
		var vm = this;
		vm.pageIndex = 0;
		vm.orders = [];
		vm.osn = '';
		vm.account = null;
		//basic feature
		vm.search = search;
		vm.loadOrders = loadOrders;
		vm.refreshOrders = refreshOrders;
		vm.loadMoreOrders = loadMoreOrders;
		vm.noMoreData = true;
		vm.dataLoaded = false;
		//permission
		vm.canCreateOrder = canCreateOrder;
		vm.canApproveOrder = canApproveOrder;
		vm.canConfirmOrder = canConfirmOrder;
		//operation for approve and confirm orders
		vm.viewOrder = viewOrder;
		vm.selectAll = selectAll;
		vm.isSelectedAll = false;
		vm.selectOrder = selectOrder;
		vm.approveOrder = approveOrder;
		vm.confirmOrder = confirmOrder;
	
		vm.totalAmount = 0;
		vm.totalNumber = 0;

		init();

		function init() {
			vm.canSelectOrder = params.canSelectOrder || false;
			vm.pageTitle = params.title;
			vm.account = Utils.getObjectFromSessionStorage(Constants.CACHE_ACCOUNT_KEY, null);
			loadOrders();
		}

		function loadOrders() {
			OrderService.getOrders({
				pageIndex: vm.pageIndex,
				osn: vm.osn,
				orderState: params.state
			}).then(
				function (response) {
					if (response.data.Data.OfflineOrderList.length > 0) {
						if (response.data.Data.Pagination.PageIndex == 1) {
							vm.orders = [];
						}
						response.data.Data.OfflineOrderList.forEach(function (order) {
							order.isSelected = false;
							vm.orders.push(order);
						});
					}
					vm.noMoreData = response.data.Data.Pagination.PageIndex >= response.data.Data.Pagination.PageCount;
					vm.dataLoaded = true;
					$scope.$broadcast('scroll.infiniteScrollComplete');
					$scope.$broadcast('scroll.refreshComplete');
				},
				function () {
					$scope.$broadcast('scroll.infiniteScrollComplete');
					$scope.$broadcast('scroll.refreshComplete');
				}
				);
		}

		function search() {
			vm.pageIndex = 0;
			loadOrders();
		}

		function refreshOrders() {
			$rootScope.showLoadingBar = false;
			vm.pageIndex = 0;
			loadOrders();
		}

		function loadMoreOrders() {
			vm.pageIndex++;
			$rootScope.showLoadingBar = false;
			loadOrders();
		}

		function canCreateOrder() {
			return vm.account.MallAgid === 9 && params.state === 0;
		}

		function canApproveOrder() {
			return params.type == 'approveOrders';
		}

		function canConfirmOrder() {
			return params.type == 'confirmOrders';
		}

		function viewOrder(order) {
			Utils.setObjectInSessionStorage("order", order)
			Utils.toLocation("/tab/approve-detail/" + order.Oid);
		}

		function selectAll() {
			vm.totalAmount = 0;
			vm.totalNumber = 0;
			vm.orders.forEach(function (order) {
				order.isSelected = vm.isSelectedAll;
				if (order.isSelected) {
					vm.totalAmount += order.OrderAmount;
					vm.totalNumber += order.ProductCount;
				}
			});
		}

		function selectOrder() {
			vm.totalAmount = 0;
			vm.totalNumber = 0;
			vm.orders.forEach(function (order) {
				if (order.isSelected) {
					vm.totalAmount += order.OrderAmount;
					vm.totalNumber += order.ProductCount;
				}
			});
		}

		function approveOrder() {
			var selectedOrders = [];
      vm.orders.forEach(function (order) {
        if (order.isSelected) {
          selectedOrders.push(order.Oid);
        }
      });
      if (selectedOrders.length > 0) {
        $ionicPopup.confirm({
          title: '提示',
          template: '请确认选中的订单已经通过您的审核',
          cancelText: '取消',
          okText: '确认',
        }).then(function (approve) {
          if (approve) {
            OrderService.auditOrders(selectedOrders).then(function (data) {
              ionicToast.show('审核成功', 'top', false, 1500);
							refreshOrders();
            })
          }
        });
      }
		}

		function confirmOrder() {
			var selectedOrders = [];
			$scope.data = {
				password: '',
		  };
      vm.orders.forEach(function (order) {
        if (order.isSelected) {
          selectedOrders.push(order.Oid);
        }
      });
      if (selectedOrders.length > 0) {
        $ionicPopup.confirm({
          title: '提示',
          template: '<div>请输入支付密码，并确认你所选中的订单。</div><div><input type="password" ng-model="data.password" style="border:solid 1px #cfcfcf;padding:0px 10px"></div>',
          cancelText: '取消',
          okText: '确认',
					scope: $scope,
        }).then(function (approve) {
          if (approve) {
						if ($scope.data.password.length <= 0) {
							ionicToast.show('请输入支付密码', 'top', false, 1500);
						} else {
							AccountService.checkPayPassword($scope.data.password).then(function() {
								OrderService.confirmOrders(selectedOrders).then(function() {
									ionicToast.show('恭喜您，订单确认成功！', 'top', false, 1500);
									search();
								});
							});
						}
          }
        });
      }
		}

	}
})();
