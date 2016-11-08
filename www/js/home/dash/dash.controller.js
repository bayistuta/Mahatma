(function () {
	'use strict';

	angular.module('mahatma')
		.controller('DashCtrl', DashCtrl);

	DashCtrl.$inject = ['Utils', 'CommonService', 'Constants', '$ionicPopup'];

	function DashCtrl(Utils, CommonService, Constants, $ionicPopup) {
		var vm = this;
		vm.account = null;
		vm.notify = notify;
		vm.isSeller = isSeller;
		vm.isLogin = isLogin;
		vm.checkAppVersion = checkAppVersion;
		init();

		function init() {
			vm.checkAppVersion();
			vm.account  = Utils.getObjectFromSessionStorage(Constants.CACHE_ACCOUNT_KEY, null);
		}

		function checkAppVersion() {
			CommonService.getAppversion().then(function (response) {
				var serverVersion = response.data.Data.CurrentVersion.replace(/\./g, '');
				var clientVersion = applicationConfig.version.replace(/\./g, '');
				if (serverVersion.length === 4) {
					serverVersion = serverVersion.substr(0,3);
				}
				var downloadUrl = response.data.Data.DownloadUrl;
				if (parseInt(serverVersion) > parseInt(clientVersion)) {
					$ionicPopup.alert({
						title: '提示',
						template: '检测到最新的商城版本，请点击确定下载后安装。',
						okText: '确定'
					}).then(function () {
						if (ionic) {
							ionic.Platform.exitApp()
						}
						window.open(downloadUrl, '_system', 'location=yes');
					});
				}
			});
		}


		function notify() {
			ionicToast.show('模块开发中', 'middle', false, 2500);
		}

		function isSeller() {
			return vm.account && vm.account.MallAgid == 9;
		}

		function isLogin() {
			return vm.account ? true : false;
		}
	}
})();
