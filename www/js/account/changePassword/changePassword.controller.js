(function () {
	'use strict';

	angular.module('mahatma')
		.controller('ChangePasswordCtrl', ChangePasswordCtrl);

	ChangePasswordCtrl.$inject = ['Utils', 'AccountService', 'Constants', 'ionicToast'];

	function ChangePasswordCtrl(Utils, AccountService, Constants, ionicToast) {
		var vm = this;
		vm.changePassword = changePassword;
		init();
		function init() {
			reset();
		}

		function changePassword() {
			if (vm.oldPassword.length === 0) {
				ionicToast.show('请输入旧密码', 'top', false, 1000);
				return;
			}
			if (vm.newPassword.length === 0) {
				ionicToast.show('请输入新密码', 'top', false, 1000);
				return;
			}
			if (vm.confirmPassword.length === 0) {
				ionicToast.show('请输入确认密码', 'top', false, 1000);
				return;
			}
			if (vm.confirmPassword != vm.newPassword) {
				ionicToast.show('新密码与确认密码不一致', 'top', false, 1000);
				return;
			}
			AccountService.changePassword(vm.mode, vm.oldPassword, vm.newPassword).then(function(response) {
				ionicToast.show('恭喜您，密码修改成功', 'top', false, 1000);
				reset();
				Utils.toLocation('/tab/account', true);
			});
    }

		function reset() {
			vm.mode = '0';
			vm.oldPassword = '';
			vm.newPassword = '';
			vm.confirmPassword = '';
		}
	}


})();
