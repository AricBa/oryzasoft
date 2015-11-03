/**
 * Created by C5226508 on 11/2/2015.
 */
(function () {
  'use strict';
  angular
    .module('app.po')
    .controller('poCtrl', function($scope,poList) {
      $scope.results = poList.results;
      $scope.count = poList.totalCount;
      $scope.page = poList.pageIndex;
      $scope.pageSize = poList.pageSize;

    })
    .controller('poListCtrl',function($state,$scope,restApi,$ionicLoading){

      $scope.results = $scope.$parent.results;
      $scope.count = $scope.$parent.count;
      $scope.page = $scope.$parent.page;
      $scope.pageSize = $scope.$parent.pageSize;



      $scope.goDetail = function(index){
        $state.go('poDetail',{poNumber:index});
      };

      $scope.isMoreData = function () {
        console.log($scope.page < ($scope.count / $scope.pageSize));
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
    .controller('poDetailCtrl',function(PO,$scope,$state){
      $scope.po = PO[0].results[0];
      $scope.approve = PO[1];

      $scope.goToItems = function(){
        $state.go('poItems',{poNumber:$scope.po.PO_NUMBER});
      };

      $scope.goToApproveDetail = function(){
        $state.go('approveDetail',{poNumber:$scope.po.PO_NUMBER});
      }

    })
    .controller('itemsCtrl',function(items,$scope,$state,$stateParams,restApi,$ionicLoading,$ionicSideMenuDelegate){
      $scope.openFilter = function(){
        $ionicSideMenuDelegate.toggleRight();
      };

      $scope.count = items.totalCount;
      $scope.page = items.pageIndex;
      $scope.pageSize = items.pageSize;
      $scope.results = items.results;
      console.log($scope.results);

      $scope.goDetail = function(index){
        $state.go('itemDetail',{poNumber:$stateParams.poNumber,itemId:index});
      };

      $scope.isMoreData = function () {
        //console.log($scope.page < ($scope.count / $scope.pageSize));
        return $scope.page < ($scope.count / $scope.pageSize);
      };

      $scope.loadMoreData = function(){
        $scope.page++;
        $scope.route =  'sap/po/purchase_orders/'+$stateParams.poNumber+'/items';
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
        $scope.route =  'sap/po/purchase_orders/'+$stateParams.poNumber+'/items';
        $scope.path ='';
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
    .controller('itemDetailCtrl', function(item,$scope){
      $scope.item = item.results[0];
    })
    .controller('approveDetailCtrl',function(poApprove,$scope,$state){
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
        };

    })
    .directive('createTask', function ( ) {
      return {
        restrict: "EA",
        scope: {
          buttonText: '=',
          status:'=',
          poNum: '='// Use @ for One Way Text Binding;Use = for Two Way Binding;Use & to Execute Functions in the Parent Scope
        },
        controller: function ($ionicPopup,$scope,Restangular,$ionicLoading,$timeout,$state) {
          $scope.ionicPopup = {
            title: 'Approve po',
            cssClass: 'ionicPopup',
            //template: 'OK',
            cancelText: 'CANCEL',
            cancelType: 'button button-clear button-positive',
            okText: $scope.buttonText,
            okType: 'button button-clear button-positive'
          };

          $scope.showConfirm = function () {
            var confirmPopup = $ionicPopup.confirm($scope.ionicPopup);
            confirmPopup.then(function (res) {
              if (res) {
                $ionicLoading.show({
                  template:'Loading...'
                });
                console.log($scope.poNum);
                Restangular.all('sap/po/purchase_orders/'+$scope.poNum+'/status').customGET().then(function(response){
                  console.log(response.results[0].DM_STATUS);
                  console.log($scope.status);
                  if(response.results[0].DM_STATUS == $scope.status) {
                    if($scope.buttonText == 'Approve'){
                      Restangular.all('sap/po/purchase_orders/'+$scope.poNum+'/approve').post().then(function(response){
                        $ionicLoading.hide();
                        $state.go('approveDetail',{poNumber:$scope.poNum});
                        //$ionicLoading.show({
                        //  template:'the task is approving'
                        //});
                        //$timeout(function() {
                        //  $ionicLoading.hide();
                        //}, 1000);
                        $scope.buttonText = 'Lock';
                        console.log(response);
                        console.log('approve');
                      });
                    }else if( $scope.buttonText =='Reset'){
                      Restangular.all('sap/po/purchase_orders/'+$scope.poNum+'/reset').post().then(function(response){
                        $ionicLoading.hide();
                        $state.go('approveDetail',{poNumber:$scope.poNum});
                        //$ionicLoading.show({
                        //  template:'the task is reseted'
                        //});
                        //$timeout(function() {
                        //  $ionicLoading.hide();
                        //}, 1000);
                        $scope.buttonText = 'Approve';
                        console.log(response);
                        console.log('reset');
                      })
                    }else{
                      console.log("Locked");
                      $ionicLoading.hide();
                    }
                  }else{
                    $ionicLoading.hide();
                    $ionicLoading.show({
                      template:'status has changed'
                    });
                    $timeout(function() {
                      $ionicLoading.hide();
                    }, 1000);
                  }
                });

              } else {
                console.log('cancel');
              }
            });
          };
        },

        template: '<button  ng-click="showConfirm()">{{buttonText}}</button>',
        replace: true
      };
    });
})();
