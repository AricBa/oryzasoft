/**
 * Created by C5226508 on 11/24/2015.
 */
(function () {
  'use strict';

  /**
   * @ngdoc module
   * @name app.galleries
   */
  angular.module('app.directive', [])
    .factory('restApi',function(Restangular){
      var restApi;
      restApi = {
        getData: function(route,path,params,headers){
          return Restangular.all(route).customGET(path,params,headers);
        },
        post: function(route,params){
          return Restangular.all(route).post(params);
        }
      };

      return restApi;
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
        controller: function ($ionicPopup,$scope,restApi,$ionicLoading,$timeout,$state,$ionicActionSheet) {
          $scope.showConfirm = function() {
            // Show the action sheet
            var hideSheet = $ionicActionSheet.show({
              buttons: [
                { text: 'confirm' + $scope.buttonText }
              ],
              titleText: $scope.buttonText,
              cancelText: 'Cancel',
              cancel: function() {
                // add cancel code..
              },
              buttonClicked: function() {
                  console.log($scope.itemId);
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
                            $state.go('poApproveDetail',{poNumber:$scope.num});
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
                            $state.go('poApproveDetail',{poNumber:$scope.num});
                          }else{
                            $state.go('prapproveDetail',{purchaseRequisitionID : $scope.num, itemID : $scope.itemId});
                          }
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
              }
            });

            // For example's sake, hide the sheet after two seconds
            $timeout(function() {
              hideSheet();
            }, 2000);

          };
          //$scope.ionicPopup = {
          //  title: $scope.buttonText,
          //  cssClass: 'ionicPopup',
          //  //template: 'OK',
          //  cancelText: 'CANCEL',
          //  cancelType: 'button button-clear button-positive',
          //  okText: $scope.buttonText,
          //  okType: 'button button-clear button-positive'
          //};
          //
          //$scope.showConfirm = function () {
          //  console.log($scope.itemId);
          //  var confirmPopup = $ionicPopup.confirm($scope.ionicPopup);
          //  confirmPopup.then(function (res) {
          //    if (res) {
          //      $ionicLoading.show({
          //        template:'Loading...'
          //      });
          //      console.log($scope.num);
          //      var statusRoute;
          //      var approveRoute;
          //      var resetRoute;
          //      if(typeof $scope.itemId  == 'undefined') {
          //        statusRoute = 'sap/po/purchase_orders/' + $scope.num + '/status';
          //        approveRoute = 'sap/po/purchase_orders/' + $scope.num + '/approve';
          //        resetRoute = 'sap/po/purchase_orders/' + $scope.num + '/reset';
          //      }else{
          //        statusRoute =  'sap/pr/purchase_requisitions/' + $scope.num + '/items/' + $scope.itemId +'/status';
          //        approveRoute = 'sap/pr/purchase_requisitions/' + $scope.num + '/items/' + $scope.itemId + '/approve';
          //        resetRoute = 'sap/pr/purchase_requisitions/' + $scope.num + '/items/' + $scope.itemId + '/reset';
          //      }
          //      restApi.getData(statusRoute).then(function(response){
          //        console.log(response.results[0].DM_STATUS);
          //        console.log($scope.status);
          //        if(response.results[0].DM_STATUS == $scope.status) {
          //          if($scope.buttonText == 'Approve'){
          //            restApi.post(approveRoute).then(function(response){
          //              $ionicLoading.hide();
          //              if(typeof $scope.itemId  == 'undefined') {
          //                $state.go('poApproveDetail',{poNumber:$scope.num});
          //              }else{
          //                $state.go('prapproveDetail',{purchaseRequisitionID : $scope.num, itemID : $scope.itemId});
          //              }
          //              $scope.buttonText = 'Lock';
          //              console.log(response);
          //              console.log('approve');
          //            },function(err){
          //              $ionicLoading.hide();
          //              console.log(err);
          //            });
          //          }else if( $scope.buttonText =='Reset'){
          //            restApi.post(resetRoute).then(function(response){
          //              $ionicLoading.hide();
          //              if(typeof $scope.itemId  == 'undefined') {
          //                $state.go('poApproveDetail',{poNumber:$scope.num});
          //              }else{
          //                $state.go('prapproveDetail',{purchaseRequisitionID : $scope.num, itemID : $scope.itemId});
          //              }
          //              $scope.buttonText = 'Approve';
          //              console.log(response);
          //              console.log('reset');
          //            },function(err){
          //              console.log(err);
          //            })
          //          }else{
          //            console.log("Locked");
          //            $ionicLoading.hide();
          //          }
          //        }else{
          //          $ionicLoading.hide();
          //          $ionicLoading.show({
          //            template:'status has changed'
          //          });
          //          $timeout(function() {
          //            $ionicLoading.hide();
          //          }, 1000);
          //        }
          //      },function(err){
          //        $ionicLoading.hide();
          //        console.log(err);
          //      });
          //
          //    } else {
          //      console.log('cancel');
          //    }
          //  });
          //};
        },
        template: '<button ng-click="showConfirm()">{{buttonText}}</button>',
        replace: true
      };
    });


})();
