
(function () {
    'use strict';
    angular
        .module('app.signup')
        .controller('SignupCtrl',function($location, $rootScope, $state, Authentication, $scope) {
          //vm.user = {};
          $scope.signUp = function(user, isValid) {
              if(!isValid) {return;}
              Authentication.signup(user).then(function () {
                  // save user profile details to $rootScope
                  //$rootScope.me = Authentication.getCurrentUser();

                  $state.go('company');
              }, function(err) {
                  console.error('error' + err);
              });
          };
        })
      .controller('companyCtrl',function($state,$scope){
        $scope.addCompanyInfo = function(){

        };

        $scope.skipToExperience = function(){

        };

        $state.go('home', { userId: $rootScope.me.userId});
      });
})();
