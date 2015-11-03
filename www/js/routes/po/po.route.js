
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
              templateUrl: 'js/routes/po/po.html',
              controller: 'poCtrl'
            }
          },
          resolve: {/* @ngInject */
            poList: function(restApi,$q,$ionicLoading){
              var d = $q.defer();

              $ionicLoading.show({
                template:'Loading...'
              });
              var route =  'sap/po/purchase_orders';

              var path ='';
              var params = {
                pageIndex : '1'
              };
              restApi.getData(route,path,params).then(function(response){
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
          resolve:{
            PO :function ($stateParams,restApi,$q,$ionicLoading){
              var d = $q.defer();

              $ionicLoading.show({
                template:'Loading...'
              });

              var route = 'sap/po/purchase_orders/'+$stateParams.poNumber;

              restApi.getData(route).then(function(response){
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
          templateUrl: 'js/routes/po/items.html',
          controller:'itemsCtrl',
          resolve:{
            items:function($stateParams,restApi,$q,$ionicLoading){
              var d = $q.defer();
              $ionicLoading.show({
                template:'Loading...'
              });

              var route =  'sap/po/purchase_orders/'+$stateParams.poNumber+'/items';
              var path ='';
              var params = {
                pageIndex : '1'
              };
              restApi.getData(route,path,params).then(function(response){
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
        .state('itemDetail',{
          url:'poDetail/:poNumber/items/:itemId',
          templateUrl: 'js/routes/po/itemDetail.html',
          controller:'itemDetailCtrl',
          resolve:{
            item:function($stateParams,restApi,$q,$ionicLoading){
              var d = $q.defer();
              $ionicLoading.show({
                template:'Loading...'
              });

              var route =  'sap/po/purchase_orders/'+$stateParams.poNumber+'/items/'+$stateParams.itemId;
              var path ='';
              var params = {
                pageIndex : '1'
              };
              restApi.getData(route,path,params).then(function(response){
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
        .state('approveDetail',{
          url:'approveDetail/:poNumber',
          templateUrl:'js/routes/po/approveDetail.html',
          controller:'approveDetailCtrl',
          resolve:{
            poApprove:function($q,$ionicLoading,restApi,$stateParams){
              var d = $q.defer();
              $ionicLoading.show({
                template:'Loading...'
              });

              var route =  'sap/po/purchase_orders/'+$stateParams.poNumber;
              var path ='';
              var params = {
                pageIndex : '1'
              };
              restApi.getData(route,path,params).then(function(response){
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
