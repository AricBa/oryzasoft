(function () {
    'use strict';
    angular
        .module('app.signin')
        .config(function($stateProvider) {
          $stateProvider
            .state('signin', {
                url: '/signin',
                templateUrl: 'templates/signin.html',
                controller: 'SigninCtrl',
                data: {
                    authenticate: false
                }
            })
            .state('forgetPassword', {
              url: '/forgetPassword',
              templateUrl: 'templates/forgetPassword.html',
              controller: 'forgetPasswordCtrl',
              data: {
                authenticate: false
              }
            })
            .state('experience', {
              url: '/experience',
              templateUrl: 'templates/experience.html',
              controller: 'experienceCtrl',
              data: {
                authenticate: false
              }
            });
      });

})();
