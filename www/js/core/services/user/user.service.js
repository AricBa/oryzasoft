(function () {
    'use strict';
    angular
        .module('app.core')
        .factory('UserService',function(Restangular) {
          return {
              get: function(id) {
                  return Restangular
                    .one('users', id)
                    .get();
              },
              getList: function() {
                  return Restangular
                    .all('users')
                    .getList();
              }
          };
      });

})();
