/**
 * Created by C5226508 on 11/5/2015.
 */
(function () {
  'use strict';
  angular
    .module('app.user')
    .controller('userCtrl',function(Authentication,$scope,$state){
       $scope.signOut = function(){
         Authentication.signout().then(function () {
           $state.go('signin');
         }, function (err) {
           console.log('error ' + err);
           $state.go('signin');
         });
       };

      $scope.addAccount = function(){
        Authentication.postSAPAccount()

      };
    })
    .controller('addsapCtrl',function(Authentication,$scope,$ionicLoading){
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
    })
    .controller('userDetailCtrl',function(){

    })
    .controller('aboutCtrl',function(){

    })
})();
