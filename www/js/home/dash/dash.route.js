(function () {
	'use strict';

	angular.module('mahatma')
		.config(function ($stateProvider) {
			$stateProvider
				.state('tab.dash', {
					url: '/dash',
					views: {
						'tab-dash': {
							templateUrl: 'js/home/dash/dash.html',
							controller: 'DashCtrl as dashCtrl'
						}
					},
					data: {
						requireLogin: false,
					},
					resolve: {
						advertList: function($q, $timeout, CommonService){
							return CommonService.getAdvertList();
						}
					}
				})
		});
})();
