var Delivery = require('../model/delivery');
var Supplier = require('../model/supplier');
var mongoose = require('mongoose');


module.exports = function(app){
    app.get('/api/deliveries',function(req,res){
        Delivery
            .find({})
            .populate({path:'_supplier'})
            .select({ "_supplier": 1, "date": 1,"total":1,"_id":1})
            .sort({"date":-1})
            .exec(function (err, deliveries) {
                if (err) return res.send(err);
                res.json(deliveries);
            });
    });

    app.get('/api/deliveries/:_id',function(req,res){
        Delivery
            .findOne({_id: req.params._id})
            .populate({path:'_supplier'})
            .populate({path:'items._item'})
            .exec(function (err, delivery) {
                if (err) return res.send(err);
                res.json(delivery);
            });
    });

    app.get('/api/deliveries/items/:_id',function(req,res){

        Delivery
            .aggregate([
                {
                    $match:{
                        "items._item" : mongoose.Types.ObjectId(req.params._id)
                    }
                },
                {
                    $project:{
                        items: {
                            $filter:{
                                input : '$items',
                                as: 'item',
                                cond: {$eq:['$$item._item',mongoose.Types.ObjectId(req.params._id)]}
                            }
                        },
                        _supplier:1,
                        date:1
                    }
                },
                {
                    $lookup:{
                        from: "suppliers",
                        localField: "_supplier",
                        foreignField: "_id",
                        as: "supplier"
                    }
                }
            ])
            .exec(function (err, delivery) {
                if (err) return res.send(err);
                res.json(delivery);
            });

    });

    app.post('/api/deliveries',function(req,res){
        Delivery.create(req.body,function(err,delivery){
            if(err) return res.send(err);
            res.json(delivery);
        });
    });
}