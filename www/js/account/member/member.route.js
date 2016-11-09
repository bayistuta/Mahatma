(function () {
	'use strict';

	angular.module('mahatma')
		.config(function ($stateProvider) {
			$stateProvider
				.state('tab.members', {
					url: '/members',
					views: {
						'tab-members': {
							templateUrl: 'js/account/member/member.list.html',
							controller: 'MemberCtrl as memberCtrl'
						}
					}
				})
				.state('tab.member-create', {
					url: '/members/create',
					views: {
						'tab-members': {
							templateUrl: 'js/account/member/member.create.html',
							controller: 'MemberCreateCtrl as memberCreateCtrl'
						}
					}
				})
		
		});
})();
