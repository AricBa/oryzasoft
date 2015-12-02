/**
 * Created by C5226508 on 11/2/2015.
 */
(function () {
  'use strict';

  angular
    .module('app.sideMenu')
    .controller('sideMenuCtrl',  ['$scope',function($scope) {
      $scope.click = function(){
        $scope.$broadcast('choice',$scope.choice.data);
      };
      $scope.choice = {
        data : "10"
      };
      $scope.page = 'UnApproved';
      $scope.unApprovedFilter = [
        {text: "All" ,value: "10"},
        {text: "Unapproved" ,value: "0"},
        {text: "Resetted" ,value: "6"}];
      $scope.approvedFilter = [
        {text: "All" ,value: "10"},
        {text: "Locked" ,value: "1,5"},
        {text: "Approved" ,value: "3"}
      ];

      $scope.$on('changePage',function(event,data) {
        $scope.page= data;	   //??????
        $scope.choice.data = '10';
      });
    }]);
})();