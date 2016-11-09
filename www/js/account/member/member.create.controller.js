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
			loadCities(vm.selectedProvinceId);
		}

		function changeCity(){
			vm.countries=[];
			vm.towns = [];
			loadCountries(vm.selectedCityId);
		}

		function changeCountry(){
			vm.towns = [];
			loadTowns(vm.selectedCountry);
		}

		function createMember() {
			if (vm.password != vm.confirmPassword) {
				ionicToast.show('请确保登陆密码和确认密码一致', 'top', false, 2500);
				return;
			}
		}
		
	}

})();
