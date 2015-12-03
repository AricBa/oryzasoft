(function () {
    'use strict';
    angular
        .module('app.signup')
        .config( function($stateProvider) {
          $stateProvider
            .state('signup', {
                url: '/signup',
                templateUrl: 'templates/signup.html',
                controller: 'SignupCtrl',
                data: {
                    authenticate: false
                }
            })
            .state('company', {
              //url: '/signup?email',
              templateUrl: 'templates/companyInfo.html',
              params:{'email':null , 'password':null},
              controller: 'companyCtrl',
              data: {
                authenticate: false
              }
            });
      });

})();
