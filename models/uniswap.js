const mongoose = require("mongoose");

var uniSwapSchema = new mongoose.Schema(
  {
    factoryId: {
      type: String,
      default: null,
    },
    pairCount: {
      type: Number,
    },
    tokenA_ETH: {
      type: Number,
    },
    tokenB_USD: {
      type: Number,
    },
    tokenA_Address: {
      type: String,
    },
    tokenB_Address: {
      type: String,
    },
    price: {
      type: Number,
    },
    invertedPrice: {
      type: Number,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("uniswap", uniSwapSchema);
