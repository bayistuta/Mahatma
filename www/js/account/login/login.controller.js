(function () {
  'use strict';

  angular.module('mahatma')
    .controller('LoginCtrl', LoginCtrl);

  LoginCtrl.$inject = ['Utils', 'AccountService', 'Constants'];

  function LoginCtrl(Utils, AccountService, Constants) {
    var vm = this;
    vm.username = '';
    vm.password = '';
    vm.isSaveLogin = false;
    vm.signIn = signIn;

    init();

    function init() {
      sessionStorage.removeItem(Constants.CACHE_TOKEN_KEY);
      sessionStorage.removeItem(Constants.CACHE_ACCOUNT_KEY);
      localStorage.removeItem("userName");
      localStorage.removeItem("password");
    }
    function signIn() {
      if (vm.username.length > 0 && vm.password.length > 0) {
        AccountService.signIn(vm.username, vm.password).then(
          function () {
            if (vm.isSaveLogin) {
              localStorage.setItem("userName", vm.username);
              localStorage.setItem("password", vm.password);
            }
            Utils.toLocation('/tab/dash', true);
          });
      } else {
        ionicToast.show('请输入用户名和密码', 'middle', false, 4000);
      }
    }
  }
})();
