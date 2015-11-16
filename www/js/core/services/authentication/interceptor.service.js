(function () {
    'use strict';
    angular
        .module('app.core')
        .factory('AuthenticationInterceptor', function($q, $location, Token) {
          return {
              request: function (config) {
                  var token = Token.get();
                  if (token) {
                      //config.headers = config.headers || {};
                      //config.headers.Authorization = 'Bearer ' + token;
                      config.headers.token = token;
                  }
                  return config;
              },
              responseError: function (rejection) {
                  // revoke client authentication if 401 is received
                  if (rejection != null && rejection.status === 401 && !!Token.get()) {
                      Token.remove();
                      $location.path('/');
                  }
                  return $q.reject(rejection);
              }
          };
      })
        .config(function ($httpProvider) {
            // we have to add the interceptor to the queue as a string because the interceptor depends upon service instances that are not available in the config block.
            $httpProvider.interceptors.push('AuthenticationInterceptor');
        });
})();
