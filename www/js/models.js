(function () {

  'use strict';


  angular.module('mahatma').factory('LoginResultModel', function () {
		function LoginResultModel(accessToken, tokenType, expires, userId, userName, issued, expired) {
			this.accessToken = accessToken;
			this.tokenType = tokenType;
			this.expires = expires;
			this.userId = userId;
			this.userName = userName;
			this.issued = issued;
			this.expired = expired;
		}
    LoginResultModel.build = function (data) {
      return new LoginResultModel(
				data['access_token'],
				data['token_type'],
				data['expires_in'],
				data['userId'],
				data['userName'],
				data['.issued'],
				data['.expires']
      );
    };
    return LoginResultModel;
  });


})();
