(function () {
	'use strict';

	angular.module('mahatma')
		.controller('TabCtrl', TabCtrl);

	TabCtrl.$inject = ['Utils', 'AccountService', 'Constants'];

	function TabCtrl(Utils, AccountService, Constants) {
		var vm = this;
		vm.accountType = 0;
		vm.isShow = isShow;
		vm.isShowTabs = isShowTabs;
		init();

		function init() {
			var account = Utils.getObjectFromSessionStorage(Constants.CACHE_ACCOUNT_KEY, null);
			if (account !== null) {
				vm.accountType = account.MallAgid;
			}
		}
		function isShow(roles) {
			if (vm.accountType == 0) {
				return 'ng-hide';
			}
			var isRole = false;
			roles.forEach(function (role) {
				if (role == vm.accountType) {
					isRole = true;
				}
			})
			return isRole ? 'ng-show' : 'ng-hide';

		}

		function isShowTabs() {
			return vm.accountType > 0 ? '' : 'hide-tabs';
		}
	}
})();
