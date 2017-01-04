(function () {
  'use strict';

  angular.module('mahatma')
    .controller('AccountSettingCtrl', AccountSettingCtrl);

  AccountSettingCtrl.$inject = ['Utils', 'AccountService', 'Constants'];

  function AccountSettingCtrl(Utils, AccountService, Constants) {
    var vm = this;
    vm.nickName = '';
    vm.address = '';
    vm.userType = '';
    vm.balance = 0;
    vm.red = 0;
    vm.goodsmoney = 0;
    vm.performance = 0;
    vm.totalAmount = 0;

    vm.goTo = goTo;

    init();
    function init() {
      var account = Utils.getObjectFromSessionStorage(Constants.CACHE_ACCOUNT_KEY);
      vm.nickName = account.Nickname;
      vm.address = account.RegionAddress;
      vm.userType = account.MallAgName;
      vm.balance = parseFloat(account.Balance).toFixed(2);
      vm.red = parseFloat(account.RedMoney).toFixed(2);
      vm.goodsmoney = parseFloat(account.Goodsmoney).toFixed(2);
      vm.performance = parseFloat(account.Performance).toFixed(2);
      vm.totalAmount = parseFloat(account.TotalAmount).toFixed(2);
      vm.userName = account.UserName;
    }

    function goTo(location) {
      Utils.toLocation(location, false);
    }
  }
})();
