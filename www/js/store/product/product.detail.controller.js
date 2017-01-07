(function () {
	'use strict';

	angular.module('mahatma')
		.controller('ProductDetailCtrl', ProductDetailCtrl);

	ProductDetailCtrl.$inject = ['$scope', 'Utils', 'CommonService', 'StoreService', 'AccountService',
    '$state', 'ionicToast','Constants' , 'product'];

	function ProductDetailCtrl($scope, Utils, CommonService, StoreService,
        AccountService, $state, ionicToast, Constants, product) {
        var vm = this;
        vm.product = '';
        vm.accountType = 0;

        vm.bookMark = bookMark;
        vm.buyNow = buyNow;
        vm.addToCart = addToCart;
        vm.init = init;
        vm.isLogin = isLogin;
        
        vm.init();

        function init() {
            var account = Utils.getObjectFromSessionStorage(Constants.CACHE_ACCOUNT_KEY, null);
			if (account !== null) {
				vm.accountType = account.MallAgid;
			}
            vm.swiperOptions = {
			    autoplay: 3000,
			};
            vm.product = product.data.Data;
        };

        function addToCart() {
            StoreService.addToCart({
                Pid: vm.product.Pid,
                BuyCount: 1
            }).then(function(){
                 ionicToast.show('添加购车成功', 'top', false, 1500);
            });
        }

        function buyNow() {

        }

        function bookMark() {
            AccountService.addFavoriteProduct(vm.product.Pid).then(function(){
                 ionicToast.show('收藏成功', 'top', false, 1500);
            });
        }

        function isLogin() {
			return vm.accountType !== 0 ? 'ng-show' : 'ng-hide';;
		}
        
	}
})();
