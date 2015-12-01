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
    .factory('versionUpdate',function($http,$rootScope,$ionicPopup,$ionicLoading,
                                      $cordovaFileTransfer,$cordovaFileOpener2,$timeout,customFunct){
      var versionUpdate;
      versionUpdate = {
        checkUpdate: function(){
          $http({
            method: 'POST',
            url:'http://www.pgyer.com/apiv1/app/getAppKeyByShortcut',
            data: $.param({
              shortcut: "MRKK",
              _api_key: "3e82e9b1d0472abd52e0b292b5ff02cd"
            }),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          }).success(function(data){
            if($rootScope.currentVersion != data.data.appVersion){
              var confirmPopup =  $ionicPopup.confirm({
                title:'version update',
                template: 'Get latest version',
                cancelText: 'Cancel',
                okText: 'Update'
              });

              confirmPopup.then(function(res){
                if(res){
                  $ionicLoading.show({
                    template: "download: 0%"
                  });

                  var url= "http://www.pgyer.com/apiv1/app/install?_api_key=3e82e9b1d0472abd52e0b292b5ff02cd" +
                    "&aKey="+data.data.appKey+"&password=123";
                  var targetPath ="file:///storage/sdcard0/Download/test.apk";
                  var trustHosts = true;
                  var options = {};

                  $cordovaFileTransfer.download(url, targetPath, options, trustHosts).then(function (result) {
                    // open the download app
                    $cordovaFileOpener2.open(targetPath, 'application/vnd.android.package-archive'
                    ).then(function () {
                        // success
                      }, function (err) {
                        // error
                      });
                    $ionicLoading.hide();
                  }, function (err) {
                    customFunct.myNotice('download error');
                  }, function (progress) {
                    //progress
                    $timeout(function () {
                      var downloadProgress = (progress.loaded / progress.total) * 100;
                      $ionicLoading.show({
                        template: "download: " + Math.floor(downloadProgress) + "%"
                      });
                      if (downloadProgress > 99) {
                        $ionicLoading.hide();
                      }
                    });
                  });
                }else{
                  //cancel
                }
              });
            }else {
              customFunct.myNotice("The current version is latest");
            }
          }).error(function(data,status){
          });
        },
      };

      return versionUpdate;
    })
})();