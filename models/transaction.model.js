const mongoose = require("mongoose");

const TransationSchema = new mongoose.Schema({
    userId : { 
        type: mongoose.Schema.Types.ObjectId,
        role: "users" 
    },
	amount: { 
        type: Number 
    },
	type: { 
        type: String,
        enum: ['CREDIT', 'DEBIT']
    },
	status : { 
        type: String,
        enum: ['ACTIVE', 'BLOCK', 'DELETE']
    }
}, { timestamps: true });

module.exports = mongoose.model("transations", TransationSchema);