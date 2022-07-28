const mongoose = require("mongoose");

const tokenSchema =new mongoose.Schema(
  {
    tokenId: {
      type: String,
      trim: true,
    },
    symbol: {
      type: String,
      trim: true,
    },
    name: {
      type: Number,
      trim: true,
    },
    decimals: {
      type: Number,
      trim: true,
    },
    tradeVolume: {
      type: Number,
      trim: true,
    },
    tradeVolumeUSD: {
      type: Number,
      trim: true,
    },
    untrackedVolumeUSD: {
      type: Number,
      trim: true,
    },
    txCount: {
      type: Number,
      trim: true,
    },
    totalLiquidity: {
      type: Number,
      trim: true,
    },
    derivedETH: {
      type: Number,
      trim: true,
    },
    status: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("token", tokenSchema);