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
            });
      });

})();
