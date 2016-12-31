(function () {
	'use strict';

	angular.module('mahatma')
		.config(function ($stateProvider) {
			$stateProvider
				.state('tab.favoriteProduct', {
					url: '/account/favoriteProduct',
					views: {
						'tab-account': {
							templateUrl: 'js/account/favorite/favorite.product.list.html',
							controller: 'FavoriteProductCtrl as favoriteProductCtrl'
						}
					}
				})
				.state('tab.favoriteStore', {
					url: '/account/favoriteStore',
					views: {
						'tab-account': {
							templateUrl: 'js/account/favorite/favorite.store.list.html',
							controller: 'FavoriteStoreCtrl as favoriteStoreCtrl'
						}
					}
				})
		});
})();
