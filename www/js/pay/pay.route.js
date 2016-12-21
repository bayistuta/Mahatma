(function () {
	'use strict';

	angular.module('mahatma')
		.config(function ($stateProvider) {
			$stateProvider
				.state('pay', {
					url: '/pay',
                    templateUrl: 'js/pay/pay.html',
					controller: 'PayCtrl as payCtrl',
					data: {
						requireLogin: true,
					}
				})
		});
})();
