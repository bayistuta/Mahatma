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

  })
  .controller('OrdersCtrl', function ($scope, dataStore, Utils, Constants, $ionicLoading, ionicToast, $ionicPopup) {
    var vm = this;
    vm.orders = [];
    vm.nameFilter = '';
    vm.clear = clear;
    vm.noMoreData = false;
    vm.loadMore = loadMore;
    vm.query = query;
    vm.pageIndex = 0;
    vm.showDetail = showDetail;
    vm.detailDialog = null;
    vm.isSeller = isSeller;
    init();

    function init() {
      var user = Utils.getObjectFromSessionStorage(Constants.CACHE_USER_KEY);
      loadMore(true);
      $scope.closeOrderDetail = closeOrderDetail;
    }

    function showDetail(order) {
      $ionicLoading.show({
        template: '数据加载中...'
      });
      dataStore.getOrderDetail(order.Oid).then(function (data) {
        $scope.data = data.Data;
        $scope.state = order.OrderStateDesc;
        vm.detailDialog = $ionicPopup.show({
          templateUrl: 'templates/order-detail.html',
          cssClass: 'order-dialog',
          scope: $scope,
        });
        $ionicLoading.hide();

      }, function (data) {

      });
    }

    function closeOrderDetail() {
      if (vm.detailDialog != null) {
        vm.detailDialog.close();
      }
    }

    function query() {
      vm.pageIndex = 0;
      vm.orders = [];
      vm.noMoreData = true;
      loadMore(true);
      if (vm.nameFilter.length === 0) {
        vm.noMoreData = false;
      }
    }

    function loadMore(showLoadingBar) {
      vm.pageIndex = vm.pageIndex + 1;
      if (showLoadingBar) {
        $ionicLoading.show({
          template: '数据加载中...'
        });
      }
      dataStore.getOrders({
        pageIndex: vm.pageIndex,
        osn: vm.nameFilter,
        orderState: 0
      }).then(
        function (data) {
          if (data.Data.OfflineOrderList.length > 0) {
            data.Data.OfflineOrderList.forEach(function (order) {
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
        }
        );
      $scope.$broadcast('scroll.infiniteScrollComplete');
    }

    function clear() {
      vm.nameFilter = '';
    }

    function isSeller() {
      var account = Utils.getObjectFromSessionStorage(Constants.CACHE_ACCOUNT_KEY);
      vm.accountType = account.MallAgid;
      return vm.accountType == 9;
    }

  })

  .controller('OrderCreateCtrl', function ($scope, dataStore, Utils, Constants, $ionicLoading, ionicToast, $state, $location, $ionicHistory) {
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

    init();

    function init() {
      var account = Utils.getObjectFromSessionStorage(Constants.CACHE_ACCOUNT_KEY);
      if (!account) {
        $location.path('/login');
      }
      if (account.UserShopList.length > 0) {
        vm.storeName = account.UserShopList[0].StoreName;
        vm.storeId = account.UserShopList[0].StoreId;
        vm.sellerCredit = account.RedMoney;
      }
      loadCategories();
    }

    function calcCommissionMoney() {
      vm.commissionMoney = (vm.cashMoney * 0.15).toFixed(2) - 0.0;
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
        dataStore.getUserByName(vm.buyerName).then(
          function (data) {
            if (!data.Data) {
              ionicToast.show('没有找到您输入的买家，请确认后重新输入', 'top', false, 2500);
              vm.buyerName = '';
              return;
            } else {
              vm.buyerId = data.Data.Uid;
              vm.buyerCredit = data.Data.RedMoney;
            }
          },
          function (data) {
            ionicToast.show('没有找到您输入的买家，请确认后重新输入', 'top', false, 2500);
            vm.buyerName = '';
          }
        );
      }
    }

    function loadCategories() {
      $ionicLoading.show({
        template: '数据加载中...'
      });
      dataStore.getCategories(0).then(
        function (data) {
          vm.categories = data.Data;
          $ionicLoading.hide();
        },
        function (data) {
          $ionicLoading.hide();
        }
      );
    }

    function createOrder() {
      if (vm.commissionMoney > 0 && ((vm.cashCommissionMoney - 0.0) + (vm.redCommissionMoney - 0.0)) != (vm.commissionMoney - 0)) {
        ionicToast.show('请输入正确的广告费金额', 'top', false, 2500);
        return;
      }
      $ionicLoading.show({
        template: '数据提交中...'
      });
      dataStore.createOrder({
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
          $ionicLoading.hide();
          if (data.ErrorItemList.length > 0) {
            var message = '';
            data.ErrorItemList.forEach(function (error) {
              message += error.ErrorMsg + '<br>'
            });
            ionicToast.show(message, 'top', false, 4000);

          } else {
            ionicToast.show('报单成功', 'top', false, 1000);
            //refresh account data
            var user = Utils.getObjectFromSessionStorage(Constants.CACHE_USER_KEY);
            dataStore.getUserById(user.userId).then(
              function (data) {
                Utils.setObjectInSessionStorage(Constants.CACHE_ACCOUNT_KEY, data.Data);
                $ionicHistory.clearCache().then(function(){ $state.go('tab.orders') });
              },
              function (data) {
              }
            );
          }
        },
        function (data) {
          $ionicLoading.hide();
          ionicToast.show('报单失败', 'top', false, 2500);
        }
        );
    }
  });
