/**
 * Created by C5226508 on 11/2/2015.
 */
(function () {
  'use strict';
  angular
    .module('app.po')
    .controller('poCtrl', function($state,$scope,poList,restApi,$ionicLoading) {
      $scope.results = poList.results;
      $scope.count = poList.totalCount;
      $scope.page = poList.pageIndex;
      $scope.pageSize = poList.pageSize;


      $scope.goDetail = function(index){
        $state.go('app.poHeader',{poNumber:index});
      };

      $scope.isMoreData = function () {
        //console.log($scope.page < ($scope.count / $scope.pageSize));
        return $scope.page < ($scope.count / $scope.pageSize);
      };

      $scope.loadMoreData = function(){
        $scope.page++;
        $scope.route =  'sap/po/purchase_orders';
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

      $scope.refresh = function(status){
        $ionicLoading.show({
          template: 'Loading...'
        });
        $scope.route =  'sap/po/purchase_orders';
        $scope.path ='';
        $scope.status = '';
        if(status !== '' && typeof status !== 'undefined'){
          $scope.status = status;
        }
        $scope.params = {
          pageIndex : '1',
          filter: $scope.status
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
          $scope.status = '';
        });
      };

      $scope.$on('refresh',function(){
        $scope.refresh($scope.$parent.status);
      })
    })
    .controller('poListCtrl',function($state,$scope,restApi,$ionicLoading){

      $scope.results = $scope.$parent.results;
      $scope.count = $scope.$parent.totalCount;
      $scope.page = $scope.$parent.pageIndex;
      $scope.pageSize = $scope.$parent.pageSize;


      $scope.goDetail = function(index){
        $state.go('app.poHeader',{poNumber:index});
      };

      $scope.isMoreData = function () {
        //console.log($scope.page < ($scope.count / $scope.pageSize));
        return $scope.page < ($scope.count / $scope.pageSize);
      };

      $scope.loadMoreData = function(){
        $scope.page++;
        $scope.route =  'sap/po/purchase_orders';
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

      $scope.refresh = function(status){
        $ionicLoading.show({
          template: 'Loading...'
        });
        $scope.route =  'sap/po/purchase_orders';
        $scope.path ='';
        $scope.status = '';
        if(status !== '' && typeof status !== 'undefined'){
          $scope.status = status;
        }
        $scope.params = {
          pageIndex : '1',
          filter: $scope.status
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
          $scope.status = '';
        });
      };

      $scope.$on('refresh',function(){
        $scope.refresh($scope.$parent.status);
      })
    });
})();
