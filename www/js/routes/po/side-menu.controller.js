/**
 * Created by C5226508 on 11/2/2015.
 */
(function () {
  'use strict';

  /**
   * @ngdoc controller
   * @name LayoutCtrl
   * @module app.gallery
   * @requires $state
   * @requires Authentication
   * @description
   * Controller for the layout page.
   *
   * @ngInject
   */

  angular
    .module('app.sideMenu')
    .controller('sideMenuCtrl',  function($scope,$state) {

      $scope.goBack =function(){
        $state.go('home');
      };

      $scope.goDetail = function(status){
        $scope.status = status;
        console.log($scope.status);
        $scope.$broadcast('refresh');
      };
    }
  );
})();