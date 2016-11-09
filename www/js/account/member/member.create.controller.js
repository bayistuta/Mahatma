(function () {
	'use strict';

	angular.module('mahatma')
		.controller('MemberCreateCtrl', MemberCreateCtrl);

	MemberCreateCtrl.$inject = ['Utils', 'AccountService', 'Constants', 'ionicToast',
		'CommonService', 'OrderService'];

	function MemberCreateCtrl(Utils, AccountService, Constants, ionicToast, CommonService, OrderService) {
		var vm = this;
		vm.userName = '';
		vm.realName= '',
		vm.regionId = '';
		vm.verifyCode = '';
		vm.gender = '0';
		vm.address = '';
		vm.password = '';
		vm.confirmPassword= '';
		vm.mobile = '';
		vm.account = null;
		vm.provinces = [];
		vm.cities = [];
		vm.countries = [];
		vm.towns = [];
		vm.selectedProvinceId = '';
		vm.selectedCityId = '';
		vm.selectedCountryId = '';
		vm.selectedTownId = '';
		vm.changeProvince = changeProvince;
		vm.changeCity = changeCity;
		vm.changeCountry = changeCountry
		vm.createMember = createMember;
		vm.getVerifyCode = getVerifyCode;
		vm.disableVerifyButton = false;
		init();

		function init() {
			vm.account = Utils.getObjectFromSessionStorage(Constants.CACHE_ACCOUNT_KEY);
			loadProvince();
		}

		function loadProvince() {
			CommonService.getRegions(0).then(
				function (response) {
					vm.provinces = response.data.Data;
				}
			);
		}

		function loadCities() {
			CommonService.getRegions(vm.selectedProvinceId).then(
				function (response) {
					vm.cities = response.data.Data;
				}
			);
		}

		function loadCountries() {
			CommonService.getRegions(vm.selectedCityId).then(
				function (response) {
					vm.countries = response.data.Data;
				}
			);
		}

		function loadTowns() {
			CommonService.getRegions(vm.selectedCountryId).then(
				function (response) {
					vm.towns = response.data.Data;
				}
			);
		}

		function changeProvince(){
			vm.cities = [];
			vm.countries=[];
			vm.towns = [];
			vm.selectedCountryId = '';
			vm.selectedTownId = '';
			vm.selectedCityId = '';
			loadCities(vm.selectedProvinceId);
		}

		function changeCity(){
			vm.countries=[];
			vm.towns = [];
			vm.selectedCountryId = '';
			vm.selectedTownId = '';
			loadCountries(vm.selectedCityId);
		}

		function changeCountry(){
			vm.towns = [];
			vm.selectedTownId = '';
			loadTowns(vm.selectedCountryId);
		}

		function createMember() {
			if (vm.password != vm.confirmPassword) {
				ionicToast.show('请确保登陆密码和确认密码一致', 'top', false, 2500);
				return;
			}
			var regionId = '';
			if (vm.selectedTownId != ''){
				regionId = vm.selectedTownId;
			} else if (vm.selectedCountryId != '') {
				regionId = vm.selectedCountryId;
			} else if (vm.selectedCityId != '') {
				regionId = vm.selectedCityId;
			} else if (vm.selectedProvinceId != '') {
				regionId = vm.selectedProvinceId;
			}

			AccountService.createMember({
				userName: vm.userName,
				realName: vm.realName,
				mobile: vm.mobile,
				verifyCode: vm.verifyCode,
				gender: vm.gender,
				regionId: regionId,
				address: vm.address,
				password: vm.password,
			}).then(function() {
				ionicToast.show('恭喜您，会员创建成功!', 'top', false, 1500);
				Utils.toLocation('/tab/members', true);
			});
		}

		function getVerifyCode() {
			if (vm.mobile.length === 11) {
				AccountService.sendSmsVerifyCode(vm.mobile).then(function(){
					vm.disableVerifyButton = true;
					ionicToast.show('验证码发送成功!', 'top', false, 1500);
				});
			} else {
					ionicToast.show('请输入正确的手机号码', 'top', false, 2500);
			}
		}
		
	}

})();
