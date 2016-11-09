(function () {
	'use strict';

	angular.module('mahatma')
		.controller('MemberCtrl', MemberCtrl);

	MemberCtrl.$inject = ['$scope', 'Utils', 'AccountService', 'Constants', 
		'ionicToast', '$rootScope', '$ionicPopup'];

	function MemberCtrl($scope, Utils, AccountService, Constants, ionicToast, $rootScope, $ionicPopup) {
		var vm = this;
		vm.pageIndex = 0;
		vm.members = [];
		vm.mobile = '';
		vm.account = null;
		//basic feature
		vm.search = search;
		vm.loadMembers = loadMembers;
		vm.refreshMembers = refreshMembers;
		vm.loadMoreMembers = loadMoreMembers;
		vm.noMoreData = true;
		vm.dataLoaded = false;
		
		init();

		function init() {
			vm.account = Utils.getObjectFromSessionStorage(Constants.CACHE_ACCOUNT_KEY, null);
			loadMembers();
		}

		function loadMembers() {
			AccountService.getMembers({
				pageIndex: vm.pageIndex,
				userName: '',
				mobile: vm.mobile
			}).then(
				function (response) {
					if (response.data.Data.UserList.length > 0) {
						if (response.data.Data.Pagination.PageIndex == 1) {
							vm.members = [];
						}
						response.data.Data.UserList.forEach(function (member) {
							vm.members.push(member);
						});
					}
					vm.noMoreData = response.data.Data.Pagination.PageIndex >= response.data.Data.Pagination.PageCount;
					vm.dataLoaded = true;
					$scope.$broadcast('scroll.infiniteScrollComplete');
					$scope.$broadcast('scroll.refreshComplete');
				},
				function () {
					$scope.$broadcast('scroll.infiniteScrollComplete');
					$scope.$broadcast('scroll.refreshComplete');
				}
				);
		}

		function search() {
			vm.pageIndex = 0;
			loadMembers();
		}

		function refreshMembers() {
			$rootScope.showLoadingBar = false;
			vm.pageIndex = 0;
			loadMembers();
			console.log('refresh');
		}

		function loadMoreMembers() {
			vm.pageIndex++;
			$rootScope.showLoadingBar = false;
			loadMembers();
			console.log('scroll');
		}
	}
})();
