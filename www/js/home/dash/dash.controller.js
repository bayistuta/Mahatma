(function () {
	'use strict';

	angular.module('mahatma')
		.controller('DashCtrl', DashCtrl);

	DashCtrl.$inject = ['Utils', 'AccountService', 'Constants'];

	function DashCtrl(Utils, AccountService, Constants) {
		var vm = this;
    /*vm.notify = notify;
    vm.signOut = signOut;
    vm.isSeller = isSeller;
    vm.isLogin = isLogin;
    init();

    function init() {
      dataStore.getAppversion().then(function(data){
        var serverVersion = data.Data.CurrentVersion;
        var clientVersion = applicationConfig.version;
        var downloadUrl = data.Data.DownloadUrl;
        if (serverVersion !== clientVersion) {
          $ionicPopup.alert({
            title: '提示',
            template: '检测到最新的商城版本，请点击确定下载后安装。',
            okText: '确定'
          }).then(function(){
            if (ionic) {
              ionic.Platform.exitApp()
            }
            window.open(downloadUrl, '_system','location=yes');
          });
        }
      });
    }

    function signOut() {
      sessionStorage.removeItem(Constants.CACHE_USER_KEY);
      sessionStorage.removeItem(Constants.CACHE_TOKEN_KEY);
      sessionStorage.removeItem(Constants.CACHE_ACCOUNT_KEY);
      localStorage.removeItem("userName");
      localStorage.removeItem("password");
      $ionicHistory.clearCache().then(function(){ $location.path("/login"); });
    }

    function notify() {
      ionicToast.show('模块开发中', 'middle', false, 2500);
    }

    function isSeller() {
      if(!isLogin()) {
        return false;
      }
      var account = Utils.getObjectFromSessionStorage(Constants.CACHE_ACCOUNT_KEY);
      vm.accountType = account.MallAgid;
      return vm.accountType == 9;
    }
    function isLogin() {
      return Utils.getObjectFromSessionStorage(Constants.CACHE_USER_KEY) ? true: false;
    }
*/
	}
})();
