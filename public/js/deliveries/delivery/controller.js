app.controller('DeliveryCtrl',function($scope,$stateParams,DeliveryService,$uibModal){
    
    DeliveryService.getDelivery($stateParams.deliveryId).then(function(response){
        $scope.delivery = response.data;
    })

    $scope.printCalc = function(calculations){
        var toWrite = "";
        for(var i = 0; i < calculations.length;i++){
            if(calculations[i].nominal < -1){
                toWrite += calculations[i].nominal + " ";
            }else if(calculations[i].nominal < 0){
                toWrite += (calculations[i].nominal * 100).toFixed(3) + "%" + " ";
            }else if(calculations[i].nominal < 1){
                toWrite += "+" + (calculations[i].nominal * 100).toFixed(3) + "%" + " ";
            }else{
                toWrite += "+" + calculations[i].nominal + " ";
            }
        }

        return toWrite;
    }

    $scope.selectItem = function(selectedItem){
        editItemModal(selectedItem);
    }

    var editItemModal = function(selectedItem){
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl : "js/deliveries/delivery/select-item.html",
            controller : function($scope, $uibModalInstance,selectedItem,DeliveryService){
                DeliveryService.getItem(selectedItem._item._id).then(function(response){
                    $scope.item = response.data;
                })
                DeliveryService.getDeliveryItem(selectedItem._item._id).then(function(response){
                    $scope.deliveries = response.data;
                });

                var temp = null;

                $scope.edit = function(){
                    $scope.editMode = true;
                    temp = angular.copy(item);
                }

                $scope.save = function(){
                    $scope.editMode = false;

                    DeliveryService.updateItem($scope.item).then(function(response){
                        if(response.data){
                            alert("Success");
                        }else{
                            alert("Failed");
                        }
                    })
                }

                $scope.cancel = function(){
                    $scope.editMode = false;

                    item.name = temp.name;
                    item.dimension = temp.dimension;
                    item.modal = temp.modal;
                    item.jual = temp.jual;
                    item.ketmodal = temp.ketmodal;
                    item.ketjual = temp.ketjual;
                }

                $scope.section = function(prices){
                    return prices.split("|");
                }

                $scope.addPrice = function(prices){
                    newPrice = {
                        unit : "",
                        nominal : 0
                    };
                    prices.push(newPrice);
                }

                $scope.deletePrice = function(index,prices){
                    prices.splice(index,1)
                }

                $scope.printCalc = function(calculations){
                    var toWrite = "";
                    for(var i = 0; i < calculations.length;i++){
                        if(calculations[i].nominal < -1){
                            toWrite += calculations[i].nominal + " ";
                        }else if(calculations[i].nominal < 0){
                            toWrite += (calculations[i].nominal * 100).toFixed(3) + "%" + " ";
                        }else if(calculations[i].nominal < 1){
                            toWrite += "+" + (calculations[i].nominal * 100).toFixed(3) + "%" + " ";
                        }else{
                            toWrite += "+" + calculations[i].nominal + " ";
                        }
                    }

                    return toWrite;
                }


            },
            size : "lg",
            resolve : {
                selectedItem:function(){
                    return selectedItem;
                }
            }
        })

        modalInstance.result.then(
            function(){

            },function(){

            }
        )
    }
});

