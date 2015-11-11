/**
 * Created by C5226508 on 11/2/2015.
 */
(function () {
  'use strict';
  angular
    .module('app.sideMenu')
    .config(function($stateProvider) {
      $stateProvider
        .state('sideMenu', {
          url: '',
          abstract: true,
          cache:false,
          templateUrl: 'js/routes/po/side-menu.html',
          controller: 'sideMenuCtrl'
        })
    });

})();