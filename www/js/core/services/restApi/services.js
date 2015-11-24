/**
 * Created by C5226508 on 11/23/2015.
 */
(function () {
  'use strict';
  angular.module('app.service', ['$q'])
    .factory('restApi',function(Restangular){
      var restApi;
      restApi = {
        getData: function(route,path,params,headers){
          return Restangular.all(route).customGET(path,params,headers);
        },
        post: function(route,params){
          return Restangular.all(route).post(params);
        }
      };

      return restApi;
    });
    //
    //.factory('localService',function($q){
    //  var dbData;
    //  var localService;
    //  localService = {
    //    all: dbData,
    //    initDB : function (name){
    //       var oryzasoftDb = new PouchDB(name);
    //    },
    //
    //    addData : function(name,data){
    //      return $q.when(name.post(data))
    //    },
    //    updateData : function(name,data){
    //      return $q.when(name.put(data))
    //    },
    //    removeData : function(name,data){
    //      return $q.when(name.remove(data))
    //    },
    //    getAllData : function(name){
    //      if(!dbData){
    //        return $q.when(name.allDocs({include_docs:true}))
    //          .then(function(docs){
    //            dbData = docs.rows.map(function(row){
    //              row.doc.Date = new Date(row.doc.Date);
    //
    //              return row.doc;
    //            });
    //
    //            name.changes({live: true, since: 'now', include_docs:true})
    //              .on('change',localService.onDatabaseChange);
    //
    //            return dbData;
    //          });
    //      }else{
    //        return $q.when(dbData);
    //      }
    //    },
    //
    //    onDatabaseChange : function(change){
    //      var index = this.findIndex(dbData,change.id);
    //      var data = dbData[index];
    //
    //      if(change.deleted){
    //        if(data){
    //          dbData.splice(index,1);
    //        }
    //      }else{
    //        if(data && data._id === change.id){
    //          dbData[index] = change.doc;
    //        }else{
    //          dbData.splice(index,0,change.doc)
    //        }
    //      }
    //    },
    //
    //    findIndex: function(array, id){
    //      var low = 0,high = array.length,mid;
    //      while(low < high){
    //        mid = (low + high) >>> 1;
    //        array[mid]._id < id ? low = mid + 1 : high = mid
    //      }
    //
    //      return low;
    //    }
    //  };
    //
    //  return localService;
    //});

})();
