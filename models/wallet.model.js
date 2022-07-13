const mongoose = require("mongoose");

const WalletSchema = new mongoose.Schema({
    userId : { 
        type: mongoose.Schema.Types.ObjectId,
        role: "users" 
    },
	oldBalance: { 
        type: Number 
    },
	newBalance: { 
        type: Number 
    },
	walletAddress: { 
        type: String 
    },
	status : { 
        type: String,
        enum: ['ACTIVE', 'BLOCK', 'DELETE']
    }
}, { timestamps: true });

module.exports = mongoose.model("wallats", WalletSchema);