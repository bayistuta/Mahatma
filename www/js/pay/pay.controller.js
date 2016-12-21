(function () {
	'use strict';

	angular.module('mahatma')
		.controller('PayCtrl', PayCtrl);

	PayCtrl.$inject = ['Utils', 'AccountService', 'Constants', '$ionicPopup', '$window'];

	function PayCtrl(Utils, AccountService, Constants, $ionicPopup, $window) {
		var vm = this;
		vm.wechat = null;
		vm.pay = pay;
		vm.pay2 = pay2;
		vm.pay3 = pay3;
		init();

		function init() {
			vm.account  = Utils.getObjectFromSessionStorage(Constants.CACHE_ACCOUNT_KEY, null);
			ionic.Platform.ready(function() {
				vm.wechat = window.Wechat;
			});
		}

		function pay() {
			AccountService.recharge().then(function(response){
				var resultUrl = '';
				resultUrl += 'appid='+response.data.Data.AppId+'&';
				resultUrl += 'noncestr='+response.data.Data.NonceStr+'&';
				resultUrl += 'package='+response.data.Data.PackageValue+'&';
				resultUrl += 'prepayid='+response.data.Data.PrepayId+'&';
				resultUrl += 'timestamp='+response.data.Data.TimeStamp+'&';
				resultUrl += 'sign='+response.data.Data.Sign;
				resultUrl = $window.encodeURIComponent(resultUrl);
				resultUrl = 'weixin://wap/pay?' + resultUrl;
				window.open(resultUrl, '_system', 'location=yes');
				
			});
			
		}

		function pay2() {
			AccountService.recharge().then(function(response){
				var params = {
					partnerid: response.data.Data.PartnerId, // merchant id
					prepayid: response.data.Data.PrepayId, // prepay id
					noncestr: response.data.Data.NonceStr, // nonce
					timestamp: response.data.Data.TimeStamp, // timestamp
					sign: response.data.Data.Sign, // signed string
				};

				vm.wechat.sendPaymentRequest(params, function () {
					alert("Success");
				}, function (reason) {
					alert("Failed: " + reason);
				});
			});
			
		}

		function pay3() {
			AccountService.recharge2().then(function(response){
				var params = {
					partnerid: response.data.partnerid, // merchant id
					prepayid: response.data.prepayid, // prepay id
					noncestr: response.data.noncestr, // nonce
					timestamp: response.data.timestamp, // timestamp
					sign: response.data.sign, // signed string
				};

				vm.wechat.sendPaymentRequest(params, function () {
					alert("Success");
				}, function (reason) {
					alert("Failed: " + reason);
				});
			});
			
		}

		
	}
})();
