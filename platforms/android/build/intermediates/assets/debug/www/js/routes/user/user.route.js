/**
 * Created by C5226508 on 11/5/2015.
 */
(function () {
  'use strict';

  angular
    .module('app.user')
    .config(function($stateProvider) {
      $stateProvider
        .state('user', {
          url: '/user',
          templateUrl: 'js/routes/user/user.html',
          controller: 'userCtrl',
          cache:false,
          //resolve: {/* @ngInject */
          //  user: function(restApi,$q,$ionicLoading){
          //    var d = $q.defer();
          //
          //    $ionicLoading.show({
          //      template:'Loading...'
          //    });
          //    var route =  'sap/po/purchase_orders';
          //
          //    var path ='';
          //    var params = {
          //      pageIndex : '1',
          //      filter: ['0','6']
          //    };
          //    restApi.getData(route,path,params).then(function(response){
          //      d.resolve(response);
          //      console.log(response);
          //      $ionicLoading.hide();
          //    });
          //
          //    return d.promise;
          //    //return Restangular.all('sap/po/purchase_orders').get('',{});
          //  }
          //},
          data: {
            authenticate: true
          }
        });
    });
})();
