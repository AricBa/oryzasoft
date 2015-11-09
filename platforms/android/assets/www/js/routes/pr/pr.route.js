/**
 * Created by C5226508 on 11/5/2015.
 */

(function () {
  'use strict';

  angular
    .module('app.po')
    .config(function($stateProvider) {
      $stateProvider
        .state('sideMenu.prList', {
          url: '/pr',
          views:{
            'po':{
              templateUrl: 'js/routes/pr/pr.html',
              controller: 'prCtrl'
            }
          },
          cache:false,
          resolve: {/* @ngInject */
            prList: function(restApi,$q,$ionicLoading){
              var d = $q.defer();

              $ionicLoading.show({
                template:'Loading...'
              });
              var route =  'sap/pr/purchase_requisitions';

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
        .state('prDetail', {
          url:'prDetail/:purchaseRequisitionID',
          templateUrl: 'js/routes/pr/prDetail.html',
          controller:'prDetailCtrl',
          cache:false,
          resolve:{
            PR :function ($stateParams,restApi,$q,$ionicLoading){
              var d = $q.defer();

              $ionicLoading.show({
                template:'Loading...'
              });

              var route = 'sap/pr/purchase_requisitions/'+$stateParams.purchaseRequisitionID + '/items';

              restApi.getData(route).then(function(response){
                d.resolve(response);
                //if(response.results[0].DM_STATUS == 0 || response.results[0].DM_STATUS == 6) {
                //  d.resolve([response,'Approve']);
                //}else if (response.results[0].DM_STATUS == 1 || response.results[0].DM_STATUS == 5 ){
                //  d.resolve([response,'Lock']);
                //}else{
                //  d.resolve([response,'Reset']);
                //}
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

        });
    });
})();
