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

		function getUserByName() {
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

		function changePassword() {
			var deferred = $q.defer();
			var url = applicationConfig.api_url + '/' + 'Account/ChangePassword';
			$http.post(url, {
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
			var url = applicationConfig.api_url + '/' + 'user/SendSmsVerifyCode?mobile='+ mobile;
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
		};
	}

})();