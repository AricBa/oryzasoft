/**
 * Created by C5226508 on 11/23/2015.
 */
(function () {
  'use strict';
  angular.module('app.service', [])
    .factory('restApi',function(Restangular){
      var restApi;
      restApi = {
        getData: function(route,path,params,headers){
          return Restangular.all(route).customGET(path,params,headers);
        },
        refreshData: function(route,prams,headers){
          return Restangular.all(route).get(prams,headers);
        },
        post: function(route,params){
          return Restangular.all(route).post(params);
        }
      };

      return restApi;
    });

})();
