(function () {
	'use strict';

	angular.module('mahatma')
		.config(function ($stateProvider) {
			$stateProvider
				.state('tab.shipAddressList', {
					url: '/account/shipAddressList',
					views: {
						'tab-account': {
							templateUrl: 'js/account/shipAddress/shipAddress.list.html',
							controller: 'ShipAddressListCtrl as shipAddressListCtrl'
						}
					}
				})
				.state('tab.shipAddressCreate', {
					url: '/account/shipAddressCreate',
					views: {
						'tab-account': {
							templateUrl: 'js/account/shipAddress/shipAddress.create.html',
							controller: 'ShipAddressCreateCtrl as shipAddressCreateCtrl'
						}
					}
				})
		});
})();
