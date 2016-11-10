(function () {
	'use strict';

	angular.module('mahatma')
		.controller('ForgetPasswordCtrl', ForgetPasswordCtrl);

	ForgetPasswordCtrl.$inject = ['Utils', 'AccountService', 'Constants', 'ionicToast'];

	function ForgetPasswordCtrl(Utils, AccountService, Constants, ionicToast) {
		var vm = this;
		vm.mobile = '';
		vm.isSendVerifyCode = false;
		vm.verifyCode = '';
		vm.newPassword = '';
		vm.confirmPassword = '';
		vm.sendVerifyCode = sendVerifyCode;
		vm.resetPassword = resetPassword;

		init();

		function init() {
		}

		function sendVerifyCode(mobile) {
			AccountService.sendSmsVerifyCode(vm.mobile).then(function (response) {
				vm.isSendVerifyCode = true;
			});
		}

		function resetPassword() {
			if (vm.verifyCode.length === 0) {
				ionicToast.show('请输入验证码', 'top', false, 1000);
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
			AccountService.resetPassword(vm.mobile, vm.verifyCode, vm.newPassword).then(function() {
				ionicToast.show('恭喜您，密码重置成功', 'top', false, 1000);
				Utils.toLocation('/login', true);
			});
		}

		function validate() {

		}

	}
})();
