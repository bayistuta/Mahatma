angular.module('mahatma.controllers', [])

  .controller('ApproveDetailCtrl', function ($scope, $state, $stateParams, dataStore, Utils, Constants, $ionicLoading, ionicToast, $ionicPopup,$timeout, $ionicHistory) {
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
      dataStore.getOrderDetail(vm.orderId).then(function (data) {
        vm.orderDetail = data.Data;
      });
    }

    function approveOrder() {
      if (vm.resultCode == 1) {
        $ionicLoading.show({
          template: '数据提交中...'
        });
        dataStore.auditOrders([vm.orderId]).then(function (data) {
          $ionicLoading.hide();
          if (data.ErrorItemList.length > 0) {
            var message = '';
            data.ErrorItemList.forEach(function (error) {
              message += error.ErrorMsg + '<br>'
            });
            ionicToast.show(message, 'top', false, 4000);

          } else {
            ionicToast.show('审核成功', 'top', false, 2500);
            //refresh account data
            $timeout(function(){
              $ionicHistory.clearCache().then(function(){ $state.go('tab.approves') });
            }, 1500);
          }
        }, function (){
          $ionicLoading.hide();
        });
      } else if (vm.resultCode == 2){
        $ionicLoading.show({
          template: '数据提交中...'
        });
        dataStore.denyOrder(vm.orderId, vm.comment).then(function (data) {
          $ionicLoading.hide();
          if (data.ErrorItemList.length > 0) {
            var message = '';
            data.ErrorItemList.forEach(function (error) {
              message += error.ErrorMsg + '<br>'
            });
            ionicToast.show(message, 'top', false, 4000);

          } else {
            ionicToast.show('审核成功', 'top', false, 2500);
            //refresh account data
            $timeout(function(){
              $ionicHistory.clearCache().then(function(){ $state.go('tab.approves') });
            }, 1500);
          }
        }, function (){
          $ionicLoading.hide();
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
  })
  .controller('ApproversCtrl', function ($scope, dataStore, Utils, Constants, $ionicLoading, ionicToast, $ionicPopup, $location) {
    var vm = this;
    vm.orders = [];
    vm.nameFilter = '';
    vm.clear = clear;
    vm.noMoreData = false;
    vm.loadMore = loadMore;
    vm.query = query;
    vm.pageIndex = 0;
    vm.approve = approve;
    vm.totalAmount = 0;
    vm.totalNumber = 0;
    vm.isSelectedAll = false;
    vm.selectAll = selectAll;
    vm.showSearch = showSearch;
    vm.isShowSearchTextBox = false;
    vm.approveOrder = approveOrder;
    vm.doRefresh = doRefresh;
    init();

    function init() {
      var user = Utils.getObjectFromSessionStorage(Constants.CACHE_USER_KEY);
      loadMore(true);
    }

    function showSearch() {
      if (vm.isShowSearchTextBox && vm.nameFilter.length > 0) {
        query(true);
      }
      vm.isShowSearchTextBox = !vm.isShowSearchTextBox;
    }

    function selectAll() {
      vm.totalAmount = 0;
      vm.totalNumber = 0;
      vm.orders.forEach(function(order) {
        order.isSelected = vm.isSelectedAll;
        if (order.isSelected) {
          vm.totalAmount += order.OrderAmount;
          vm.totalNumber += order.ProductCount;
        }
      });
    }
    
    function approveOrder(order) {
      Utils.setObjectInSessionStorage("order",order)
      $location.path("/tab/approve-detail/"+order.Oid);
    }

    function approve() {
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
            $ionicLoading.show({
              template: '数据提交中...'
            });
            dataStore.auditOrders(selectedOrders).then(function (data) {
              $ionicLoading.hide();
              if (data.ErrorItemList.length > 0) {
                var message = '';
                data.ErrorItemList.forEach(function (error) {
                  message += error.ErrorMsg + '<br>'
                });
                ionicToast.show(message, 'top', false, 4000);

              } else {
                ionicToast.show('审核成功', 'top', false, 2500);
                //refresh account data
                query(false);
              }
            })
          }
        });
      }
    }

    function doRefresh() {
      vm.pageIndex = 0;
      query(false);
    }

    function query(isShowDialog) {
      vm.pageIndex = 0;
      vm.orders = [];
      vm.noMoreData = true;
      loadMore(isShowDialog);
      if (vm.nameFilter.length === 0) {
        vm.noMoreData = false;
      }
    }

    function loadMore(showLoadingBar) {
      var account = Utils.getObjectFromSessionStorage(Constants.CACHE_ACCOUNT_KEY);
      vm.pageIndex = vm.pageIndex + 1;
      var orderState = 0;
      if (account.MallAgid == 7) {
        orderState = 20;
      } else if (account.MallAgid == 13) {
        orderState = 30
      } else if (account.MallAgid  == 12) {
        orderState = 40
      }
      if (showLoadingBar) {
        $ionicLoading.show({
          template: '数据加载中...'
        });
      }
      dataStore.getOrders({
        pageIndex: vm.pageIndex,
        osn: vm.nameFilter,
        orderState: orderState
      }).then(
        function (data) {
          if (data.Data.OfflineOrderList.length > 0) {
            data.Data.OfflineOrderList.forEach(function (order) {
              order.isSelected = false;
              vm.orders.push(order);
            })
          } else {
            vm.noMoreData = true;
          }
          if (showLoadingBar) {
            $ionicLoading.hide();
          }
        },
        function (data) {
          vm.noMoreData = true;
          if (showLoadingBar) {
            $ionicLoading.hide();
          }
        }
        );
      $scope.$broadcast('scroll.infiniteScrollComplete');
    }

    function clear() {
      vm.nameFilter = '';
    }

  });
