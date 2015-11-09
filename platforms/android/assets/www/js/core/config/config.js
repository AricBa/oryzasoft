/**
 * Core configuration.
 *
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   The MIT License {@link http://opensource.org/licenses/MIT}
 */
(function () {
    'use strict';

    /* @ngInject */
    function onConfig($urlRouterProvider, RestangularProvider, localStorageServiceProvider, SERVER_API_URL) {
        // use "ionic-photo-gallery" as a localStorage name prefix so app doesn’t accidently read data from another app using the same variable names
        localStorageServiceProvider.setPrefix('ionic-photo-gallery')
          .setNotify(true, true);

        // set material design template
        //$mdThemingProvider.theme('default')
        //    .primaryPalette('teal')
        //    .accentPalette('brown')
        //    .warnPalette('deep-orange');

        /*********************************************************************
         * Route provider configuration based on these config constant values
         *********************************************************************/
        // set restful base API Route
        RestangularProvider.setBaseUrl(SERVER_API_URL);

        // set the `id` field to `_id`
        RestangularProvider.setRestangularFields({
            id: '_id'
        });

        $urlRouterProvider.otherwise('/signin');

        //RestangularProvider.setDefaultHttpFields({cache: true});

        //RestangularProvider.addRequestInterceptor(function(element, operation, route, url) {
        //    if(operation == 'customGET'){
        //        debugger;
        //
        //    }
        //    return element;
        //});

        //RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred){
        //    if( operation == 'customGET' || operation == 'get'){
        //        //localStorageService.set(url,data);
        //    }
        //});
    }

    /* @ngInject */
    function onRun($ionicPlatform, $rootScope, $location, Authentication) {
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

        });

        function onDeviceReady() {
            //alert(device.uuid);
            //alert(device.version);
            window.plugins.jPushPlugin.init();
            window.plugins.jPushPlugin.setDebugMode(true);
        };
        window.document.addEventListener("deviceready", onDeviceReady, false);

        var onOpenNotification = function(event){
            try{
                var alertContent
                if(device.platform == "Android"){
                    alertContent = window.plugins.jPushPlugin.openNotification.alert;
                }else{
                    alertContent   = event.aps.alert;
                }
                alert("open Notification:"+alertContent);

            }
            catch(exception){
                console.log("JPushPlugin:openNotification-->"+exception);
            }
        };

        window.document.addEventListener("jpush.openNotification", onOpenNotification, false);

        var onReceiveNotification = function(event){
            try{
                var alertContent
                if(device.platform == "Android"){
                    alertContent = window.plugins.jPushPlugin.receiveNotification.alert;
                }else{
                    alertContent   = event.aps.alert;
                }
                alert("open Notification:"+alertContent);

            }
            catch(exception){
                console.log("JPushPlugin:receiveNotification-->"+exception);
            }
        };

        window.document.addEventListener("jpush.receiveNotification", onReceiveNotification, false);

        var onReceiveMessage = function(event){
            try{
                var message
                if(device.platform == "Android"){
                    message = window.plugins.jPushPlugin.receiveMessage.message;
                }else{
                    message   = event.content;
                }
                alert(message);

            }
            catch(exception){
                console.log("JPushPlugin:onReceiveMessage-->"+exception);
            }
        };

        window.document.addEventListener("jpush.receiveMessage", onReceiveMessage, false);

    }

    angular
        .module('app.core')
        .config(onConfig)
        .run(onRun)
        .constant('SERVER_API_URL', 'http://114.215.185.243:8080/data-app/rs/v1/'); //192.168.0.100 - 172.20.10.3
})();
