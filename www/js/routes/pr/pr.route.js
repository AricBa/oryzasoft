/**
 * Created by C5226508 on 11/4/2015.
 */
(function () {
  'use strict';

  angular
    .module('app.pr')
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
          cache:false,
          resolve: {/* @ngInject */
            poList: function(restApi,$q,$ionicLoading){
              var d = $q.defer();

              $ionicLoading.show({
                template:'Loading...'
              });
              var route =  'sap/po/purchase_orders';

              var path ='';
              var params = {
                pageIndex : '1',
                filter: ['0','6']
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
        });
    });
})();
