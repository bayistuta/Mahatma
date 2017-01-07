(function () {
	'use strict';

	angular.module('mahatma')
		.controller('DashCtrl', DashCtrl);

	DashCtrl.$inject = ['$scope', 'Utils', 'CommonService', 'Constants', '$ionicPopup', '$cordovaContacts',
		'advertList', 'ionicToast', 'StoreService'];

	function DashCtrl($scope, Utils, CommonService, Constants, $ionicPopup, $cordovaContacts,
		advertList, ionicToast, StoreService) {
		var vm = this;
		vm.account = null;
		vm.notify = notify;
		vm.isSeller = isSeller;
		vm.isLogin = isLogin;
		vm.checkAppVersion = checkAppVersion;
		vm.signOut = signOut;
		vm.advertList = [];
		vm.getSectionData = getSectionData;
		vm.goTo = goTo;

		vm.bannerData = [];
		vm.excellentData = [];
		vm.e1Data = {};
		vm.e2Data = {};
		vm.e3Data = {};
		vm.e4Data = {};
		vm.introData = [];
		vm.fData = [];
		init();

		function init() {
			vm.swiperOptions = {
				autoplay: 3000,
			};
			var adverts = Utils.getObjectFromSessionStorage('advert');
			if (!adverts) {
				vm.advertList = advertList.data.Data.AdvertList;
				Utils.setObjectInSessionStorage('advert', vm.advertList);
			} else {
				vm.advertList = adverts;
			}

			vm.bannerData = vm.getSectionData('APP首页轮换广告'); 
			vm.introData = vm.getSectionData('APP今日推荐商品'); 
			vm.excellentData = vm.getSectionData('APP精选推荐商品'); 
			for(var i = 1 ; i <= 6 ; i++) {
				vm.fData.push({
					data: vm.getSectionData('APP' + i + 'F商品')
				});
			}
			//精品推荐
			StoreService.getProductDetail(vm.excellentData[0].ExtField1).then(function(response){
				vm.e1Data = response.data.Data.ProductInfo;
			})
			StoreService.getProductDetail(vm.excellentData[1].ExtField1).then(function(response){
				vm.e2Data = response.data.Data.ProductInfo;
			})
			StoreService.getProductDetail(vm.excellentData[2].ExtField1).then(function(response){
				vm.e3Data = response.data.Data.ProductInfo;
			})
			StoreService.getProductDetail(vm.excellentData[3].ExtField1).then(function(response){
				vm.e4Data = response.data.Data.ProductInfo;
			})
			vm.checkAppVersion();
			//vm.getAdvertList();
			vm.account  = Utils.getObjectFromSessionStorage(Constants.CACHE_ACCOUNT_KEY, null);
		}

		function signOut() {
			Utils.toLocation('/login', true);
		}

		function getSectionData(title) {
			return vm.advertList.filter(function(product){
				return product.PosTitle === title;
			}).sort(function(a, b){
				return a.DisplayOrder - b.DisplayOrder;
			});

		}

		function checkAppVersion() {
			CommonService.getAppversion().then(function (response) {
				var serverVersion = response.data.Data.CurrentVersion.replace(/\./g, '');
				var clientVersion = applicationConfig.version.replace(/\./g, '');
				if (serverVersion.length === 4) {
					serverVersion = serverVersion.substr(0,3);
				}
				var downloadUrl = response.data.Data.DownloadUrl;
				if (parseInt(serverVersion) > parseInt(clientVersion)) {
					$ionicPopup.alert({
						title: '提示',
						template: '检测到最新的商城版本，请点击确定下载后安装。',
						okText: '确定'
					}).then(function () {
						if (ionic) {
							ionic.Platform.exitApp()
						}
						window.open(downloadUrl, '_system', 'location=yes');
					});
				}
			});
		}

		function notify() {
			ionicToast.show('模块开发中', 'middle', false, 2500);
		}

		function isSeller() {
			return vm.account && vm.account.MallAgid == 9;
		}

		function isLogin() {
			return vm.account ? true : false;
		}
		
		function goTo(pid) {
			Utils.setObjectInSessionStorage('current_pid', pid);
			Utils.toLocation('/tab/product/'+pid, false);
    }
		
	}
})();
