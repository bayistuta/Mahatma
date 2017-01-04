(function () {
	'use strict';

	angular.module('mahatma')
		.controller('CategoryCtrl', CategoryCtrl);

	CategoryCtrl.$inject = ['$scope', 'Utils', 'CommonService', 'StoreService'];

	function CategoryCtrl($scope, Utils, CommonService, StoreService) {
        var vm = this;
        vm.init = init;
        vm.categories = [];
        vm.subCategories =[];
        vm.products = [];
        vm.selectedCategory = null;
        vm.keyword='';

        vm.selectCategory = selectCategory;
        vm.searchProduct = searchProduct;
        vm.init();

        function init() {
            getCategories();
        };

        function getCategories() {
            CommonService.getCategories(0).then(function(response) {
                if (response.data && response.data.Data) {
                     vm.categories = response.data.Data;
                     selectCategory(vm.categories[0]);
                }
               
            });
        }

        function selectCategory(category) {
            vm.selectedCategory = category;
            CommonService.getCategories(category.CateId).then(function(response) {
                if (response.data && response.data.Data) {
                    var subCategories = [];
                    var result = response.data.Data;
                    result.forEach(function(subCategory){
                        subCategory.children = [];
                        subCategories.push(subCategory);
                        CommonService.getCategories(subCategory.CateId).then(function(response2) {
                            if (response2.data && response2.data.Data){
                                subCategory.children = response2.data.Data;
                            }
                        });
                    })
                    vm.subCategories = subCategories;
                }
            });
        }

        function searchProduct() {
            var target = '/tab/search/0/' + vm.keyword;
            Utils.toLocation(target, false);
        }
	}
})();
