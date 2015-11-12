(function () {
    'use strict';
    angular
        .module('app.core')
        .provider('Authentication',function() {
          this.$get = function($http, Restangular, Token, localStorageService) {
              var currentUser = null;
              function saveUserAndToken(token) {
                  // store token to local storage
                  Token.set(token);
                  // decode user data from payload token
                  currentUser = Token.decodeToken(token);
                  // save user to locale storage
                  localStorageService.set('user', currentUser);
              }

              return {
                  signup: function(params) {
                      return Restangular
                        .all('users/register')
                        .post({},params);
                  },
                  signupwithcom :function(params){
                    return Restangular
                      .all('users/company')
                      .get('',params);
                  },
                  signin: function(params) {
                      return Restangular
                        .all('users/login')
                          //.customGET('',params)
                        .get('',params)
                        .then(function(response) {
                           console.log(response.token);
                            saveUserAndToken(response.token);
                        });
                  },
                  signout: function() {
                      return Restangular
                        .one('auth/signout')
                        .get()
                        .then(function(){
                            currentUser = null;
                            Token.remove();
                        });
                  },
                  isAuthenticated: function() {
                      return !!Token.get();
                  },
                  forgetPassword:function(params){
                      return Restangular
                        .all('users/password/forget')
                        .get('',params);
                  },
                  getCode:function(params){
                    return Restangular
                      .all('sms/code')
                      .get('',params);
                  },
                  experenceLogin:function(params){
                    return Restangular
                      .all('users/logindemo')
                      .get('',params);
                  },
                  getCurrentUser: function() {
                      return currentUser || localStorageService.get('user');
                  }
              };
          };
      });
})();
