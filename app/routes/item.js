var Item = require('../model/item');

module.exports = function(app){
    app.get('/api/items',function(req,res){
        Item.find({status : null},"name dimension modal prices ketjual",{sort:{name:1}},function(err,items){
            if(err) res.send(err);
            res.json(items);
        })
    })

	app.get('/api/items/:id',function(req,res){
        Item.findOne({_id:req.params.id},function(err,item){
            if(err) res.send(err);
            res.json(item);
        })
    })

    app.put('/api/items/:id',function(req,res){
        Item.findByIdAndUpdate({_id:req.params.id},req.body,function(err,item){
            if(err) res.send(err);
            res.json(item);
        })
    })

	app.post('/api/items',function(req,res){
        Item.create(req.body,function(err,item){
            if(err) res.send(err);
            res.json(item);
        })
    })
}