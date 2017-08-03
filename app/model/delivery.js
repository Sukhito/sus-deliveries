var mongoose = require('mongoose');

module.exports = mongoose.model('Delivery',{
    _supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier'},
    date    : {type:Date, default:Date.now},
    items   : [{
        _item :{ type: mongoose.Schema.Types.ObjectId, ref: 'Item'},
        qty : { type: Number,default:0},
        unit: {type:String, default: ""},
        gross: { type: Number,default:0},
        calc: [],
        net: { type: Number,default:0},
        lineTotal : { type: Number,default:0}
    }],
    total   : {type:Number, default:0}
});