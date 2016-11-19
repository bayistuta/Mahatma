// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('mahatma', ['ionic', 'ionic-toast'])
  .run(function ($ionicPlatform, $rootScope, $state, $location, Constants, Utils, $ionicLoading, ionicToast) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });

    $rootScope.$on('$stateChangeStart', function (event, toState, params) {
        if (toState.data.requireLogin && !sessionStorage.getItem(Constants.CACHE_TOKEN_KEY)) {
          $location.path('/login');
        } 
    });
    $rootScope.showLoadingBar = true;
    $rootScope.$on('loading:show', function() {
      if ($rootScope.showLoadingBar) {
        $ionicLoading.show({template: '请等待，数据请求中......'});
      }
      $rootScope.showLoadingBar = true;
    })

    $rootScope.$on('loading:hide', function() {
      $ionicLoading.hide();
    })

    $rootScope.$on('response:error', function(d, message) {
      ionicToast.show(message, 'top', false, 3000);
    })

  })
  .config(function ($stateProvider, $urlRouterProvider, $httpProvider, $ionicConfigProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $httpProvider.interceptors.push('Interceptor');
    $ionicConfigProvider.tabs.position('bottom'); 
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/dash');

  });

//config file 
var applicationConfig = {
  token_url: 'http://dsjtchina.com:8881/token',
  api_url: 'http://dsjtchina.com:8881/api',
  version: '1.0.4',
  //token_url: 'http://dsjtchina.com:9991/token',
  //api_url: 'http://dsjtchina.com:9991/api',
  //api_url: 'http://localhost:8100/api',
};
