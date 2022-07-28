const mongoose = require("mongoose");

const pairSchema = new mongoose.Schema({
    pairId: { 
        type: String,
        trim:true },
Factory:{ 
    type: mongoose.Schema.Types.ObjectId,
    role:"uniswapfactory"
    },
token0: { 
    type: String,
    trim:true
 },
token1: { 
    type: String,
    trim:true
 },
reserve0: { 
    type: Number,
    trim:true
 },
reserve1: { 
    type: Number,
    trim:true
 },
totalSupply: { 
    type: Number,
    trim:true
 },
reserveETH: { 
    type: Number,
    trim:true
 },
reserveUSD: { 
    type: Number,
    trim:true
 },
trackedReserveETH: { 
    type: Number,
    trim:true
 },
token0Price: { 
    type: Number,
    trim:true
 },
token1Price: { 
    type: Number,
    trim:true
 },
volumeToken0: { 
    type: Number,
    trim:true
 },
volumeToken1: { 
    type: Number,
    trim:true
 },
volumeUSD: { 
    type: Number,
    trim:true
 },
untrackedReserveETH: { 
    type: Number,
    trim:true
 },
txCount: { 
    type: Number,
    trim:true
 },
createdAtTimeStamp: { 
    type: Number,
    trim:true
 },

createdAtBlockNumber: { 
    type: Number,
    trim:true
 },
liquidityPosiions: { 
    type: String,
    trim:true },
status : { 
    type: String,
    trim:true
 },
}, { timestamps: true });
module.exports = mongoose.model("pairRecords", pairSchema);
