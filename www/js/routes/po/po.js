(function () {
  'use strict';

  /**
   * @ngdoc module
   * @name app.galleries
   */
  angular.module('app.po', [])
    .factory('restApi',function(Restangular){
      var restApi;
      restApi = {
        getData: function(route,path,params,headers){
          return Restangular.all(route).customGET(path,params,headers);
        },
        refreshData: function(route,prams,headers){
          return Restangular.all(route).get(prams,headers);
        },
        post: function(route){
          return Restangular.all(route).post();
        }
      };

      return restApi;
    });

})();
