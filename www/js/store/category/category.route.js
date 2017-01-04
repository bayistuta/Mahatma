(function () {
	'use strict';

	angular.module('mahatma')
		.config(function ($stateProvider) {
			$stateProvider
				.state('tab.categories', {
					url: '/categories',
					views: {
						'tab-categories': {
							templateUrl: 'js/store/category/category.html',
							controller: 'CategoryCtrl as categoryCtrl'
						}
					},
          data: {
						requireLogin: false,
					},

				})
				

		});
})();
