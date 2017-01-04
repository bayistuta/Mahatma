(function () {
	'use strict';

	angular.module('mahatma')
		.controller('ProductListCtrl', ProductListCtrl);

	ProductListCtrl.$inject = ['$scope', 'Utils', 'CommonService', 'StoreService', '$state'];

	function ProductListCtrl($scope, Utils, CommonService, StoreService, $state) {

        var vm = this;
        vm.init = init;
        vm.cateId = 0;
        vm.keyword = '';
        vm.searchProduct = searchProduct;
        vm.sortType='';
        vm.sortDirection = 0;

        vm.sort = sort;
        vm.viewProduct = viewProduct;
        vm.init();

        function init() {
            var params = $state.params;
            if (params && params.categoryId) {
                vm.cateId = params.categoryId;
                getProducts({
                    CateId: params.categoryId,
                });
            } 
        };

        function getProducts(options) {
            StoreService.getProducts(options).then(function(response) {
                if (response.data && response.data.Data) {
                     vm.products = response.data.Data.ViewModel.ProductList;
                }
               
            });
        }

        function searchProduct() {
            var target = '/tab/search/' + vm.cateId + '/' + vm.keyword;
            Utils.toLocation(target, false);
        }

        function sort(sortType) {
            if (vm.sortType != sortType) {
                vm.sortDirection = 1;
            } else {
                vm.sortDirection = vm.sortDirection === 1 ? 0: 1;
            }
            vm.sortType = sortType;
            getProducts({
                CateId: vm.cateId,
                SortColumn: vm.sortType,
                SortDirection: vm.sortDirection,
            });
        }
        function viewProduct(pid) {
            Utils.setObjectInSessionStorage('current_pid', pid);
            Utils.toLocation('/tab/product/'+pid, false);
        }
	}
})();
