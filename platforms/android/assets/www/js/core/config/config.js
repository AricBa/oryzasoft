(function () {
    'use strict';

    angular
        .module('app.core')
        .config(['$urlRouterProvider', 'RestangularProvider', 'localStorageServiceProvider',
        'SERVER_API_URL','$translateProvider',
          function($urlRouterProvider, RestangularProvider, localStorageServiceProvider,
                   SERVER_API_URL,$translateProvider) {
          localStorageServiceProvider.setPrefix('ionic-photo-gallery')
            .setNotify(true, true);

          RestangularProvider.setBaseUrl(SERVER_API_URL);

          // set the `id` field to `_id`
          RestangularProvider.setRestangularFields({
              id: '_id'
          });

          $urlRouterProvider.otherwise('/signin');

          $translateProvider.useStaticFilesLoader({
            files: [{
              prefix: 'resourses/language/locale-',
              suffix: '.json'
            }]
          });
            $translateProvider.preferredLanguage('E');
      }])
        .run(['$ionicPlatform', '$rootScope', '$location', 'Authentication','localStorageService','$state',
        '$translate',
          function($ionicPlatform, $rootScope, $location, Authentication,localStorageService,$state,
                   $translate) {
          $ionicPlatform.ready(function() {
              // save user profile details to $rootScope
              $rootScope.me = Authentication.getCurrentUser();

              // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
              // for form inputs)
              if (window.cordova && window.cordova.plugins.Keyboard) {
                  cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
              }
              if (window.StatusBar) {
                  // org.apache.cordova.statusbar required
                  StatusBar.styleDefault();
              }

              $rootScope.$on('$stateChangeStart', function (event, toState) {
                  if(toState.data.authenticate && !Authentication.isAuthenticated()) {
                      console.log('No authorized!');
                      event.preventDefault();
                      $location.path('/#/signin');
                  }
              });
              $rootScope.note = '';

          });

          function onDeviceReady() {
              cordova.getAppVersion.getVersionNumber().then(function (version) {
                  $rootScope.currentVersion = version;
              });
              //alert("deviceID:" + device.uuid);
              //alert(device.version);

              window.plugins.jPushPlugin.init();
              window.plugins.jPushPlugin.setDebugMode(true);

              //if(window.plugins.jPushPlugin.isPlatformIOS()){
              //window.plugins.jPushPlugin.setApplicationIconBadgeNumber(0);
              //window.plugins.jPushPlugin.setBadge(10);
              //}
              //window.plugins.jPushPlugin.reSetBadge();

            navigator.globalization.getPreferredLanguage(
              function (language) {
                alert('language: ' + language.value + '\n');
                if(language.value == 'en-US'){
                  $translate.use('E');
                }else if(language.value == 'zh-CN'){
                  $translate.use('1');
                }
              },
              function () {
                alert('Error getting language\n');
              }
            );
          }
          window.document.addEventListener("deviceready", onDeviceReady, false);

          var onOpenNotification = function(event){
              try{
                  var alertContent ;
                  if(device.platform == "Android"){
                      alertContent = window.plugins.jPushPlugin.openNotification.alert;
                  }else{
                      alertContent   = event.aps.alert;
                  }
                  var notification = alertContent.split(" ");
                  if(notification[0] == "poList"){
                      $state.go('sideMenu.poList');
                      $rootScope.note ='';
                      $rootScope.$apply($rootScope.note);
                  }else{
                      $state.go('poApproveDetail',{poNumber:notification[0]},{reload:true});
                  }
              }
              catch(exception){
                  console.log("JPushPlugin:openNotification-->"+exception);
              }
          };
          window.document.addEventListener("jpush.openNotification", onOpenNotification, false);


          var onReceiveNotification = function(event){
              try{
                  var alertContent;
                  if(device.platform == "Android"){
                      alertContent = window.plugins.jPushPlugin.receiveNotification.alert;
                  }else{
                      alertContent   = event.aps.alert;
                  }
                  //alert("open Notification:"+alertContent);
                  if(window.plugins.jPushPlugin.isPlatformIOS()){
                      window.plugins.jPushPlugin.setApplicationIconBadgeNumber(0);
                  }
                  //alert("receive" + alertContent);
                  var notification = alertContent.split(" ");
                  if(notification[0] == "poList"){
                      $rootScope.note = 'poList get success, please refesh the list';
                      $rootScope.$apply($rootScope.note);
                  }
                  localStorageService.set('message',alertContent);
              }
              catch(exception){
                  console.log("JPushPlugin:receiveNotification-->"+exception);
              }
          };
          window.document.addEventListener("jpush.receiveNotification", onReceiveNotification, false);


          var onReceiveMessage = function(event){
              try{
                  var message;
                  if(device.platform == "Android"){
                      message = window.plugins.jPushPlugin.receiveMessage.message;
                  }else{
                      message   = event.content;
                  }
                  alert("receive message:"+ message);
              }
              catch(exception){
                  console.log("JPushPlugin:onReceiveMessage-->"+exception);
              }
          };
          window.document.addEventListener("jpush.receiveMessage", onReceiveMessage, false);

      }])
        .constant('SERVER_API_URL', 'http://114.215.185.243:8080/data-app/rs/v1/'); //192.168.0.100 - 172.20.10.3
})();
