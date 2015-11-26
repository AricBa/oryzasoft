/**
 * Created by C5226508 on 11/5/2015.
 */
(function () {
  'use strict';

  angular
    .module('app.user')
    .config(function($stateProvider) {
      $stateProvider
        .state('user', {
          url: '/user',
          templateUrl: 'js/routes/user/user.html',
          controller: 'userCtrl',
          cache:false,
          data: {
            authenticate: true
          }
        })
        .state('userDetail', {
          url: '/userDetail',
          templateUrl: 'js/routes/user/userDetail.html',
          controller: 'userDetailCtrl',
          cache:false,
          data: {
            authenticate: true
          }
        })
        .state('about', {
          url: '/about',
          templateUrl: 'js/routes/user/about.html',
          controller: 'aboutCtrl',
          cache:false,
          data: {
            authenticate: true
          }
        })
        .state('message',{
          url: '/message',
          templateUrl: 'js/routes/user/message.html',
          controller: 'messageCtrl',
          cache:false,
          data: {
            authenticate: true
          }
        })
        .state('addsapaccount', {
          url: '/addsapaccount',
          templateUrl: 'js/routes/user/addsapaccount.html',
          controller: 'addsapCtrl',
          cache:false,
          data: {
            authenticate: true
          }
        });
    });
})();
