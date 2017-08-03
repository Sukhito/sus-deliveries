app.controller('DeliveriesCtrl',function($scope,DeliveryService){
    DeliveryService.getDeliveries().then(function(response){
        $scope.deliveries = response.data;
    })
});