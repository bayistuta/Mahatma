(function () {
  'use strict';

  angular.module('mahatma')
    .controller('OrderApproveCtrl', OrderApproveCtrl);

  OrderApproveCtrl.$inject = ['Utils', 'AccountService', 'Constants', 'ionicToast',
    'CommonService', 'OrderService', '$stateParams'];

  function OrderApproveCtrl(Utils, AccountService, Constants, ionicToast, CommonService,
    OrderService, $stateParams) {
    var vm = this;
    vm.orderDetail = null;
    vm.getPayMode = getPayMode;
    vm.orderId = 0;
    vm.resultCode = '';
    vm.comment = '';
    vm.approveOrder = approveOrder;
    init();
    function init() {
      vm.orderId = $stateParams.orderId;
      vm.order = Utils.getObjectFromSessionStorage("order");
      OrderService.getOrderDetail(vm.orderId).then(function (response) {
        vm.orderDetail = response.data.Data;
      });
    }

    function approveOrder() {
      if (vm.resultCode == 1) {
        OrderService.auditOrders([vm.orderId]).then(function (data) {
          ionicToast.show('审核成功', 'top', false, 1500);
          Utils.toLocation('/tab/approveOrders', true);
        });
      } else if (vm.resultCode == 2) {
        OrderService.denyOrder(vm.orderId, vm.comment).then(function (data) {
          ionicToast.show('审核成功', 'top', false, 1500);
          Utils.toLocation('/tab/approveOrders', true);
        });
      }
    }

    function getPayMode(mode) {
      if (mode == "0") {
        return "现金支付";
      } else if (mode == "1") {
        return "红包支付";
      }
      return "混合支付";
    }
  }


})();
