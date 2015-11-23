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

      $scope.index = 0 ;

      $scope.slideHasChanged = function($index){
        $scope.index = $index;
        console.log($scope.index);
      };
      console.log($scope.index);
    })
    .controller('poUnApproListCtrl',function($state,$scope,restApi,$ionicLoading){
      $scope.results = $scope.$parent.results;
      $scope.count = $scope.$parent.totalCount;
      $scope.page = $scope.$parent.pageIndex;
      $scope.pageSize = $scope.$parent.pageSize;

      $scope.goDetail = function(index){
        $state.go('poDetail',{poNumber:index});
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
          pageIndex : $scope.page,
          filter:"0,6"
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
        $scope.route =  'sap/po/purchase_orders';
        $scope.path ='';
        $scope.status = '';

        $scope.params = {
          pageIndex : '1',
          filter: "0,6"
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

      $scope.$on('refresh',function(){
        if($scope.$parent.status && $scope.$parent.index == 0){
          if($scope.$parent.status == '0' || $scope.$parent.status == '6'){
            $ionicLoading.show({
              template: 'Loading...'
            });
            $scope.route =  'sap/po/purchase_orders';
            $scope.path ='';
            $scope.stat = '';
            $scope.stat = $scope.$parent.status;
            $scope.params = {
              pageIndex : '1',
              filter: $scope.stat
            };

            restApi.getData($scope.route,$scope.path,$scope.params).then(function(response){
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
        }else if ($scope.$parent.index == 0){
          $scope.refresh();
        }
      })
    })
    .controller('poApproListCtrl',function($state,$scope,restApi,$ionicLoading){
      $scope.$watch('index',function(val){
          if( $scope.$parent.index === 1){
            var route =  'sap/po/purchase_orders';
            var path ='';
            var params = {
              pageIndex : '1',
              filter: "1,3,5"
            };
            $ionicLoading.show({
              template: 'Loading...'
            });
            restApi.getData(route,path,params).then(function(response){
              console.log(response);
              $ionicLoading.hide();
              $scope.result = response.results;
              $scope.count = response.count;
              $scope.page = response.page;
              $scope.pageSize = response.pageSize;
            });
          }
      })

      $scope.goDetail = function(index){
        $state.go('poDetail',{poNumber:index});
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
          pageIndex : $scope.page,
          filter: "1,3,5"
        };
        restApi.getData($scope.route,$scope.path,$scope.params).then(function(response){
          Array.prototype.push.apply($scope.result, response.results);
          $scope.$broadcast('scroll.infiniteScrollComplete');
          console.log($scope.result);
        })
      };
      //$scope.$on('$stateChangeSuccess', function() {
      //    $scope.loadMoreData();
      //});

      $scope.refresh = function(){
        $ionicLoading.show({
          template: 'Loading...'
        });
        $scope.route =  'sap/po/purchase_orders';
        $scope.path ='';


        $scope.params = {
          pageIndex : '1',
          filter: "1,3,5"
        };

        restApi.getData($scope.route,$scope.path,$scope.params).then(function(response){
          $scope.result= response.results;
          $scope.count = response.totalCount;
          $scope.page = response.pageIndex;
          $scope.pageSize = response.pageSize;
        }).finally(function(){
          console.log('$scope.refresh');
          $scope.$broadcast('scroll.refreshComplete');
          $ionicLoading.hide();
          //$scope.status = '';
        });
      };

      $scope.$on('refresh',function(){
        if($scope.$parent.status && $scope.$parent.index == 1){
          if($scope.$parent.status == '1,5' || $scope.$parent.status == '3'){
            $ionicLoading.show({
              template: 'Loading...'
            });
            $scope.route =  'sap/po/purchase_orders';
            $scope.path ='';
            $scope.stat = '';
            $scope.stat = $scope.$parent.status;

            $scope.params = {
              pageIndex : '1',
              filter: $scope.stat
            };

            restApi.getData($scope.route,$scope.path,$scope.params).then(function(response){
              $scope.result= response.results;
              $scope.count = response.totalCount;
              $scope.page = response.pageIndex;
              $scope.pageSize = response.pageSize;
            }).finally(function(){
              $scope.stat = '';
              console.log('$scope.refresh');
              $scope.$broadcast('scroll.refreshComplete');
              $ionicLoading.hide();
            });
          }else {
            $scope.result= '';
            $scope.count = '';
            $scope.page = '';
            $scope.pageSize = '';
          }
        }else if($scope.$parent.index == 1){
          $scope.refresh();
        }
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
      };

      if ($scope.po.DM_STATUS == 1 || $scope.po.DM_STATUS == 5){
        $scope.detail = 'approving';
      }else if ($scope.po.DM_STATUS == 3 ){
        $scope.detail=  'approved';
      }else{
        $scope.detail=  'resetted';
      }

      $scope.goBack =function(){
        $state.go('sideMenu.poList');
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
        }

    })
    .directive('createTask', function ( ) {
      return {
        restrict: "EA",
        scope: {
          buttonText: '=',
          status:'=',
          num: '=',
          itemId: '='
        },
        controller: function ($ionicPopup,$scope,restApi,$ionicLoading,$timeout,$state) {
          $scope.ionicPopup = {
            title: $scope.buttonText,
            cssClass: 'ionicPopup',
            //template: 'OK',
            cancelText: 'CANCEL',
            cancelType: 'button button-clear button-positive',
            okText: $scope.buttonText,
            okType: 'button button-clear button-positive'
          };

          $scope.showConfirm = function () {
            console.log($scope.itemId);
            var confirmPopup = $ionicPopup.confirm($scope.ionicPopup);
            confirmPopup.then(function (res) {
              if (res) {
                $ionicLoading.show({
                  template:'Loading...'
                });
                console.log($scope.num);
                var statusRoute;
                var approveRoute;
                var resetRoute;
                if(typeof $scope.itemId  == 'undefined') {
                    statusRoute = 'sap/po/purchase_orders/' + $scope.num + '/status';
                    approveRoute = 'sap/po/purchase_orders/' + $scope.num + '/approve';
                    resetRoute = 'sap/po/purchase_orders/' + $scope.num + '/reset';
                }else{
                    statusRoute =  'sap/pr/purchase_requisitions/' + $scope.num + '/items/' + $scope.itemId +'/status';
                    approveRoute = 'sap/pr/purchase_requisitions/' + $scope.num + '/items/' + $scope.itemId + '/approve';
                    resetRoute = 'sap/pr/purchase_requisitions/' + $scope.num + '/items/' + $scope.itemId + '/reset';
                }
                restApi.getData(statusRoute).then(function(response){
                  console.log(response.results[0].DM_STATUS);
                  console.log($scope.status);
                  if(response.results[0].DM_STATUS == $scope.status) {
                    if($scope.buttonText == 'Approve'){
                      restApi.post(approveRoute).then(function(response){
                        $ionicLoading.hide();
                        if(typeof $scope.itemId  == 'undefined') {
                          $state.go('approveDetail',{poNumber:$scope.num});
                        }else{
                          $state.go('prapproveDetail',{purchaseRequisitionID : $scope.num, itemID : $scope.itemId});
                        }
                        $scope.buttonText = 'Lock';
                        console.log(response);
                        console.log('approve');
                      },function(err){
                        $ionicLoading.hide();
                        console.log(err);
                      });
                    }else if( $scope.buttonText =='Reset'){
                      restApi.post(resetRoute).then(function(response){
                        $ionicLoading.hide();
                        if(typeof $scope.itemId  == 'undefined') {
                          $state.go('approveDetail',{poNumber:$scope.num});
                        }else{
                          $state.go('prapproveDetail',{purchaseRequisitionID : $scope.num, itemID : $scope.itemId});
                        }
                        //$ionicLoading.show({
                        //  template:'the task is reseted'
                        //});
                        //$timeout(function() {
                        //  $ionicLoading.hide();
                        //}, 1000);
                        $scope.buttonText = 'Approve';
                        console.log(response);
                        console.log('reset');
                      },function(err){
                        console.log(err);
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
                },function(err){
                  $ionicLoading.hide();
                  console.log(err);
                });

              } else {
                console.log('cancel');
              }
            });
          };
        },
        template: '<button ng-click="showConfirm()">{{buttonText}}</button>',
        replace: true
      };
    });
})();
