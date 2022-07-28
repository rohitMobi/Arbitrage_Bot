const mongoose = require('mongoose');

const sushiswapSchema = new mongoose.Schema({
    factoryId:{
        type:String,
        required:true,
        trim:true
    },
    pairCount:{
        type:Number,
        trim:true
    },
    totalVolumeUSD:{
        type:Number,
        trim:true
    },
    totalVolumeETH:{
        type:Number,
        trim:true
    },
    totalLiquidityUSD:{
        type:Number,
        trim:true
    },
    totalLiquidityETH:{
        type:Number,
        trim:true
    },
    status : { type: String },
}, { timestamps: true });

module.exports = mongoose.model('sushiswapRecord', sushiswapSchema);