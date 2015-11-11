/**
 * Created by C5226508 on 11/7/2015.
 */

(function () {
  'use strict';
  angular
    .module('app.core')
    .factory('customFunct', function($ionicLoading,$timeout,$ionicActionSheet) {
        var customFunct;
        customFunct = {
          myNotice : function(msg,timeout){
            $ionicLoading.show({template: msg});
            $timeout(function(){
              $ionicLoading.hide();
            },timeout || 1000);
            return false;
          }
      };
      return customFunct;
    })
})();