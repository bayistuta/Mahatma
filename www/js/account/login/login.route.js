(function () {
	'use strict';

	angular.module('mahatma')
		.config(function ($stateProvider) {
			$stateProvider
				.state('login', {
					url: '/login',
					templateUrl: 'js/account/login/login.html',
					controller: 'LoginCtrl as loginCtrl',
					data: {
						requireLogin: false,
					}
				})
		});
})();
