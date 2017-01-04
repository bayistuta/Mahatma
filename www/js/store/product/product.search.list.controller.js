(function () {
	'use strict';

	angular.module('mahatma')
		.controller('ProductSearchResultCtrl', ProductSearchResultCtrl);

	ProductSearchResultCtrl.$inject = ['$scope', 'Utils', 'CommonService', 'StoreService', '$state'];

	function ProductSearchResultCtrl($scope, Utils, CommonService, StoreService, $state) {

        var vm = this;
        vm.init = init;
        vm.cateId = 0;
        vm.keyword = '';
        vm.sortType='';
        vm.sortDirection = 0;

        vm.sort = sort;
        vm.searchProduct = searchProduct;
        vm.init();

        function init() {
            var params = $state.params;
            var options = {};
            if (params && params.keyword) {
                vm.cateId = params.categoryId;
                vm.keyword = params.keyword;
                getProducts({
                    CateId: vm.cateId,
                    Word: vm.keyword
                });
            } 
        };

        function getProducts(options) {
            StoreService.searchProducts(options).then(function(response) {
                if (response.data && response.data.Data) {
                     vm.products = response.data.Data.ViewModel.ProductList;
                }
               
            });
        }

        function searchProduct() {
            getProducts({
                CateId: vm.cateId,
                Word: vm.keyword
            });
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
                Word: vm.keyword,
                SortColumn: vm.sortType,
                SortDirection: vm.sortDirection,
            });
        }
	}
})();
