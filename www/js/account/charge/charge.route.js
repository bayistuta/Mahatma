(function () {
	'use strict';

	angular.module('mahatma')
		.config(function ($stateProvider) {
			$stateProvider
				.state('tab.charge', {
					url: '/account/charge',
					views: {
						'tab-account': {
							templateUrl: 'js/account/charge/charge.html',
							controller: 'ChargeCtrl as chargeCtrl'
						}
					}

				})
		});
})();
