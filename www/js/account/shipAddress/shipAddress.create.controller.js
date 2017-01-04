(function () {
	'use strict';

	angular.module('mahatma')
		.controller('ShipAddressCreateCtrl', ShipAddressCreateCtrl);

	ShipAddressCreateCtrl.$inject = ['AccountService', 'CommonService', 'ionicToast',
	'Constants', 'Utils', '$state'];

	function ShipAddressCreateCtrl(AccountService, CommonService, ionicToast,
	Constants, Utils, $state) {
		var vm = this;
		vm.userName = '';
		vm.mobile = '';
		vm.address='';
		vm.account = null;
		vm.alias = '';
		vm.said = 0;

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
			var params = $state.params;
			if (params && params.said) {
				vm.said = params.said - 0;
				AccountService.getShipAddress().then(function(response){
					if(response.data.Data) {
						var addresses = response.data.Data;
						var address = addresses.filter(function (addr) {
							return addr.SaId == vm.said;
						});
						if (address && address.length == 1) {
							vm.userName = address[0].Consignee;
							vm.mobile = address[0].Mobile;
							vm.address = address[0].Address;
							vm.alias = address[0].Alias;
							vm.selectedProvinceId = address[0].ProvinceId;
							vm.selectedCountryId = address[0].CountryId;
							vm.selectedTownId = address[0].TownId;
							vm.selectedCityId = address[0].CityId;
							if (vm.selectedProvinceId > 0) {
								loadCities();
							}
							if (vm.selectedCityId > 0) {
								loadCountries();
							}
							if (vm.selectedCountryId > 0) {
								loadTowns();
							}
						}
					}
			 });
			}
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
			if (vm.said === 0) {
				AccountService.addShipAddress({
					Uid: vm.account.Uid,
					Alias: vm.alias,
					Mobile: vm.mobile,
					Consignee: vm.userName,
					ProvinceId: vm.selectedProvinceId,
					CityId: vm.selectedCityId,
					CountryId: vm.selectedCountryId,
					TownId: vm.selectedTownId,
					Address:vm.address,
					Email: '',
					Phone: '',
					ZipCode: '',
					IsDefault: 0
				}).then(function() {
					ionicToast.show('恭喜您，地址创建成功!', 'top', false, 1500);
					Utils.toLocation('/tab/account/shipAddressList', true);
				});
			} else {
					AccountService.editShipAddress({
						SaId: vm.said,
						Uid: vm.account.Uid,
						Alias: vm.alias,
						Mobile: vm.mobile,
						Consignee: vm.userName,
						ProvinceId: vm.selectedProvinceId,
						CityId: vm.selectedCityId,
						CountryId: vm.selectedCountryId,
						TownId: vm.selectedTownId,
						Address:vm.address,
						Email: '',
						Phone: '',
						ZipCode: '',
						IsDefault: 0
				}).then(function() {
					ionicToast.show('恭喜您，地址编辑成功!', 'top', false, 1500);
					Utils.toLocation('/tab/account/shipAddressList', true);
				});
			}

		}
	}
})();
