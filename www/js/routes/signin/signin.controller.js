(function () {
    'use strict';
    angular
        .module('app.signin')
        .controller('SigninCtrl',function($rootScope, $state, Authentication, $cordovaVibration) {
          var vm = this;
          vm.signIn = function(credentials, isValid) {
              if(!isValid) {return;}
              Authentication.signin(credentials).then(function () {
                  // save user profile details to $rootScope
                  $rootScope.me = Authentication.getCurrentUser();

                  $state.go('home', { userId: $rootScope.me.userId});
              }, function(error) {
                alert(error.status);
                  $cordovaVibration.vibrate(100);
                  console.log('error ' + error);
              });
          };
          vm.goToSignup = function(){
              $state.go('signup');
          };
      });
})();
