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
       }
    })

})();
