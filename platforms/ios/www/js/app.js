/**
 * Main app module.
 *
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   The MIT License {@link http://opensource.org/licenses/MIT}
 */
(function () {
    'use strict';

    angular.module('app', [
        // angular modules
        'ngAnimate',
        'ngSanitize',
        'ngMessages',
        //'ngMaterial',

        // 3rd party modules
        'ui.router',
        'ionic',
        'restangular',
        'LocalStorageModule',
        'ngCordova',
        'angularMoment',

        // app modules
        'app.core',
        'app.signup',
        'app.signin',
        'app.sideMenu',
        'app.home',
        'app.po',
        'app.pr',
        'app.user'
    ])
      .run(function ($rootScope, $state, $stateParams,$ionicLoading,$timeout) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.goBack = function () {
          // function to go back
          window.history.back();
        };

        $rootScope.$on('$stateChangeSuccess', function () {
          if ($state.$current == 'home' || $state.$current == 'setting') {
            $rootScope.showCustomBack = false;
          } else {
            $rootScope.showCustomBack = true;
          }
        });

        $rootScope.$on('$cordovaNetwork:offline',function(){
            $ionicLoading.show({template:'network not connect'});
            $timeout(function(){
                $ionicLoading.hide();
            },1000);
        });
        $rootScope.$on('$cordovaNetwork:online',function(event,networkState){
            $ionicLoading.show({template:'network  connectted'});
            $timeout(function(){
                $ionicLoading.hide();
            },1000);
            //alert(networkState);
        });



      })

      .config(function($ionicConfigProvider) {
        $ionicConfigProvider.backButton.previousTitleText(false).text('');
      });

})();
