(function () {
	'use strict';

	angular.module('mahatma')
		.controller('TabCtrl', TabCtrl);

	TabCtrl.$inject = ['Utils', 'AccountService', 'Constants', '$state'];

	function TabCtrl(Utils, AccountService, Constants, $state) {
		var vm = this;
		vm.accountType = 0;
		vm.isShow = isShow;
		vm.isShowTabs = isShowTabs;
		vm.isLogin = isLogin;
		vm.goToState = goToState;
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

		function isLogin() {
			return vm.accountType !== 0 ? 'ng-show' : 'ng-hide';;
		}

		function isShowTabs() {
			return vm.accountType > 0 ? '' : 'hide-tabs';
		}

		function goToState(state) {
			$state.go(state, {}, {
				reload: true,
				inherit: false,
				notify: true
			});
		}
	}
})();
