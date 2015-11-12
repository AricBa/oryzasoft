(function () {
    'use strict';
    angular
        .module('app.signin')
        .controller('SigninCtrl',function($scope,$rootScope, $state, Authentication, $cordovaVibration,$ionicLoading) {

        $scope.signIn = function(credentials, isValid) {
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
        $scope.goToSignup = function(){
              $state.go('signup');
          };

        $scope.goToForPas = function(){
          $state.go('forgetPassword');
        };

        $scope.goToExperience = function(){
          $state.go('experience');
        }
      })
      .controller('forgetPasswordCtrl',function($scope,Authentication,$ionicLoading){
        $scope.email = '';
        $scope.getPassword = function(email,isValid){
          var params = {
            email :email
          };
          console.log(params);
          $ionicLoading.show({
            template:'send message...'
          });
          if(!isValid) {return;}
          Authentication.forgetPassword(params).then(function(response){
            $ionicLoading.hide();
            $ionicLoading.show({
              template:'send message successful, check your mailbox'
            });
            $timeout(function() {
              $ionicLoading.hide();
            }, 1000);
          },function(err){
            console.log(err);
            $ionicLoading.hide();
          })
        };
      })
      .controller('experienceCtrl',function($scope,Authentication,$state){
        $scope.user = {};
         $scope.getVerificationCode = function(phoneNumber){
           console.log(phoneNumber);
           var params = {
             telphone: phoneNumber
           };
           Authentication.getCode(params).then(function(response){
             console.log(response);
           },function(err){
             console.log(err);
           });
         };

        $scope.startExperience = function(user){
          console.log(user);
          var params = {
            telphone : user.phoneNumber,
            code : user.code
          };
          Authentication.experenceLogin(params).then(function(response){
            console.log(response);
            $state.go('home');
          },function(err){
            console.log(err);
          });
        };

      });
})();
