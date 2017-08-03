var Supplier = require('../model/supplier');

module.exports = function(app){
    app.get('/api/suppliers',function(req,res){
        Supplier.find({})
        .exec(function(err,suppliers){
            if(err) return res.send(err);
            res.json(suppliers);
        })
    });

    app.get('/api/suppliers/:_id',function(req,res){
        Supplier
            .findOne({_id: req.params._id})
            .exec(function (err, supplier) {
                if (err) return res.send(err);
                res.json(supplier);
            });
    });

    app.put('/api/suppliers/:id',function(req,res){
        Supplier.findByIdAndUpdate({_id:req.params.id},req.body,function(err,supplier){
            if(err) res.send(err);
            res.json(supplier);
        })
    })

    app.post('/api/suppliers',function(req,res){
        Supplier.create(req.body,function(err,supplier){
            if(err) res.send(err);
            res.json(supplier);
        })
    })
}