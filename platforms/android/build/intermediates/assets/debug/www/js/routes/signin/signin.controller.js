(function () {
    'use strict';
    angular
        .module('app.signin')
        .controller('SigninCtrl',function($rootScope, $state, Authentication, $cordovaVibration,$ionicLoading) {
          var vm = this;
          vm.signIn = function(credentials, isValid) {
              $ionicLoading.show({
                  template:'log in...'
              });
              if(!isValid) {return;}
              Authentication.signin(credentials).then(function () {
                  $ionicLoading.hide();
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
