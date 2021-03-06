/**
 * Created by C5226508 on 11/5/2015.
 */
(function () {
  'use strict';
  angular
    .module('app.user')
    .controller('userCtrl',['Authentication','$scope','$state',function(Authentication,$scope,$state){
       $scope.signOut = function(){
         Authentication.signout().then(function () {
           $state.go('signin');
           console.log("success");
         }, function (err) {
           console.log('error ' + err);
           $state.go('signin');
         });
       };

      $scope.addAccount = function(){
        Authentication.postSAPAccount()

      };

      $scope.goBack = function(){
        $state.go('home');
      }
    }])
    .controller('addsapCtrl',['Authentication','$scope','$ionicLoading','$state',
      function(Authentication,$scope,$ionicLoading,$state){
      $scope.sapaccount = {};

      $scope.addSAPAccount = function(account,isValid){
        $ionicLoading.show({
          template:'Verifing...'
        });
        if(!isValid) {return;}
        Authentication.postSAPAccount(account).then(function(response){
          $ionicLoading.hide();
          console.log(response);
        },function(err){
          $ionicLoading.hide();
          console.log(err);
        })
        };

        $scope.goBack = function(){
          $state.go('user');
        }
      }])
      .controller('userDetailCtrl',['$scope','$state',function($scope,$state){
            $scope.goBack = function(){
              $state.go('user');
            }
      }])
          .controller('aboutCtrl',['$scope','versionUpdate','$state',function($scope,versionUpdate,$state){
            $scope.update = function(){
              versionUpdate.checkUpdate();
            };
            $scope.goBack = function(){
              $state.go('user');
            }
          }])
          .controller('messageCtrl',['$scope','localStorageService','$state',function($scope,localStorageService,$state){
            $scope.messages = localStorageService.get('message');
            $scope.goBack = function(){
              $state.go('user');
            }
          }])
      })();
