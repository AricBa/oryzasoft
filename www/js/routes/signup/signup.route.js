(function () {
    'use strict';
    angular
        .module('app.signup')
        .config( function($stateProvider) {
          $stateProvider
            .state('signup', {
                url: '/signup',
                templateUrl: 'js/routes/signup/signup.html',
                controller: 'SignupCtrl as vm',
                data: {
                    authenticate: false
                }
            });
      });

})();
