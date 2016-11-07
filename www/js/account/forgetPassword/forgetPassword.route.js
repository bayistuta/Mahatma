(function () {
	'use strict';

	angular.module('mahatma')
		.config(function ($stateProvider) {
			$stateProvider
				.state('forgetPassword', {
					url: '/forget-password',
					templateUrl: 'js/account/forgetPassword/forget-password.html',
					controller: 'ForgetPasswordCtrl as forgetPasswordCtrl',
					data: {
						requireLogin: false,
					}
				})
		});
})();
