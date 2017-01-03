(function () {
	'use strict';

	angular.module('mahatma')
		.controller('ProductDetailCtrl', ProductDetailCtrl);

	ProductDetailCtrl.$inject = ['$scope', 'Utils', 'CommonService', 'StoreService'];

	function ProductDetailCtrl($scope, Utils, CommonService, StoreService) {

        var vm = this;
        vm.init = init;
        
        vm.init();

        function init() {
 
        };

        /*function getProducts(options) {
            StoreService.getProducts(options).then(function(response) {
                if (response.data && response.data.Data && response.data.Data.length) {
                     vm.products = vm.products.concat(response.data.Data);
                }
               
            });
        }*/
	}
})();
