(function () {
  'use strict';

  angular
    .module('app.user')
    .config(function($stateProvider) {
      $stateProvider
        .state('user', {
          url: '/user',
          templateUrl: 'templates/user.html',
          controller: 'userCtrl',
          cache:false,
          data: {
            authenticate: true
          }
        })
        .state('userDetail', {
          url: '/userDetail',
          templateUrl: 'templates/userDetail.html',
          controller: 'userDetailCtrl',
          cache:false,
          data: {
            authenticate: true
          }
        })
        .state('about', {
          url: '/about',
          templateUrl: 'templates/about.html',
          controller: 'aboutCtrl',
          cache:false,
          data: {
            authenticate: true
          }
        })
        .state('message',{
          url: '/message',
          templateUrl: 'templates/message.html',
          controller: 'messageCtrl',
          cache:false,
          data: {
            authenticate: true
          }
        })
        .state('addsapaccount', {
          url: '/addsapaccount',
          templateUrl: 'templates/addsapaccount.html',
          controller: 'addsapCtrl',
          cache:false,
          data: {
            authenticate: true
          }
        });
    });
})();
