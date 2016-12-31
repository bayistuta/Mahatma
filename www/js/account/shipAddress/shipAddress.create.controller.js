(function () {
	'use strict';

	angular.module('mahatma')
		.controller('ShipAddressCreateCtrl', ShipAddressCreateCtrl);

	ShipAddressCreateCtrl.$inject = ['AccountService', 'CommonService', 'ionicToast',
	'Constants', 'Utils'];

	function ShipAddressCreateCtrl(AccountService, CommonService, ionicToast,
	Constants, Utils) {
		var vm = this;
		vm.userName = '';
		vm.mobile = '';
		vm.address='';
		vm.account = null;
		vm.alias = '';

		vm.init = init;
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
		vm.createShipAddress = createShipAddress;

		vm.init();

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

		function createShipAddress() {
			if (vm.selectedTownId == '' ||
				vm.selectedCountryId == '' ||
				vm.selectedCityId == '' ||
				vm.selectedProvinceId == ''
			) {
				ionicToast.show('请选择正确的省市区', 'top', false, 2500);
				return;
			}
			AccountService.addShipAddress({
				Uid: vm.account.Uid,
				Alias: vm.alias,
				Mobile: vm.mobile,
				Consignee: vm.userName,
				ProvinceId: vm.selectedProvinceId,
				CityId: vm.selectedCityId,
				CountryId: vm.selectedCountryId,
				TownId: vm.selectedTownId,
				Address:vm.address
			}).then(function() {
				ionicToast.show('恭喜您，地址创建成功!', 'top', false, 1500);
				Utils.toLocation('/tab/account/shipAddressList', true);
			});
		}
	}
})();
