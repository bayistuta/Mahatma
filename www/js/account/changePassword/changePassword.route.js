(function () {
	'use strict';

	angular.module('mahatma')
		.config(function ($stateProvider) {
			$stateProvider
				.state('tab.changePassword', {
					url: '/account/changePassword',
					views: {
						'tab-account': {
							templateUrl: 'js/account/changePassword/changePassword.html',
							controller: 'ChangePasswordCtrl as changePasswordCtrl'
						}
					}
				})
		});
})();
