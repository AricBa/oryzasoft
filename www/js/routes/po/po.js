/**
 * Created by C5226508 on 11/2/2015.
 */
/**
 * Galleries module.
 *
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   The MIT License {@link http://opensource.org/licenses/MIT}
 */
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
