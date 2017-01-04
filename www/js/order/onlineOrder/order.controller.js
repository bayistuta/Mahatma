(function () {
	'use strict';

	angular.module('mahatma')
		.controller('OnlineOrderCtrl', OnlineOrderCtrl);

	OnlineOrderCtrl.$inject = ['$scope', '$state', 'OrderService', '$rootScope',
	'ionicToast'];

	function OnlineOrderCtrl($scope, $state, OrderService, $rootScope,
	ionicToast) {
		var vm = this;
		vm.orderState = 0;
		vm.pageIndex = 1;
		vm.pageSize = 10;
		vm.orders = [];
		vm.dataLoaded = false;

		vm.init = init;
		vm.getOrderState = getOrderState;
		vm.loadMoreOrders = loadMoreOrders;
		vm.noMoreData = false;
		vm.filterState = filterState;
		vm.cancelOrder = cancelOrder;
		vm.confirmReceipt = confirmReceipt;
		vm.init();

		function init() {
			var params = $state.params;
			var options = {};
			if (params && params.orderState) {
				vm.orderState = params.orderState;
			}
			getOnlineOrders();
		}

		function getOnlineOrders() {
			OrderService.getOnlineOrders({
				StartTime: '',
				EndTime: '',
				PageIndex: vm.pageIndex,
				PageSize: vm.pageSize,
				OrderState: vm.orderState
			}).then(function(response){
				if(response.data && response.data.Data && response.data.Data.OrderList) {
					var orders = response.data.Data.OrderList;
					orders.forEach(function(order){
						order.products = response.data.Data.OrderProductList.filter(function(product){
							return product.Oid == order.Oid;
						});
					})
					vm.orders = vm.orders.concat(orders);
				}
				vm.noMoreData = response.data.Data.Pagination.PageIndex >= response.data.Data.Pagination.PageCount;
				vm.dataLoaded = true;
				$scope.$broadcast('scroll.infiniteScrollComplete');
			});
		}

		function getOrderState(orderState) {
			switch(orderState) {
				case 20: return '申请退款';
				case 30: return '等待付款';
				case 50: return '已付款';
				case 70: return '已确认';
				case 90: return '备货中';
				case 110: return '已发货';
				case 140: return '已完成';
				case 160: return '已退货';
				case 200: return '已取消';
				case 220: return '申请退货';
				default: return '';
			}
		}

		function loadMoreOrders() {
			vm.pageIndex++;
			$rootScope.showLoadingBar = false;
			getOnlineOrders();
		}

		function filterState(state) {
			vm.pageIndex = 1;
			vm.orderState = state;
			vm.orders = [];
			vm.dataLoaded = false;
			getOnlineOrders();
		}

		function cancelOrder(order) {
				OrderService.cancelOrder(order.Oid).then(function(){
					ionicToast.show('订单取消成功', 'top', false, 1500);
					filterState(vm.orderState);
				});
		}

		function confirmReceipt(order) {
			OrderService.confirmReceipt(order.Oid).then(function(){
				filterState(vm.orderState);
			});
		}

	}
})();
