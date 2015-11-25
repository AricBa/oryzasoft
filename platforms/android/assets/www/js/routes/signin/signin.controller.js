(function () {
    'use strict';
    angular
      .module('app.signin')
      .controller('SigninCtrl',function($scope,customFunct,$rootScope,$timeout, $state, Authentication, $cordovaVibration,$ionicLoading) {
        $scope.credentials = {};

        $scope.signIn = function(credentials, isValid) {

          if($scope.credentials.email == 'test01@oryzasoft.com'){
            $scope.credentials.jid = 'jidabc01'
          }else{
            $scope.credentials.jid = 'jidabc02'
          }
          $ionicLoading.show({
                  template:'log in...'
              });
              if(!isValid) {return;}
              Authentication.signin(credentials).then(function (response) {
                  $ionicLoading.hide();
                  console.log(response);
                  // save user profile details to $rootScope

                  $rootScope.me = Authentication.getCurrentUser();
                  console.log($rootScope.me);

                  $state.go('home');
              }, function(error) {
                  $ionicLoading.hide();
                  //$cordovaVibration.vibrate(100);
                  console.log( error);
                //alert(error.data.message);
                customFunct.myNotice(error.data.message,2000);
              })
                .catch(function(err){
                  console.log(err);
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
      .controller('forgetPasswordCtrl',function($scope,customFunct,Authentication,$ionicLoading){
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
            customFunct.myNotice(response.data.message,2000);
          },function(err){
            console.log(err);
            $ionicLoading.hide();
            customFunct.myNotice(err.data.message,2000);

          })
        };
      })
      .controller('experienceCtrl',function($scope,customFunct,Authentication,$state,$ionicLoading){
        $scope.user = {};
         $scope.getVerificationCode = function(phoneNumber){
           console.log(phoneNumber);
           var params = {
             telphone: phoneNumber
           };
           $ionicLoading.show({
             template:'sending code...'
           });
           Authentication.getCode(params).then(function(response){
             console.log(response);
             $ionicLoading.hide();
           },function(err){
             console.log(err);
             $ionicLoading.hide();
           });
         };

        $scope.startExperience = function(user){
          console.log(user);
          var params = {
            telphone : user.phoneNumber,
            code : user.code
          };
          $ionicLoading.show({
            template:'login in...'
          });
          Authentication.experenceLogin(params).then(function(response){
            console.log(response);
            $state.go('home');
            $ionicLoading.hide();
          },function(err){
            console.log(err);
            $ionicLoading.hide();
            customFunct.myNotice(err.data.message);
          });
        };

      });
})();
