(function () {
	'use strict';

	angular.module('mahatma')
		.config(function ($stateProvider) {
			$stateProvider
				.state('tab.account', {
					url: '/account',
					views: {
						'tab-account': {
							templateUrl: 'js/account/setting/setting.html',
							controller: 'AccountSettingCtrl as accountCtrl'
						}
					}
				})
		});
})();
