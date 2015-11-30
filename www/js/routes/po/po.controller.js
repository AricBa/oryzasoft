/**
 * Created by C5226508 on 11/2/2015.
 */
(function () {
  'use strict';
  angular
    .module('app.po')
    .controller('poListCtrl', function($scope,poList,$state,POData,$rootScope,$ionicLoading) {
      $scope.results = poList.results;
      $scope.count = poList.totalCount;
      $scope.page = poList.pageIndex;
      $scope.pageSize = poList.pageSize;
      $scope.message = poList.message;

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
            $scope.message = response.message;
            console.log(response);
            $ionicLoading.hide();
          });
      };


      $scope.goDetail = function(index){
          $state.go('poDetail',{poNumber:index});
        };

        $scope.isMoreData = function () {
          //console.log($scope.page < ($scope.count / $scope.pageSize));
          return $scope.page < ($scope.count / $scope.pageSize);
        };

        $scope.loadMoreData = function(){
          $scope.page++;

          $scope.path ='';
          if($scope.selected == "UnApproved"){
            $scope.params = {
              pageIndex : $scope.page,
              filter:"0,6"
            };
          }else {
            $scope.params = {
              pageIndex : $scope.page,
              filter:"1,3,5"
            };
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
            $scope.params = {
              pageIndex : '1',
              filter:"0,6"
            };
          }else {
            $scope.params = {
              pageIndex : '1',
              filter:"1,3,5"
            };
          }
          POData.getPOList($scope.path,$scope.params).then(function(response){
            $scope.results= response.results;
            $scope.count = response.totalCount;
            $scope.page = response.pageIndex;
            $scope.pageSize = response.pageSize;
            $scope.message = response.message;
            $rootScope.note ='';
          }).finally(function(){
            console.log('$scope.refresh');
            $scope.$broadcast('scroll.refreshComplete');
            $ionicLoading.hide();
          });
        };

        $scope.$on('refresh',function(){
          if($scope.$parent.status && $scope.selected == "UnApproved"){
            if($scope.$parent.status == '0' || $scope.$parent.status == '6'){
              $ionicLoading.show({
                template: 'Loading...'
              });
              $scope.path ='';
              $scope.stat = '';
              $scope.stat = $scope.$parent.status;
              $scope.params = {
                pageIndex : '1',
                filter: $scope.stat
              };

              POData.getPOList($scope.path,$scope.params).then(function(response){
                $scope.results= response.results;
                $scope.count = response.totalCount;
                $scope.page = response.pageIndex;
                $scope.pageSize = response.pageSize;
              }).finally(function(){
                $scope.stat = '';
                console.log('$scope.refresh');
                $scope.$broadcast('scroll.refreshComplete');
                $ionicLoading.hide();
              });
            }else{
              $scope.results= '';
              $scope.count = '';
              $scope.page = '';
              $scope.pageSize = '';
            }
          }else if($scope.$parent.status && $scope.selected == "Approved") {
            if ($scope.$parent.status == '1,5' || $scope.$parent.status == '3') {

              $ionicLoading.show({
                template: 'Loading...'
              });
              $scope.path = '';
              $scope.stat = '';
              $scope.stat = $scope.$parent.status;

              $scope.params = {
                pageIndex: '1',
                filter: $scope.stat
              };

              POData.getPOList($scope.path, $scope.params).then(function (response) {
                $scope.results = response.results;
                $scope.count = response.totalCount;
                $scope.page = response.pageIndex;
                $scope.pageSize = response.pageSize;
              }).finally(function () {
                $scope.stat = '';
                console.log('$scope.refresh');
                $scope.$broadcast('scroll.refreshComplete');
                $ionicLoading.hide();
              });
            } else {
              $scope.results= '';
              $scope.count = '';
              $scope.page = '';
              $scope.pageSize = '';
            }
          }else{
            $scope.refresh();
          }
        })
    })
    .controller('poDetailCtrl',function(PODetail,$scope,$state){
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

    })
    .controller('POItemsCtrl',function(POItemList,$scope,$state,$stateParams,POData,$ionicLoading){

      $scope.count = POItemList.totalCount;
      $scope.page = POItemList.pageIndex;
      $scope.pageSize = POItemList.pageSize;
      $scope.results = POItemList.results;
      console.log($scope.results);

      $scope.goDetail = function(index){
        $state.go('poItemDetail',{poNumber:$stateParams.poNumber,itemId:index});
      };

      $scope.isMoreData = function () {
        //console.log($scope.page < ($scope.count / $scope.pageSize));
        return $scope.page < ($scope.count / $scope.pageSize);
      };

      $scope.loadMoreData = function(){
        $scope.page++;
        $scope.path ='';
        $scope.params = {
          pageIndex : $scope.page
        };
        POData.getPOItemList($stateParams.poNumber,$scope.path,$scope.params).then(function(response){
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
    })
    .controller('poItemDetailCtrl', function(POItemDetail,$scope){
      $scope.POItemDetail = POItemDetail.results[0];
    })
    .controller('poApproveDetailCtrl',function(poApprove,$scope,$state){
        $scope.results = poApprove.results[0];
        console.log($scope.results);
        $scope.goBack = function(){
           $state.go('sideMenu.poList');
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
