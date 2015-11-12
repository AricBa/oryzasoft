(function () {
    'use strict';
    angular
        .module('app.signin')
        .config(function($stateProvider) {
          $stateProvider
            .state('signin', {
                url: '/signin',
                templateUrl: 'js/routes/signin/signin.html',
                controller: 'SigninCtrl as vm',
                data: {
                    authenticate: false
                }
            })
            .state('forgetPassword', {
              url: '/forgetPassword',
              templateUrl: 'js/routes/signin/forgetPassword.html',
              controller: 'forgetPasswordCtrl as vm',
              data: {
                authenticate: false
              }
            })
            .state('experience', {
              url: '/experience',
              templateUrl: 'js/routes/signin/experience.html',
              controller: 'experienceCtrl as vm',
              data: {
                authenticate: false
              }
            });
      });

})();
