app.factory('DeliveryService',function($http){
    return{
        getDeliveries: function(){
            return $http.get('api/deliveries');
        },
        getDelivery : function(_id){
            return $http.get('api/deliveries/' + _id);
        },
        createDelivery : function(delivery){
            return $http.post('api/deliveries/',delivery)  
        },
        getSuppliers: function(){
            return $http.get('api/suppliers');
        },
        getItems: function(){
            return $http.get('api/items');
        },
        getDeliveryItem : function(id){
            return $http.get('api/deliveries/items/' + id);
        },
        updateItem : function(item){
            return $http.put('api/items/' + item._id,item);
        },
        getItem : function(id){
            return $http.get('api/items/' + id);
        }
    }
})