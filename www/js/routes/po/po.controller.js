/**
 * Created by C5226508 on 11/2/2015.
 */
(function () {
  'use strict';
  angular
    .module('app.po')
    .controller('poListCtrl', ['$scope','poList','$state','POData','$rootScope','$ionicLoading',
      function($scope,poList,$state,POData,$rootScope,$ionicLoading) {
      $scope.choice = '10';
      $scope.results = poList.results;
      $scope.count = poList.totalCount;
      $scope.page = poList.pageIndex;
      $scope.pageSize = poList.pageSize;

      $scope.selected = "UnApproved";
      var path ='';
      $scope.listButtonBar = ["UnApproved", "Approved"];
      $scope.swithPage = function(button){
        $ionicLoading.show({
          template: 'Loading...'
        });
          if(button == "UnApproved"){
            var params = {
              pageIndex : '1',
              filter : "0,6"
            };
            $scope.selected = "UnApproved";
          }else{
            var params = {
              pageIndex : '1',
              filter : "1,3,5"
            };
            $scope.selected = "Approved";
          }
          POData.getPOList(path,params).then(function(response){
            $scope.results = response.results;
            $scope.count = response.totalCount;
            $scope.page = response.pageIndex;
            $scope.pageSize = response.pageSize;
            $rootScope.note ='';
            console.log(response);
            $ionicLoading.hide();
          });

        $scope.$emit('changePage',button);
        $scope.choice = '10';
      };

      $scope.$on('choice',function(event,data) {
        $scope.choice= data;
        $scope.refresh();
      });

      $scope.goDetail = function(index){
          $state.go('poDetail',{poNumber:index});
      };
      $scope.goBack =function(){
        $state.go('home');
      };

      $scope.isMoreData = function () {
        //console.log($scope.page < ($scope.count / $scope.pageSize));
        return $scope.page < ($scope.count / $scope.pageSize);
      };

      $scope.loadMoreData = function(){
        $scope.page++;

        $scope.path ='';
        if($scope.selected == "UnApproved"){
          if($scope.choice == '10'){
            $scope.params = {
              pageIndex : '1',
              filter : "0,6"
            };
          }else{
            $scope.params = {
              pageIndex : '1',
              filter : $scope.choice
            };
          }
        }else {
          if($scope.choice == '10'){
            $scope.params = {
              pageIndex : '1',
              filter : "1,3,5"
            };
          }else{
            $scope.params = {
              pageIndex : '1',
              filter : $scope.choice
            };
          }
        }
        POData.getPOList($scope.path,$scope.params).then(function(response){
          Array.prototype.push.apply($scope.results, response.results);
          $scope.$broadcast('scroll.infiniteScrollComplete');
          console.log($scope.results);
        })
      };

      $scope.refresh = function(){
        $ionicLoading.show({
          template: 'Loading...'
        });
        $scope.path ='';

        if($scope.selected == "UnApproved"){
          if($scope.choice == '10'){
            $scope.params = {
              pageIndex : '1',
              filter : "0,6"
            };
          }else{
            $scope.params = {
              pageIndex : '1',
              filter : $scope.choice
            };
          }
        }else {
          if($scope.choice == '10'){
            $scope.params = {
              pageIndex : '1',
              filter : "1,3,5"
            };
          }else{
            $scope.params = {
              pageIndex : '1',
              filter : $scope.choice
            };
          }
        }
        POData.getPOList($scope.path,$scope.params).then(function(response){
          $scope.results= response.results;
          $scope.count = response.totalCount;
          $scope.page = response.pageIndex;
          $scope.pageSize = response.pageSize;
          $rootScope.note ='';
          console.log(response);
        }).finally(function(){
          console.log('$scope.refresh');
          $scope.$broadcast('scroll.refreshComplete');
          $ionicLoading.hide();
        });
      };

      //$scope.$on('refresh',function(){
      //  if($scope.$parent.status && $scope.selected == "UnApproved"){
      //    if($scope.$parent.status == '0' || $scope.$parent.status == '6'){
      //      $ionicLoading.show({
      //        template: 'Loading...'
      //      });
      //      $scope.path ='';
      //      $scope.stat = '';
      //      $scope.stat = $scope.$parent.status;
      //      $scope.params = {
      //        pageIndex : '1',
      //        filter: $scope.stat
      //      };
      //
      //      POData.getPOList($scope.path,$scope.params).then(function(response){
      //        $scope.results= response.results;
      //        $scope.count = response.totalCount;
      //        $scope.page = response.pageIndex;
      //        $scope.pageSize = response.pageSize;
      //      }).finally(function(){
      //        $scope.stat = '';
      //        console.log('$scope.refresh');
      //        $scope.$broadcast('scroll.refreshComplete');
      //        $ionicLoading.hide();
      //      });
      //    }else{
      //      $scope.results= '';
      //      $scope.count = '';
      //      $scope.page = '';
      //      $scope.pageSize = '';
      //    }
      //  }else if($scope.$parent.status && $scope.selected == "Approved") {
      //    if ($scope.$parent.status == '1,5' || $scope.$parent.status == '3') {
      //
      //      $ionicLoading.show({
      //        template: 'Loading...'
      //      });
      //      $scope.path = '';
      //      $scope.stat = '';
      //      $scope.stat = $scope.$parent.status;
      //
      //      $scope.params = {
      //        pageIndex: '1',
      //        filter: $scope.stat
      //      };
      //
      //      POData.getPOList($scope.path, $scope.params).then(function (response) {
      //        $scope.results = response.results;
      //        $scope.count = response.totalCount;
      //        $scope.page = response.pageIndex;
      //        $scope.pageSize = response.pageSize;
      //      }).finally(function () {
      //        $scope.stat = '';
      //        console.log('$scope.refresh');
      //        $scope.$broadcast('scroll.refreshComplete');
      //        $ionicLoading.hide();
      //      });
      //    } else {
      //      $scope.results= '';
      //      $scope.count = '';
      //      $scope.page = '';
      //      $scope.pageSize = '';
      //    }
      //  }else{
      //    $scope.refresh();
      //  }
      //})
    }])
    .controller('poDetailCtrl',['PODetail','$scope','$state',function(PODetail,$scope,$state){
      $scope.PODetail = PODetail[0].results[0];
      $scope.approve = PODetail[1];

      $scope.goToItems = function(){
        $state.go('poItems',{poNumber:$scope.PODetail.PO_NUMBER});
      };

      $scope.goToApproveDetail = function(){
        $state.go('poApproveDetail',{poNumber:$scope.PODetail.PO_NUMBER});
      };

      if ($scope.PODetail.DM_STATUS == 1 || $scope.PODetail.DM_STATUS == 5){
        $scope.detail = 'approving';
      }else if ($scope.PODetail.DM_STATUS == 3 ){
        $scope.detail=  'approved';
      }else{
        $scope.detail=  'resetted';
      }

      $scope.goBack =function(){
        $state.go('sideMenu.poList');
      }

    }])
    .controller('POItemsCtrl',['POItemList','$scope','$state','$stateParams','POData','$ionicLoading',
      function(POItemList,$scope,$state,$stateParams,POData,$ionicLoading){

      $scope.count = POItemList.totalCount;
      $scope.page = POItemList.pageIndex;
      $scope.pageSize = POItemList.pageSize;
      $scope.results = POItemList.results;
      console.log($scope.results);

      $scope.goDetail = function(index){
        $state.go('poItemDetail',{poNumber:$stateParams.poNumber,itemId:index});
      };

      $scope.goBack = function(){
        $state.go('poDetail',{poNumber:$stateParams.poNumber});
      };

      //$scope.isMoreData = function () {
      //  //console.log($scope.page < ($scope.count / $scope.pageSize));
      //  return $scope.page < ($scope.count / $scope.pageSize);
      //};
      //
      //$scope.loadMoreData = function(){
      //  $scope.page++;
      //  $scope.path ='';
      //  $scope.params = {
      //    pageIndex : $scope.page
      //  };
      //  POData.getPOItemList($stateParams.poNumber,$scope.path,$scope.params).then(function(response){
      //    Array.prototype.push.apply($scope.results, response.results);
      //    $scope.$broadcast('scroll.infiniteScrollComplete');
      //    console.log($scope.results);
      //  })
      //};
      ////$scope.$on('$stateChangeSuccess', function() {
      ////    $scope.loadMoreData();
      ////});

      $scope.refresh = function(){
        $ionicLoading.show({
          template: 'Loading...'
        });
        $scope.route =  'sap/po/purchase_orders/'+$stateParams.poNumber+'/items';
        $scope.path ='';
        $scope.params = {
          pageIndex : '1'
        };
        POData.getPOItemList($stateParams.poNumber,$scope.path,$scope.params).then(function(response){
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
    }])
    .controller('poItemDetailCtrl',['POItemDetail','$scope','$state','$stateParams',
      function(POItemDetail,$scope,$state,$stateParams){
      $scope.POItemDetail = POItemDetail.results[0];

      $scope.goBack = function(){
        $state.go('poDetail',{poNumber:$stateParams.poNumber});
      };
    }])
    .controller('poApproveDetailCtrl',['poApprove','$scope','$state','$stateParams',
      function(poApprove,$scope,$state,$stateParams){
        $scope.results = poApprove.results[0];
        console.log($scope.results);
        $scope.goToList = function(){
           $state.go('sideMenu.poList');
        };
        $scope.goBack = function(){
          $state.go('poDetail',{poNumber:$stateParams.poNumber});
        };

        if ($scope.results.DM_STATUS == 1 || $scope.results.DM_STATUS == 5){
          $scope.approveStatus = 'approving';
        }else if ($scope.results.DM_STATUS == 3 ){
          $scope.approveStatus=  'approved';
        }else{
          $scope.approveStatus=  'resetted';
        }

    }]);
})();
