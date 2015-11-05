(function () {
  'use strict';
  angular
    .module('app.pr')
    .controller('prCtrl',function($scope,prList){
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
    })
    .controller('prUnApproListCtrl',function($scope,$state){
        $scope.results = $scope.$parent.results;
        $scope.count = $scope.$parent.totalCount;
        $scope.page = $scope.$parent.pageIndex;
        $scope.pageSize = $scope.$parent.pageSize;

        $scope.index = $scope.$parent.index;

        $scope.goDetail = function(index){
          $state.go('prDetail',{purchaseRequisitionID:index});
        };
    })
    .controller('prApproListCtrl',function(){

    })
    .controller('prDetailCtrl',function($scope,PR){
        $scope.pr = PR.results[0];
    })
})();
