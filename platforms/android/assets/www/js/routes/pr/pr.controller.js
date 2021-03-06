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
    })
    .controller('prUnApproListCtrl',function($scope,$state,restApi,$ionicLoading){
      $scope.results = $scope.$parent.results;
      $scope.count = $scope.$parent.totalCount;
      $scope.page = $scope.$parent.pageIndex;
      $scope.pageSize = $scope.$parent.pageSize;

      $scope.goDetail = function(index){
        $state.go('prDetail',{purchaseRequisitionID:index});
      };

      $scope.isMoreData = function () {
        console.log($scope.page < ($scope.count / $scope.pageSize));
        return $scope.page < ($scope.count / $scope.pageSize);
      };

      $scope.loadMoreData = function(){
        $scope.page++;
        $scope.route =  'sap/pr/purchase_requisitions';

        $scope.path ='';
        $scope.params = {
          pageIndex : $scope.page
        };
        restApi.getData($scope.route,$scope.path,$scope.params).then(function(response){
          Array.prototype.push.apply($scope.results, response.results);
          $scope.$broadcast('scroll.infiniteScrollComplete');
          console.log($scope.results);
        })
      };
      //$scope.$on('$stateChangeSuccess', function() {
      //    $scope.loadMoreData();
      //});

      $scope.refresh = function(){
        $ionicLoading.show({
          template: 'Loading...'
        });
        $scope.route =  'sap/pr/purchase_requisitions';
        $scope.path ='';
        $scope.status = '';

        $scope.params = {
          pageIndex : '1'
        };

        restApi.getData($scope.route,$scope.path,$scope.params).then(function(response){
          $scope.results= response.results;
          $scope.count = response.totalCount;
          $scope.page = response.pageIndex;
          $scope.pageSize = response.pageSize;
        }).finally(function(){
          console.log('$scope.refresh');
          $scope.$broadcast('scroll.refreshComplete');
          $ionicLoading.hide();
        });
      };
    })
    .controller('prApproListCtrl',function(){

    })
    .controller('prDetailCtrl',function($scope,PR){
        $scope.results = PR.results;
         console.log($scope.results);
    })
    .controller('prItemDetailCtrl',function($scope,prItem,$state){
      $scope.goBack = function(){
        $state.go('prDetail',{purchaseRequisitionID: $scope.prItem.PREQ_NO});
      };

      $scope.prItem = prItem[0].results[0] ;
      console.log($scope.prItem);
      $scope.approve = prItem[1];

      if ($scope.prItem.DM_STATUS == 1 || $scope.prItem.DM_STATUS == 5){
        $scope.detail = 'approving';
      }else if ($scope.prItem.DM_STATUS == 3 ){
        $scope.detail=  'approved';
      }else{
        $scope.detail=  'resetted';
      }

      $scope.goToApproveDetail = function(){
        $state.go('prapproveDetail',{purchaseRequisitionID : $scope.prItem.PREQ_NO, itemID : $scope.prItem.PREQ_ITEM});
      };
    })
    .controller('prapproveDetailCtrl',function(prApprove,$scope,$state){
      $scope.results = prApprove.results[0];
      console.log($scope.results);
      $scope.goBack = function(){
        $state.go('prDetail',{purchaseRequisitionID: $scope.results.PREQ_NO});
      };

      if ($scope.results.DM_STATUS == 1 || $scope.results.DM_STATUS == 5){
        $scope.approveStatus = 'approving';
      }else if ($scope.results.DM_STATUS == 3 ){
        $scope.approveStatus=  'approved';
      }else{
        $scope.approveStatus=  'resetted';
      }
    });
})();
