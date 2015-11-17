/**
 * Created by C5226508 on 11/2/2015.
 */
(function () {
  'use strict';
  angular
    .module('app.home')
    .controller('homeCtrl', function($cordovaInAppBrowser,$scope,$ionicPopup,$timeout,
                                     $cordovaClipboard,$cordovaCamera,$ionicActionSheet,localStorageService){


      //var onGetRegistradionID = function(data) {
      //    try{
      //        alert("JPushPlugin:registrationID is : " + data)      }
      //    catch(exception){
      //        alert(exception);
      //    }
      //};
      //window.plugins.jPushPlugin.getRegistrationID(onGetRegistradionID);
          //
          //$scope.url = "http://www.baidu.com";
          //$scope.click = function(url){
          //    $cordovaInAppBrowser.open(encodeURI($scope.url),'_blank')
          //        .then(function(event){
          //
          //        });
          //
          //    //$cordovaInAppBrowser.close();
          //};
          //
          //
          //$scope.call = function(num){
          //    var myPopup = $ionicPopup.show({
          //        scope: $scope,
          //        buttons:[
          //            {
          //                text: 'Call',
          //                type: 'button-positive',
          //                onTap: function(e){
          //                    document.location.href = "tel:" + num;
          //                }
          //            },
          //            {
          //                text: 'sendMessage',
          //                type: 'button-positive',
          //                onTap: function(e){
          //                    var number = num;
          //                    var message = 'test';
          //                    alert(number);
          //                    alert(message);
          //
          //                    //CONFIGURATION
          //                    var options = {
          //                        replaceLineBreaks: false, // true to replace \n by a new line, false by default
          //                        android: {
          //                            intent: 'INTENT'  // send SMS with the native android SMS messaging
          //                            //intent: '' // send SMS without open any other app
          //                        }
          //                    };
          //
          //                    var success = function () { alert('Message sent successfully'); };
          //                    var error = function (e) { alert('Message Failed:' + e); };
          //                    sms.send(number, message, options, success, error);
          //                }
          //            },
          //            {
          //                text: 'Copy',
          //                type: 'button-positive',
          //                onTap: function(e){
          //                    $cordovaClipboard.copy(num).then(function(){
          //                        console.log("success");
          //                    },function() {
          //                        console.log("err");
          //                    });
          //                }
          //            },
          //            {
          //                text:'Cancel'
          //            }
          //        ]
          //    });
          //    myPopup.then(function(res) {
          //        console.log('Tapped!', res);
          //    });
          //    $timeout(function() {
          //        myPopup.close(); //close the popup after 3 seconds for some reason
          //    }, 5000);
          //};
          //
          //
          //$scope.parse = function(){
          //        $cordovaClipboard.copy('num').then(function(){
          //            alert("success");
          //            $cordovaClipboard.paste().then(function (result) {
          //                alert(result);
          //            }, function () {
          //                // error
          //            });
          //        },function() {
          //            console.log("err:" );
          //        });
          //
          //};
          //
          //function takePhoto(){
          //    $cordovaCamera.getPicture({ quality: 150, targetWidth: 100, targetHeight: 100,allowEdit: true, destinationType: Camera.DestinationType.FILE_URI,sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM }).then(function (imageData) {
          //        var image = document.getElementById('myImage');
          //
          //        image.src =  imageData;
          //    }, function (err) {
          //        //error
          //    });
          //}
          //function makePhoto(){
          //    $cordovaCamera.getPicture({ quality: 150, targetWidth: 100, targetHeight: 100,allowEdit: true, destinationType: Camera.DestinationType.FILE_URI
          //    }).then(function (imageData) {
          //        var image = document.getElementById('myImage');
          //
          //        image.src =  imageData;
          //    }, function (err) {
          //        //error
          //    });
          //}
          //$scope.showActionsheet = function(){
          //    $ionicActionSheet.show({
          //        titleText : 'change picture',
          //        cancelText: 'cancel',
          //        buttons   : [{text:'takephoto'},{text:'select from album'}],
          //        //cancel    : function(){},
          //        buttonClicked : function(index){
          //            switch(index){
          //                case  1: takePhoto();break;
          //                case  0: makePhoto();break;
          //                //default: makePhoto();break;
          //            }
          //            return true;
          //        }
          //    });
          //};
          //
          //$scope.local = localStorageService.get('user');
    });
})();
