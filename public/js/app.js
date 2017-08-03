var app = angular.module('suus',['ui.router','ui.bootstrap','ui.sortable']);

app.config(function($stateProvider,$urlRouterProvider,$locationProvider){
    $urlRouterProvider.otherwise('/');
    
    $stateProvider

        .state('deliveries',{
            url: '/deliveries',
            templateUrl: 'js/deliveries/index.html',
            controller:'DeliveriesCtrl'
        })
        .state('delivery',{
            url: '/deliveries/:deliveryId',
            templateUrl: 'js/deliveries/delivery/index.html',
            controller:'DeliveryCtrl'
        })
        .state('new-delivery',{
            url : '/new-delivery',
            templateUrl : 'js/deliveries/new-delivery/index.html',
            controller: 'DeliveryNewCtrl'
        })

    $locationProvider.hashPrefix('');
});