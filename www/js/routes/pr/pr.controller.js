/**
 * Created by C5226508 on 11/5/2015.
 */
/**
 * Created by C5226508 on 11/2/2015.
 */
(function () {
  'use strict';
  angular
    .module('app.po')
    .controller('prCtrl', function($scope,prList) {
      $scope.results = prList.results;
      $scope.count = prList.totalCount;
      $scope.page = prList.pageIndex;
      $scope.pageSize = prList.pageSize;

      $scope.index = 0 ;

      $scope.slideHasChanged = function($index){
        $scope.index = $index;
        console.log($scope.index);
      };
      console.log($scope.index);
    });
})();
