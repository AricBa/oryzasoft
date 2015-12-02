(function () {
    'use strict';
    angular
        .module('app.core')
        .factory('Token',  ['localStorageService', 'Base64',function(localStorageService, Base64) {
          var _tokenStorageKey = 'token';
          var _cachedToken = '';

          var set = function(token) {
              _cachedToken = token;
              localStorageService.set(_tokenStorageKey, token)
          };

          var get = function() {
              if (!_cachedToken) {
                  _cachedToken = localStorageService.get(_tokenStorageKey);
              }
              return _cachedToken;
          };

          var remove = function() {
              _cachedToken = null;
              localStorageService.remove(_tokenStorageKey);
          };

          var decodeToken = function(token) {
              var parts = token.split('.');

              if (parts.length !== 3) {
                  throw new Error('JWT must have 3 parts');
              }

              // get payload part of token that contains user data (Token look like xxxxxxxxxxx.yyyy.zzzzzzzzzzzz the y is the encoded payload.)
              var encoded = parts[1];

              // decode user data from payload token
              var decoded = Base64.decode(encoded);
              if (!decoded) {
                  throw new Error('Cannot decode the token');
              }

              return JSON.parse(decoded);
          };

          return {
              set: set,
              get: get,
              remove: remove,
              decodeToken: decodeToken
          }
      }]);
})();
