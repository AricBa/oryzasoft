
(function () {
  'use strict';

  angular
    .module('app.home')
    .config(function($stateProvider) {
      $stateProvider
        .state('home', {
          url: '/home',
          templateUrl: 'templates/home.html',
          controller: 'homeCtrl',
          data: {
            authenticate: true
          }
        });
    });
})();
