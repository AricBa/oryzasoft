(function () {
    'use strict';
    angular
        .module('app.core')
        .provider('Authentication',function() {
          this.$get = function($http, restApi, Token, localStorageService,$q) {
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
                      return restApi.post('users/register',params);
                  },
                  signupwithcom :function(params){
                    return  restApi.getData('users/company','',params);
                  },
                  signin: function(params) {
                    var d = $q.defer();
                    restApi
                        .getData('users/login','',params)
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
                      return restApi
                        .getData('users/logout')
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
                      return restApi
                        .getData('users/password/forget','',params);
                  },
                  getCode:function(params){
                    return restApi
                      .getData('sms/code','',params);
                  },
                  experenceLogin:function(params){
                    return restApi
                      .getData('users/logindemo','',params);
                  },
                  getSAPAccount:function(){
                    return restApi
                      .getData('users/sap_account');
                  },
                  postSAPAccount:function(params){
                    return restApi
                      .post('users/sap_account',params);
                  },
                  getCurrentUser: function() {
                      return currentUser || localStorageService.get('user');
                  }
              };
          };
      });
})();
