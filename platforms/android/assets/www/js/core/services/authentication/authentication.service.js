(function () {
    'use strict';
    angular
        .module('app.core')
        .provider('Authentication',function() {
          this.$get = function($http, Restangular, Token, localStorageService,$q) {
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
                      return Restangular.all('users/register').post(params);
                  },
                  signupwithcom :function(params){
                    return  Restangular.all('users/company').customGET('',params);
                  },
                  signin: function(params) {
                    var d = $q.defer();
                    Restangular.all('users/login')
                      .customGET('',params)
                        .then(function(response) {
                            d.resolve(response);
                            console.log(response.token);
                            saveUserAndToken(response.token);
                        },function(err){
                          d.reject(err);
                        }).catch(function(err){
                        console.log(err);
                        d.reject(err);
                      });
                    return d.promise;
                  },
                  signout: function() {
                      return  Restangular.all('users/logout')
                        .customGET()
                        .then(function(){
                          console.log("logout");
                            currentUser = null;
                            Token.remove();
                            localStorageService.remove('user');
                        });
                  },
                  isAuthenticated: function() {
                      return !!Token.get();
                  },
                  forgetPassword:function(params){
                      return  Restangular.all('users/password/forget')
                        .customGET('',params);
                  },
                  getCode:function(params){
                    return Restangular.all('sms/code')
                      .customGET('',params);
                  },
                  experenceLogin:function(params){
                    return Restangular.all('users/logindemo')
                      .customGET('',params);
                  },
                  getSAPAccount:function(){
                    return Restangular.all('users/sap_account')
                      .customGET();
                  },
                  postSAPAccount:function(params){
                    return  Restangular.all('users/sap_account')
                      .post(params);
                  },
                  getCurrentUser: function() {
                      return currentUser || localStorageService.get('user');
                  }
              };
          };
      });
})();
