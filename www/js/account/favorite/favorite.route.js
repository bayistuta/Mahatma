(function () {
	'use strict';

	angular.module('mahatma')
		.config(function ($stateProvider) {
			$stateProvider
				.state('tab.favorite', {
					url: '/account/favorite',
					views: {
						'tab-account': {
							templateUrl: 'js/account/favorite/favorite.list.html',
							controller: 'FavoriteCtrl as favoriteCtrl'
						}
					}
				})
		});
})();
