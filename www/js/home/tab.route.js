(function () {
	'use strict';

	angular.module('mahatma')
		.config(function ($stateProvider) {
			$stateProvider
				.state('tab', {
					url: '/tab',
					abstract: true,
					templateUrl: 'js/home/tab.html',
					controller: 'TabCtrl as tabCtrl',
					data: {
						requireLogin: false,
					},
					resolve: {
						user: function(Utils, Constants, AccountService) {
							//var jwtToken = Utils.getObjectFromSessionStorage(Constants.CACHE_TOKEN_KEY, null);
							var account = Utils.getObjectFromSessionStorage(Constants.CACHE_ACCOUNT_KEY, null);
							var username = localStorage.getItem('userName') || '';
							var password = localStorage.getItem('password') || '';
							if (account === null && username.length > 0) {
								//save login
								AccountService.signIn(username, password);
							}
						}
					}
				})
		});
})();
