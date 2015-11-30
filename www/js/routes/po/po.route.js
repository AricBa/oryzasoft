
(function () {
  'use strict';

  angular
    .module('app.po')
    .config(function($stateProvider) {
      $stateProvider
        .state('sideMenu.poList', {
          url: '/po',
          views:{
            'po':{
              templateUrl: 'js/routes/po/poList.html',
              controller: 'poListCtrl'
            }
          },
          cache : false,
          resolve: {/* @ngInject */
            poList: function(POData,$q,$ionicLoading,$timeout,$rootScope){
              var d = $q.defer();
              $ionicLoading.show({
                template:'Loading...'
              });
              var path ='';
              var params = {
                pageIndex : '1',
                filter: "0,6"
              };
              POData.getPOList(path,params).then(function(response){
                $rootScope.note ='';
                d.resolve(response);
                console.log(response);
                $ionicLoading.hide();
              });

              return d.promise;
              //return Restangular.all('sap/po/purchase_orders').get('',{});
            }
          },
          data: {
            authenticate: true
          }
        })
        .state('poDetail', {
          url:'poDetail/:poNumber',
          templateUrl: 'js/routes/po/poDetail.html',
          controller:'poDetailCtrl',
          cache:false,
          resolve:{
            PODetail :function ($stateParams,POData,$q,$ionicLoading){
              var d = $q.defer();

              $ionicLoading.show({
                template:'Loading...'
              });

              POData.getPODetail($stateParams.poNumber).then(function(response){
                if(response.results[0].DM_STATUS == 0 || response.results[0].DM_STATUS == 6) {
                  d.resolve([response,'Approve']);
                }else if (response.results[0].DM_STATUS == 1 || response.results[0].DM_STATUS == 5 ){
                  d.resolve([response,'Lock']);
                }else{
                  d.resolve([response,'Reset']);
                }
                $ionicLoading.hide();
              },function(err){
                d.reject(err);
                $ionicLoading.hide();
              });

              return d.promise;
            }
          },
          data: {
            authenticate: true
          }
        })
        .state('poItems',{
          url:'poDetail/:poNumber/items',
          templateUrl: 'js/routes/po/poItems.html',
          controller:'POItemsCtrl',
          resolve:{
            POItemList:function($stateParams,POData,$q,$ionicLoading){
              var d = $q.defer();
              $ionicLoading.show({
                template:'Loading...'
              });

              var path ='';
              var params = {
                pageIndex : '1'
              };
              POData.getPOItemList($stateParams.poNumber,path,params).then(function(response){
                d.resolve(response);
                $ionicLoading.hide();
              });
              return d.promise;
            }
          },
          data: {
            authenticate: true
          }
        })
        .state('poItemDetail',{
          url:'poDetail/:poNumber/items/:itemId',
          templateUrl: 'js/routes/po/poItemDetail.html',
          controller:'poItemDetailCtrl',
          resolve:{
            POItemDetail:function($stateParams,POData,$q,$ionicLoading){
              var d = $q.defer();
              $ionicLoading.show({
                template:'Loading...'
              });

              var route =  'sap/po/purchase_orders/'+$stateParams.poNumber+'/items/'+$stateParams.itemId;
              POData.getPOItemDetail($stateParams.poNumber,$stateParams.itemId).then(function(response){
                d.resolve(response);
                $ionicLoading.hide();
              });

              return d.promise;
            }
          },
          data: {
            authenticate: true
          }
        })
        .state('poApproveDetail',{
          url:'approveDetail/:poNumber',
          templateUrl:'js/routes/po/poApproveDetail.html',
          controller:'poApproveDetailCtrl',
          cache:false,
          resolve:{
            poApprove:function($q,$ionicLoading,POData,$stateParams){
              var d = $q.defer();
              $ionicLoading.show({
                template:'Loading...'
              });
              POData.getPODetail($stateParams.poNumber).then(function(response){
                d.resolve(response);
                $ionicLoading.hide();
              });
              return d.promise;
            }
          },
          data: {
            authenticate: true
          }
        });
    });
})();
