app.controller('DeliveryNewCtrl',function($scope,DeliveryService,$state){
    DeliveryService.getSuppliers().then(function(response){
        $scope.suppliers = response.data;
    })
    
    DeliveryService.getItems().then(function(response){
        $scope.sellingItems = response.data;
    })
    
    $scope.save = function(){
        DeliveryService.createDelivery($scope.delivery).then(function(response){
            if(response.data._id){
                
                alert("success");
            }
            $state.go('delivery',{deliveryId:response.data._id})
        })
    }

    $scope.delivery = {
        "_supplier" : null,
        "date" : new Date(),
        "items" : [

        ],
        "total" : 0
    }

    function item(selectedItem) {
        this._item = selectedItem;
        this.qty = 0;
        this.unit = "dos";
        this.gross = 0;
        this.calc = [],
        this.net = 0,
        this.lineTotal = 0
    }
    
    $scope.onSelectItem = function(selectedItem, model,label ){
        $scope.delivery.items.push(new item(selectedItem));
        $scope.selected = "";
    }
    
    $scope.addCalculation = function(itemCalc){
        itemCalc.push({nominal : 0});
    }
    
    $scope.removeCalculation = function(itemCalc,index){
        itemCalc.splice(index,1)
    }
    
    $scope.$watch('delivery.items', function() {
        if($scope.delivery){
            var total = 0;
            for(var i = 0; i < $scope.delivery.items.length;i++){
                var netTemp = $scope.delivery.items[i].gross;
                for(var j = 0; j < $scope.delivery.items[i].calc.length;j++){
                    if($scope.delivery.items[i].calc[j].nominal < -1){
                        netTemp= netTemp + $scope.delivery.items[i].calc[j].nominal;
                    }else if($scope.delivery.items[i].calc[j].nominal < 1){
                        netTemp= netTemp * ( 1 + $scope.delivery.items[i].calc[j].nominal);
                    }else{
                        netTemp = netTemp + $scope.delivery.items[i].calc[j].nominal;
                    }
                }
                $scope.delivery.items[i].net = netTemp;
                $scope.delivery.items[i].lineTotal=netTemp * $scope.delivery.items[i].qty;
                total = total + $scope.delivery.items[i].lineTotal;
            }
            
            $scope.delivery.total=total;
            
        }
    },true);
});