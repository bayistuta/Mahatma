(function () {
	'use strict';

	angular.module('mahatma')
		.controller('FavoriteCtrl', FavoriteCtrl);

	FavoriteCtrl.$inject = ['AccountService', '$scope', '$rootScope', '$state',
	'ionicToast'];

	function FavoriteCtrl(AccountService, $scope, $rootScope, $state, ionicToast) {
		var vm = this;
		vm.products = [];	
		vm.stores = [];	
		vm.pageSize = 6;
		vm.pageIndex = 1;
		vm.showType = 0;
		vm.dataLoaded = false;
		vm.noMoreData = false;
		
		vm.init = init;
		vm.loadMoreData = loadMoreData;
		vm.changeType = changeType;
		vm.removeRecord = removeRecord;
		vm.init();

		function init() {
			changeType(vm.showType);
		}

		function loadFavoriteProducts() {
			AccountService.getFavoriteProductList({
				PageSize: vm.pageSize,
				PageIndex: vm.pageIndex
			}).then(function(response){
				if(response.data.Data && response.data.Data.FavoriteProductList) {
					vm.products = vm.products.concat(response.data.Data.FavoriteProductList);
				}
				vm.noMoreData = response.data.Data.Pagination.PageIndex >= response.data.Data.Pagination.PageCount;
				vm.dataLoaded = true;
				$scope.$broadcast('scroll.infiniteScrollComplete');
			});
		}

		function loadFavoriteStores() {
			AccountService.getFavoriteStoreList({
				PageSize: vm.pageSize,
				PageIndex: vm.pageIndex
			}).then(function(response){
				if(response.data.Data && response.data.Data.FavoriteStoreList) {
					vm.stores = vm.stores.concat(response.data.Data.FavoriteStoreList);
				}
				vm.noMoreData = response.data.Data.Pagination.PageIndex >= response.data.Data.Pagination.PageCount;
				vm.dataLoaded = true;
				$scope.$broadcast('scroll.infiniteScrollComplete');
			});
		}

		function changeType(type) {
			vm.showType = type;
			vm.pageIndex = 1;
			vm.noMoreData = false;
			vm.dataLoaded = false;
			vm.products = [];	
			vm.stores = [];	
			if (vm.showType == 0) {
				loadFavoriteProducts();
			} else {
				loadFavoriteStores();
			}
		}

		function loadMoreData() {
			vm.pageIndex++;
			$rootScope.showLoadingBar = false;
			if (vm.showType == 0) {
				loadFavoriteProducts();
			} else {
				loadFavoriteStores();
			}
		}

		function removeRecord(id) {
			if (vm.showType == 0) {
				AccountService.removeFavoriteProduct(id).then(function(){
					ionicToast.show('商品删除成功', 'top', false, 1500);
					$rootScope.showLoadingBar = false;
					changeType(0);
				});
			} else {
				AccountService.removeFavoriteStore(id).then(function(){
					ionicToast.show('店铺删除成功', 'top', false, 1500);
					$rootScope.showLoadingBar = false;
					changeType(1);
				});
			}
		}
	}
})();
