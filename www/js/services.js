angular.module('mahatma.services', [])

  .factory('dataStore', function ($q, $http, LoginResultModel, Utils, Constants, ionicToast) {
    // Might use a resource here that returns a JSON array

    var signIn = function (username, password) {
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
        /*var user = LoginResultModel.build(response.data);
        Utils.setObjectInSessionStorage(Constants.CACHE_USER_KEY, user);
        sessionStorage.setItem(Constants.CACHE_TOKEN_KEY, user.accessToken);
        getUserById(user.userId).then(function(data){
          Utils.setObjectInSessionStorage(Constants.CACHE_ACCOUNT_KEY, data.Data);
          deferred.resolve(user);
        }, function () {

        });
        //get account detail
        */
        return Utils.processResponse(response);
        
      }, function (err) {
        deferred.reject(err.data);
      });
      return deferred.promise;
    };

    var getUserById = function (id) {
      var deferred = $q.defer();
      var url = applicationConfig.api_url + '/' + 'User/GetUserByUid?uid=' + id;
      $http.post(url
      ).then(function (response) {
        deferred.resolve(response.data);
      }, function (err) {
        deferred.reject(err.data);
      });
      return deferred.promise;
    };

    var getUserByName = function (name) {
      var deferred = $q.defer();
      var url = applicationConfig.api_url + '/' + 'User/GetUserByName?userName=' + name;
      $http.post(url
      ).then(function (response) {
        deferred.resolve(response.data);
      }, function (err) {
        deferred.reject(err.data);
      });
      return deferred.promise;
    };

    var createOrder = function (order) {
      var deferred = $q.defer();
      var url = applicationConfig.api_url + '/' + 'OfflineOrder/AddOrder';
      $http.post(url, order
      ).then(function (response) {
        deferred.resolve(response.data);
      }, function (err) {
        deferred.reject(err.data);
      });
      return deferred.promise;
    };

    var getOrders = function (options) {
      var deferred = $q.defer();
      var url = applicationConfig.api_url + '/' + 'OfflineOrder/OrderList';
      $http.post(url, {
        Osn: options.osn,
        SellerRealName: '',
        BuyerAccountName: '',
        StoreName: '',
        OrderState: options.orderState,
        PageIndex: options.pageIndex,
        PageSize: 10,
      }
      ).then(function (response) {
        deferred.resolve(response.data);
      }, function (err) {
        deferred.reject(err.data);
      });
      return deferred.promise;
    };
    var getOrderDetail = function (orderId) {
      var deferred = $q.defer();
      var url = applicationConfig.api_url + '/' + 'OfflineOrder/GetOrder?oid=' + orderId;
      $http.post(url
      ).then(function (response) {
        deferred.resolve(response.data);
      }, function (err) {
        deferred.reject(err.data);
      });
      return deferred.promise;
    };

    var changePassword = function (oldPassword, newPassword) {
      var deferred = $q.defer();
      var url = applicationConfig.api_url + '/' + 'Account/ChangePassword';
      $http.post(url, {
        OldPassword: oldPassword,
        NewPassword: newPassword,
        ConfirmPassword: newPassword
      }
      ).then(function (response) {
        deferred.resolve(response.data);
      }, function (err) {
        deferred.reject(err.data);
      });
      return deferred.promise;
    };

    var getCategories = function (parentCategoryId) {
      var deferred = $q.defer();
      var url = applicationConfig.api_url + '/' + 'Product/GetCategoryList?parentCateId='+ parentCategoryId;
      $http.post(url
      ).then(function (response) {
        deferred.resolve(response.data);
      }, function (err) {
        deferred.reject(err.data);
      });
      return deferred.promise;
    };

    var auditOrders = function (orders) {
      var deferred = $q.defer();
      var url = applicationConfig.api_url + '/' + 'OfflineOrder/AuditOrder';
      $http.post(url,orders
      ).then(function (response) {
        deferred.resolve(response.data);
      }, function (err) {
        deferred.reject(err.data);
      });
      return deferred.promise;
    };

    var denyOrder = function (orderId, comment) {
      var deferred = $q.defer();
      var url = applicationConfig.api_url + '/' + 'OfflineOrder/RejectOrder';
      $http.post(url,{
        Oid: orderId,
        OperateRemark: comment,
      }
      ).then(function (response) {
        deferred.resolve(response.data);
      }, function (err) {
        deferred.reject(err.data);
      });
      return deferred.promise;
    }

    var getAppversion = function () {
      var deferred = $q.defer();
      var url = applicationConfig.api_url + '/' + 'App/GetAppDetail';
      $http.post(url
      ).then(function (response) {
        deferred.resolve(response.data);
      }, function (err) {
        deferred.reject(err.data);
      });
      return deferred.promise;
    }

    return {
      signIn: signIn,
      getUserById: getUserById,
      changePassword: changePassword,
      getUserByName: getUserByName,
      getCategories: getCategories,
      getOrders: getOrders,
      createOrder: createOrder,
      getOrderDetail: getOrderDetail,
      auditOrders: auditOrders,
      denyOrder: denyOrder,
      getAppversion: getAppversion
    };
  });
