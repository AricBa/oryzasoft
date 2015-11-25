(function () {
  'use strict';
  angular.module('app.po', [])
    .factory('POData',function(Restangular){
      var POData ;
      var poRoute = 'sap/po/purchase_orders';
      POData = {
        getPOList : function(path,params){
          return Restangular.all(poRoute).customGET(path,params);
        },
        getPODetail: function(purchaseOrderID){
          return Restangular.all(poRoute + '/'+ purchaseOrderID).customGET();
        },
        //getPOStatus: function(purchaseOrderID){
        //  return Restangular.all(poRoute +'/'+ purchaseOrderID +'/status').customGET();
        //},
        //approvePO : function(purchaseOrderID){
        //  return Restangular.all(poRoute +'/'+ purchaseOrderID +'/approve').post();
        //},
        //resetPO : function(purchaseOrderID){
        //  return Restangular.all(poRoute +'/'+ purchaseOrderID +'/reset').post();
        //},
        getPOItemList : function(purchaseOrderID,path,params){
          return Restangular.all(poRoute+'/' +purchaseOrderID+'/items').customGET(path,params);
        },
        getPOItemDetail: function(purchaseOrderID,itemID){
          return Restangular.all(poRoute+'/' +purchaseOrderID+'/items/'+itemID).customGET();
        }
      };
      return POData;
    });

})();
