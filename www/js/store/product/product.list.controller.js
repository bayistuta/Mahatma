(function () {
	'use strict';

	angular.module('mahatma')
		.controller('ProductListCtrl', ProductListCtrl);

	ProductListCtrl.$inject = ['$scope', 'Utils', 'CommonService', 'StoreService', '$state'];

	function ProductListCtrl($scope, Utils, CommonService, StoreService, $state) {

        var vm = this;
        vm.init = init;
        
        vm.init();

        function init() {
            var params = $state.params;
            if (params && params.categoryId) {
                getProducts({
                    CateId: params.categoryId,
                });
            } 
        };

        function getProducts(options) {
            StoreService.getProducts(options).then(function(response) {
                if (response.data && response.data.Data && response.data.Data.length) {
                     vm.products = vm.products.concat(response.data.Data);
                }
               
            });
        }
	}
})();
