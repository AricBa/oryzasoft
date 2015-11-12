
(function () {
    'use strict';
    angular
        .module('app.signup')
        .controller('SignupCtrl',function($location, $rootScope, $state, Authentication, $scope,$ionicLoading) {
        $scope.message = 'Sign up';
        $scope.user = {};
          $scope.signUp = function(user, isValid) {
            console.log(user);
            if($scope.message == 'Sign up'){
              $ionicLoading.show({
                template:'sign up...'
              });
              if(!isValid) {return;}
              Authentication.signup(user).then(function () {
                $scope.message = 'Next step';
                $ionicLoading.hide();
              }, function(err) {
                console.error('error' + err);
                $ionicLoading.hide();
              });
            } else{
                $state.go('company',{email : user.email,password : user.password});
            }
          };
        })
      .controller('companyCtrl',function($state,$scope,$stateParams,Authentication){
        $scope.companyEmail = '';
        $scope.password =$stateParams.password;
        $scope.email = $stateParams.email;
        $scope.addCompanyInfo = function(companyEmail){
          $scope.companyEmail = companyEmail;
          var params = {
            email: $scope.email,
            password : $scope.password,
            adminemail: $scope.companyEmail
          };

          Authentication.signupwithcom(params).then(function(response){
            $state.go('signin');
            console.log(response);
          },function(err){
            console.log(err);
          })
        };
        $scope.goToExperience = function(){
          $state.go('experience');
        };
      });
})();
