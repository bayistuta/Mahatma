/**
 * Store for User domain.
 * */
(function () {

	'use strict';

	angular
		.module('mahatma')
		.factory('AccountService', AccountService);

	AccountService.$inject = ['$q', '$http', 'Utils', 'Constants', '$rootScope'];

	function AccountService($q, $http, Utils, Constants, $rootScope) {

		function signIn(username, password) {
			var deferred = $q.defer();

			$http({
				method: 'POST',
				url: applicationConfig.token_url,
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				transformRequest: function (obj) {
					var str = [];
					for (var p in obj)
						str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
					return str.join("&");
				},
				data: { username: username, password: password, grant_type: 'password' }
			}).then(function (response) {
				var user = response.data;
				if (user) {
					sessionStorage.setItem(Constants.CACHE_TOKEN_KEY, user.access_token);
					//get user data
					$rootScope.showLoadingBar = false;
					getUserById(user.userId).then(function (responseInner) {
						if (responseInner.data.Result) {
							Utils.setObjectInSessionStorage(Constants.CACHE_ACCOUNT_KEY, responseInner.data.Data);
							deferred.resolve(responseInner);
						} else {
							deferred.reject(responseInner);
						}
					});
				} else {
					deferred.reject(response);
				}
				//get account detail
			}, function (err) {
				ionicToast.show(err.data.error_description, 'top', false, 4000);
				deferred.reject(err.data);
			});
			return deferred.promise;
		}

		function getUserById(id) {
			var deferred = $q.defer();
			var url = applicationConfig.api_url + '/' + 'User/GetUserByUid?uid=' + id;
			$http.post(url
			).then(function (response) {
				if (response.data.Result) {
					deferred.resolve(response);
				} else {
					deferred.reject(response);
				}
			}, function (err) {
				deferred.reject(err.data);
			});
			return deferred.promise;
		}

		function getUserByName(name) {
			var deferred = $q.defer();
			var url = applicationConfig.api_url + '/' + 'User/GetUserByName?userName=' + name;
			$http.post(url
			).then(function (response) {
				if (response.data.Result) {
					deferred.resolve(response);
				} else {
					deferred.reject(response);
				}
			}, function (err) {
				deferred.reject(err.data);
			});
			return deferred.promise;
		}

		function changePassword(mode, oldPassword, newPassword) {
			var deferred = $q.defer();
			var url = applicationConfig.api_url + '/' + 'Account/ChangePassword';
			$http.post(url, {
				PasswordType: mode,
				OldPassword: oldPassword,
				NewPassword: newPassword,
				ConfirmPassword: newPassword
			}
			).then(function (response) {
				if (response.data.Result) {
					deferred.resolve(response);
				} else {
					deferred.reject(response);
				}
			}, function (err) {
				deferred.reject(err.data);
			});
			return deferred.promise;
		}

		function sendSmsVerifyCode(mobile) {
			var deferred = $q.defer();
			var url = applicationConfig.api_url + '/' + 'user/SendSmsVerifyCode?mobile=' + mobile;
			$http.post(url, {
			}
			).then(function (response) {
				if (response.data.Result) {
					deferred.resolve(response);
				} else {
					deferred.reject(response);
				}
			}, function (err) {
				deferred.reject(err);
			});
			return deferred.promise;
		}

		function resetPassword(mobile, verifyCode, newPassword) {
			var deferred = $q.defer();
			var url = applicationConfig.api_url + '/' + 'Account/ResetPassword';
			$http.post(url, {
				Mobile: mobile,
				VerifyCode: verifyCode,
				PasswordType: 0,
				NewPassword: newPassword,
				ConfirmPassword: newPassword
			}
			).then(function (response) {
				if (response.data.Result) {
					deferred.resolve(response);
				} else {
					deferred.reject(response);
				}
			}, function (err) {
				deferred.reject(err);
			});
			return deferred.promise;
		}

		function getMembers(options) {
			var deferred = $q.defer();
			var url = applicationConfig.api_url + '/' + 'MyUser/MyUserList';
			$http.post(url, {
				UserName: options.userName,
				Mobile: options.mobile,
				PageIndex: options.pageIndex + 1,
				PageSize: 10
			}
			).then(function (response) {
				if (response.data.Result) {
					deferred.resolve(response);
				} else {
					deferred.reject(response);
				}
			}, function (err) {
				deferred.reject(err);
			});
			return deferred.promise;
		}

		function createMember(options) {
			var deferred = $q.defer();
			var url = applicationConfig.api_url + '/' + 'MyUser/AddUser';
			$http.post(url, {
				UserName: options.userName,
				RealName: options.realName,
				Mobile: options.mobile,
				VerifyCode: options.verifyCode,
				Gender: options.gender,
				RegionId: options.regionId,
				Address: options.address,
				Password: options.password,
				ConfirmPassword: options.password,
			}
			).then(function (response) {
				if (response.data.Result) {
					deferred.resolve(response);
				} else {
					deferred.reject(response);
				}
			}, function (err) {
				deferred.reject(err);
			});
			return deferred.promise;
		}

		function checkPayPassword(password) {
			var deferred = $q.defer();
			var url = applicationConfig.api_url + '/' + 'User/CheckPayPassword?password='+password;
			$http.post(url
			).then(function (response) {
				if (response.data.Result) {
					deferred.resolve(response);
				} else {
					deferred.reject(response);
				}
			}, function (err) {
				deferred.reject(err);
			});
			return deferred.promise;
		}

		function recharge(options) {
			var deferred = $q.defer();
			var url = applicationConfig.api_url + '/' + 'User/Recharge';
			$http.post(url, {
				Money: 0.1,
				RechargeType: '微信'
			}
			).then(function (response) {
				if (response.data.Result) {
					deferred.resolve(response);
				} else {
					deferred.reject(response);
				}
			}, function (err) {
				deferred.reject(err);
			});
			return deferred.promise;
		}

		function recharge2(options) {
			var deferred = $q.defer();
			$http.get('http://123.57.239.214:8080/payment_demo.php'
			).then(function (response) {
				if (response.data) {
					deferred.resolve(response);
				} else {
					deferred.reject(response);
				}
			}, function (err) {
				deferred.reject(err);
			});
			return deferred.promise;
		}

		function getShipAddress() {
			var deferred = $q.defer();
			var url = applicationConfig.api_url + '/' + 'User/ShipAddressList';
			$http.post(url
			).then(function (response) {
				if (response.data.Result) {
					deferred.resolve(response);
				} else {
					deferred.reject(response);
				}
			}, function (err) {
				deferred.reject(err);
			});
			return deferred.promise;
		}

		function addShipAddress(options) {
			var deferred = $q.defer();
			var url = applicationConfig.api_url + '/' + 'User/AddShipAddress';
			$http.post(url,
			options
			).then(function (response) {
				if (response.data.Result) {
					deferred.resolve(response);
				} else {
					deferred.reject(response);
				}
			}, function (err) {
				deferred.reject(err);
			});
			return deferred.promise;
		}

		function editShipAddress(options) {
			var deferred = $q.defer();
			var url = applicationConfig.api_url + '/' + 'User/EditShipAddress';
			$http.post(url,
			options
			).then(function (response) {
				if (response.data.Result) {
					deferred.resolve(response);
				} else {
					deferred.reject(response);
				}
			}, function (err) {
				deferred.reject(err);
			});
			return deferred.promise;
		}

		function setDefaultShipAddress(said) {
			var deferred = $q.defer();
			var url = applicationConfig.api_url + '/' + 'User/SetDefaultShipAddress?said='+said;
			$http.post(url
			).then(function (response) {
				if (response.data.Result) {
					deferred.resolve(response);
				} else {
					deferred.reject(response);
				}
			}, function (err) {
				deferred.reject(err);
			});
			return deferred.promise;
		}

		function removeShipAddress(said) {
			var deferred = $q.defer();
			var url = applicationConfig.api_url + '/' + 'User/DelShipAddress?said='+said;
			$http.post(url
			).then(function (response) {
				if (response.data.Result) {
					deferred.resolve(response);
				} else {
					deferred.reject(response);
				}
			}, function (err) {
				deferred.reject(err);
			});
			return deferred.promise;
		}

		function getFavoriteProductList(options) {
			var deferred = $q.defer();
			var url = applicationConfig.api_url + '/' + 'User/FavoriteProductList';
			$http.post(url, options
			).then(function (response) {
				if (response.data.Result) {
					deferred.resolve(response);
				} else {
					deferred.reject(response);
				}
			}, function (err) {
				deferred.reject(err);
			});
			return deferred.promise;
		}

		function addFavoriteProduct(pid) {
			var deferred = $q.defer();
			var url = applicationConfig.api_url + '/' + 'User/AddProductToFavorite?pid='+pid;
			$http.post(url)
			.then(function (response) {
				if (response.data.Result) {
					deferred.resolve(response);
				} else {
					deferred.reject(response);
				}
			}, function (err) {
				deferred.reject(err);
			});
			return deferred.promise;
		}

		function getFavoriteStoreList(options) {
			var deferred = $q.defer();
			var url = applicationConfig.api_url + '/' + 'User/FavoriteStoreList';
			$http.post(url,options
			).then(function (response) {
				if (response.data.Result) {
					deferred.resolve(response);
				} else {
					deferred.reject(response);
				}
			}, function (err) {
				deferred.reject(err);
			});
			return deferred.promise;
		}

		function removeFavoriteStore(storeId) {
			var deferred = $q.defer();
			var url = applicationConfig.api_url + '/' + 'User/DelFavoriteStore?storeId='+storeId;
			$http.post(url
			).then(function (response) {
				if (response.data.Result) {
					deferred.resolve(response);
				} else {
					deferred.reject(response);
				}
			}, function (err) {
				deferred.reject(err);
			});
			return deferred.promise;
		}

		function removeFavoriteProduct(productId) {
			var deferred = $q.defer();
			var url = applicationConfig.api_url + '/' + 'User/DelFavoriteProduct?pid='+productId;
			$http.post(url
			).then(function (response) {
				if (response.data.Result) {
					deferred.resolve(response);
				} else {
					deferred.reject(response);
				}
			}, function (err) {
				deferred.reject(err);
			});
			return deferred.promise;
		}

		function getReChargeInfo(options) {
			var deferred = $q.defer();
			var url = applicationConfig.api_url + '/' + 'User/GetRechargeInfo';
			$http.post(url).then(function (response) {
				if (response.data.Result) {
					deferred.resolve(response);
				} else {
					deferred.reject(response);
				}
			}, function (err) {
				deferred.reject(err);
			});
			return deferred.promise;
		}

		function getReChargeList(options) {
			var deferred = $q.defer();
			var url = applicationConfig.api_url + '/' + 'User/MyRechargeList';
			$http.post(url, options).then(function (response) {
				if (response.data.Result) {
					deferred.resolve(response);
				} else {
					deferred.reject(response);
				}
			}, function (err) {
				deferred.reject(err);
			});
			return deferred.promise;
		}



		var init = function () {

		};

		init();

		return {
			signIn: signIn,
			getUserById: getUserById,
			getUserByName: getUserByName,
			changePassword: changePassword,
			sendSmsVerifyCode: sendSmsVerifyCode,
			resetPassword: resetPassword,
			getMembers: getMembers,
			checkPayPassword: checkPayPassword,
			createMember: createMember,
			recharge: recharge,
			recharge2: recharge2,
			getShipAddress: getShipAddress,
			addShipAddress: addShipAddress,
			getFavoriteProductList: getFavoriteProductList,
			getFavoriteStoreList: getFavoriteStoreList,
			removeFavoriteStore: removeFavoriteStore,
			removeFavoriteProduct: removeFavoriteProduct,
			setDefaultShipAddress: setDefaultShipAddress,
			removeShipAddress: removeShipAddress,
			editShipAddress: editShipAddress,
			addFavoriteProduct: addFavoriteProduct,
			getReChargeList:getReChargeList,
		};
	}

})();
