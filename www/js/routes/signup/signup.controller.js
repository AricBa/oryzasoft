
(function () {
    'use strict';
    angular
        .module('app.signup')
        .controller('SignupCtrl',function($location, $rootScope, $state, Authentication) {
          var vm = this;
          vm.user = {};
          vm.signUp = function(user, isValid) {
              if(!isValid) {return;}
              Authentication.signup(user).then(function () {
                  // save user profile details to $rootScope
                  $rootScope.me = Authentication.getCurrentUser();

                  $state.go('app.gallery', { userId: $rootScope.me._id});
              }, function(err) {
                  console.error('error' + err);
              });
          };

          vm.goHome = function() {
              $location.path('/');
          };

          vm.goToSignin = function(){
              $state.go('signin');
          };
      });
})();
