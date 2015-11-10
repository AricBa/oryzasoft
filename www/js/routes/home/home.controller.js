/**
 * Created by C5226508 on 11/2/2015.
 */
(function () {
  'use strict';
  angular
    .module('app.home')
    .controller('homeCtrl', function($cordovaInAppBrowser,$scope) {

          $scope.url = "www.baidu.com"
          $scope.click = function(url){
              $cordovaInAppBrowser.open(encodeURI($scope.url),'_blank')
                  .then(function(event){

                  })
                  .cache(function(event){

                  });

              //$cordovaInAppBrowser.close();
          };

    });
})();
