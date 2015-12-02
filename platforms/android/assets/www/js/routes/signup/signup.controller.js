
(function () {
    'use strict';
    angular
      .module('app.signup')
      .controller('SignupCtrl',['$location', '$rootScope', 'customFunct','$state', 'Authentication','$scope','$ionicLoading',
        function($location, $rootScope, customFunct,$state, Authentication, $scope,$ionicLoading) {
        $scope.user = {};

        $scope.goBack = function(){
          $state.go('signin');
        };
        $scope.signUp = function(user, isValid) {
          console.log(user);
            $ionicLoading.show({
              template:'sign up...'
            });
            if(!isValid) {return;}
            Authentication.signup(user).then(function (response) {
              $scope.message = 'Next step';
              $ionicLoading.hide();
              console.log(response);
              $state.go('company',{email : user.email,password : user.password});
            }, function(err) {
              console.error('error' + err);
              $ionicLoading.hide();
              customFunct.myNotice(err.data.message);
            });
        };
        }])
      .controller('companyCtrl',['$state','$scope','customFunct','$stateParams','Authentication','$ionicLoading',
        function($state,$scope,customFunct,$stateParams,Authentication,$ionicLoading){
        $scope.companyEmail = '';
        $scope.password =$stateParams.password;
        $scope.email = $stateParams.email;
        $scope.addCompanyInfo = function(companyEmail){
          $ionicLoading.show({
            template:'sign up...'
          });
          $scope.companyEmail = companyEmail;
          var params = {
            useremail: $scope.email,
            password : $scope.password,
            adminemail: $scope.companyEmail
          };

          Authentication.signupwithcom(params).then(function(response){
            $state.go('signin');
            console.log(response);
            $ionicLoading.hide();
          },function(err){
            $ionicLoading.hide();
            console.log(err);
            customFunct.myNotice(err.data.message);
          })
        };
        $scope.goToExperience = function(){
          $state.go('experience');
        };
        $scope.goBack = function(){
          $state.go('signup');
        };
      }]);
})();
